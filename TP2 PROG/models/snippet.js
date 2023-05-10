const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const snippetSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Le titre est requis !"],
      maxlength: [255, "Le titre ne peut pas dépasser 255 caractères."]
    },
    content: {
      type: String,
      
    },
    url: {
      type: String,
      
    },
    tags: {
      type: [String],
      default:[]

    }

  },
  { timestamps: true }
);

module.exports = mongoose.model('snippet', snippetSchema);
