import { connect, ConnectOptions } from "mongoose";

const uri = process.env.MONGO_URI!;

const connectOptions: ConnectOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as ConnectOptions;

const dbConnect = () => {
  connect(uri, connectOptions).then(
    () => console.log("connect successfully"),
    (error) => console.log(error)
  );
};

export default dbConnect;
