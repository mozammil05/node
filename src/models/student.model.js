import mongoose from "mongoose";

// Define the student schema
const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  dob: { type: Number, required: true },
  class: { type: String, required: true },
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
