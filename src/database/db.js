import mongoose from "mongoose";


const connectDB = async () => {
// console.log(process.env.MONGODB_URL);
  const conn = await mongoose.connect("mongodb://localhost:27017/test");
//   mongoose.connect("mongodb+srv://admin:admin@cluster0.n00b4vx.mongodb.net/", {

//   useNewUrlParser: "true",
//   useUnifiedTopology: "true"

// })
  console.log(`Database connect: ${conn.connection.host}`);
};

export default connectDB;

