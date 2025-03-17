import mongoose from "mongoose";

const favouriteSchema = new mongoose.Schema({
  savedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  savedNotice: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Notice",
    required: true,
  },
});

const Favourite = mongoose.model("Favourite", favouriteSchema);
export default Favourite;
