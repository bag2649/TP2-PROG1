const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Le titre est requis !"]
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

module.exports = mongoose.model('Article', articleSchema);
