const mongoose = require("mongoose");

const mongoURI = "mongodb://localhost:27017/Alliance";
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

const formSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  offerings: { type: [String], required: true },
  requirements: { type: [String], required: true },
});

const Form = mongoose.model("Form", formSchema);

module.exports = { mongoose, Form };
