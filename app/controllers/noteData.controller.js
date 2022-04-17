const db = require("../models");
const NoteData = db.noteData;
var createError = require("http-errors");

exports.SaveNoteData = async (req, res, next) => {
  try {   
    console.log("hereeeee") 
   console.log(req.body)
        const noteData = new NoteData({
            
          title: req.body.description,
         description: req.body.description,
         isDone: req.body.isDone,
         user: req.body.userId
        });
        noteRecord = await noteData.save();
        res
      .status(200)
      .send({ data: noteRecord, message: "Note created successfully!" });

  } catch (error) {
    console.log("Error", error);
    next(error);
  }
};

exports.updateNoteData = async (req, res, next) => {
  try {
      console.log("nnnnnnnn", req.body)
    const noteId = req.params.noteId;
    const updatedNoteData = await NoteData.findOneAndUpdate(
      { _id: noteId },
      req.body,
      { new: true }
    );
    res
      .status(200)
      .send({ data: updatedNoteData, message: "Note updated successfully!" });
  } catch (error) {
    next(error);
  }
};

exports.getNoteData = (req, res, next) => {
  let filter = req.query || {};
  NoteData.find(filter)
    .then((results) => {
      res.send(results);
    })
    .catch((err) => {
      next(err);
    });
};

exports.deleteNoteData = (req, res, next) => {
    const noteId = req.params.noteId;
    console.log(noteId)
    NoteData.findByIdAndDelete(noteId)
      .then(() => {
        res.send({"message":"Record deleted successfully!"});
      })
      .catch((err) => {
        next(err);
      });
  };
