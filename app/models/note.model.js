const mongoose = require("mongoose");
const NoteData = mongoose.model(
  "NoteData",
  new mongoose.Schema(
    {
      title: String,
      description: String,
      user: {
        type: mongoose.Types.ObjectId,
        ref: "UserData",
      }, 
      isDone: {
        type: Boolean,
        default: false,
      }
    },
    { timestamps: true }
  )
);
module.exports = NoteData;