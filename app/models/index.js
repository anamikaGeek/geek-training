const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const db = {};
db.noteData = require("./note.model");
db.userData = require("./user.model");

db.mongoose = mongoose
module.exports = db;