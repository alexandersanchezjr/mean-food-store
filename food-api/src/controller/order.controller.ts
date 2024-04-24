import asyncHandler from "express-async-handler";
import { OrderModel } from "../model/Order.model";
import { OrderStatus } from "../constants/order_status";
import { HTTP_BAD_REQUEST } from "../constants/http_status";
import Stripe from "stripe";

const createOrder = asyncHandler(async (req: any, res: any) => {
  const requestOrder = req.body;

  if (!requestOrder.items || requestOrder.items.length === 0) {
    res.status(HTTP_BAD_REQUEST).send("Items are required");
    return;
  }

  await OrderModel.deleteOne({ user: req.user.id, status: OrderStatus.NEW });

  const newOrder = new OrderModel({ ...requestOrder, user: req.user.id });
  newOrder.save();
  res.send(newOrder);
});

const getNewOrderForCurrentUser = asyncHandler(async (req: any, res: any) => {
  const order = await getNewOrder(req);
  if (order) res.send(order);
  else res.status(HTTP_BAD_REQUEST).send();
});

const getNewOrder = async (req: any) => {
  const order = await OrderModel.findOne({
    user: req.user.id,
    status: OrderStatus.NEW,
  });
  return order;
};

const payOrder = asyncHandler(async (req: any, res: any) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  const order = await getNewOrder(req);

  if (!order) {
    res.status(HTTP_BAD_REQUEST).send("No order found for the user");
    return;
  }

  const items: Stripe.Checkout.SessionCreateParams.LineItem[] = order.items.map(
    (item) => {
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.food.name,
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      };
    }
  );

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: items,
    mode: "payment",
    success_url: `http://localhost:4200/success?orderId=${order.id}`,
    cancel_url: "http://localhost:4200/cancel",
  });

  order.status = OrderStatus.PAID;
  await order.save();
  res.send({ id: session.id });
});

const trackOrder = asyncHandler(async (req: any, res: any) => {
  const order = await OrderModel.findById(req.query.orderId);
  res.send(order);
});

export { createOrder, getNewOrderForCurrentUser, payOrder, trackOrder };
