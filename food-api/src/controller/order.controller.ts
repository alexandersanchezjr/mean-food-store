import asyncHandler from "express-async-handler";
import { OrderModel } from "../model/Order.model";
import { OrderStatus } from "../constants/order_status";
import { HTTP_BAD_REQUEST } from "../constants/http_status";

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
  const order = await OrderModel.findOne({
    user: req.user.id,
    status: OrderStatus.NEW,
  });
  if (order) res.send(order);
  else res.status(HTTP_BAD_REQUEST).send();
});

const payOrder = asyncHandler(async (req: any, res: any) => {
  const order = await OrderModel.findById(req.body.orderId);
  res.send(order);
});

const trackOrder = asyncHandler(async (req: any, res: any) => {
  const order = await OrderModel.findById(req.query.orderId);
  res.send(order);
});

export { createOrder, getNewOrderForCurrentUser, payOrder, trackOrder };
