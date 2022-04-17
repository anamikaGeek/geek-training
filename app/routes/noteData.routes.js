const controller = require("../controllers/noteData.controller");
const { authUser } = require("../middlewares");

module.exports = function (app) {
  app.post(
    "/api/note-data",
    [authUser.verifyToken],
    controller.SaveNoteData
  );
  app.get("/api/note-data",
  [authUser.verifyToken],
  controller.getNoteData);

  app.put(
    "/api/note-data/:noteId",
    [authUser.verifyToken],
    controller.updateNoteData
  );
  app.delete(
    "/api/note-data/:noteId",
    [authUser.verifyToken],
    controller.deleteNoteData
  );
};