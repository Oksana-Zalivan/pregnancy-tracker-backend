const taskSchema = new mongoose.Schema({
  title: String,
  status: {
    type: String,
    enum: ["pending", "completed"],
    default: "pending",
  },
});