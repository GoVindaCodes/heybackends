// const mongoose = require('mongoose');
// const { Children } = require('react');

// const categorySchema = new mongoose.Schema(
//   {
//     name: {
//       type: Array,
//       required: true,
//     },
//     description: {
//       type: Object,
//       required: false,
//     },
//     slug: {
//       type: String,
//       required: false,
//     },
//     parentId: {
//       type: String,
//       required: false,
//     },
//     parentName: {
//       type: String,
//       required: false,
//     },
//     id: {
//       type: String,
//       required: false,
//     },
//     icon: {
//       type: String,
//       required: false,
//     },
//     status: {
//       type: String,
//       lowercase: true,
//       enum: ['show', 'hide'],
//       default: 'show',
//     },
//     // Children: {
//     //   type: String,
//     //   required: true,
//     // }
//   },
//   {
//     timestamps: true,
//   }
// );

// module.exports = categorySchema;

// const Category = mongoose.model('Category', categorySchema);
// module.exports = Category;



// just testing according to utilss of frontend


const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({

  // just for testing its commented out uncomment when needed
  _id: {
    type: String,
    // required: true,
    required: false,
  },
  children: {
    type: [String],
    required: false,
  },
  parent: {
    type: String,
    required: true,
    required: false,
  },
  type: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "Show",
    enum: ["Show", "Hide"],
  },
});

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
