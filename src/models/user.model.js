import mongoose from "mongoose";

const schema = new mongoose.Schema({
  // profilePic: [String],
  name: {
    type: String,
    trim: true,
  },
  email: {
    required: true,
    unique: true,
    type: String,
    trim: true,
    validate: {
      validator: (value) => {
        const re =
          /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        return value.match(re);
      },
      message: "Please enter a valid email address",
    },
  },
  password: {
    required: false,
    type: String,
    validate: {
      validator: (value) => {
        return value.length > 6;
      },
      message: "Weak password",
    },
  },
  type: {
    type: String,
    enum: ["user", "admin", "custom"],
    // default: "user",
  },
});

export default mongoose.model("User", schema);
