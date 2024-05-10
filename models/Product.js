// const mongoose = require("mongoose");

// const productSchema = new mongoose.Schema(
//   {
//     productId: {
//       type: String,
//       required: false,
//     },
//     sku: {
//       type: String,
//       required: false,
//     },
//     barcode: {
//       type: String,
//       required: false,
//     },
//     title: {
//       type: Object,
//       required: true,
//     },
//     description: {
//       type: Object,
//       required: false,
//     },
//     slug: {
//       type: String,
//       required: true,
//     },
//     categories: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Category",
//         required: true,
//       },
//     ],
//     category: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Category",
//       required: true,
//     },
//     image: {
//       type: Array,
//       required: false,
//     },
//     stock: {
//       type: Number,
//       required: false,
//     },

//     sales: {
//       type: Number,
//       required: false,
//     },

//     tag: [String],
//     prices: {
//       originalPrice: {
//         type: Number,
//         required: true,
//       },
//       price: {
//         type: Number,
//         required: true,
//       },
//       discount: {
//         type: Number,
//         required: false,
//       },
//     },
//     variants: [{}],
//     isCombination: {
//       type: Boolean,
//       required: true,
//     },

//     status: {
//       type: String,
//       default: "show",
//       enum: ["show", "hide"],
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// // module.exports = productSchema;

// const Product = mongoose.model("Product", productSchema);
// module.exports = Product;



// const mongoose = require("mongoose");

// const productDataSchema = new mongoose.Schema({
//   _id: {
//     type: String,
//     required: true,
//     // required: false,
//   },
//   price: {
//     type: Number,
//     required: true,
//   },
//   barcode: {
//     type: String,
//     required: false,
//   },
//   discount: {
//     type: Number,
//     // required: true,
//     required: false,
//   },
//   tag: {
//     type: [String],
//     // required: true,
//     required: false,
//   },
//   flashSale: {
//     type: Boolean,
//     // required: true,
//     required: false,
//   },
//   status: {
//     type: String,
//     // required: true,
//     required: false,
//   },
//   children: {
//     type: String,
//     // required: true,
//     required: false,
//   },
//   createdAt: {
//     type: Date,
//     // required: true,
//     required: false,
//   },
//   description: {
//     type: String,
//     required: true,
//   },
//   image: {
//     type: String,
//     // required: true,
//     required: false,
//   },
//   originalPrice: {
//     type: Number,
//     required: true,
//   },
//   parent: {
//     type: String,
//     // required: true,
//     required: false,
//   },
//   quantity: {
//     type: Number,
//     // required: true,
//     required: false,
//   },
//   slug: {
//     type: String,
//     required: true,
//   },
//   title: {
//     type: String,
//     required: true,
//   },
//   type: {
//     type: String,
//     // required: true,
//     required: false,
//   },
//   unit: {
//     type: String,
//     // required: true,
//     required: false,
//   },
//   updatedAt: {
//     type: Date,
//     // required: true,
//     required: false,
//   },
//   sku: {
//     type: String,
//     required: false,
//   },
// });

// module.exports = mongoose.model("ProductData", productDataSchema);





const mongoose = require("mongoose");

const productDataSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  barcode: {
    type: String,
    required: false,
  },
  discount: {
    type: Number,
    required: false,
  },
  tag: {
    type: [String],
    required: false, // Corrected required status for tag
  },
  categories: {
    type: [String],
    required: false, // Corrected required status for tag
  },
  flashSale: {
    type: Boolean,
    required: false, // Corrected required status for flashSale
  },
  status: {
    type: String,
    required: false, // Corrected required status for status
  },
  children: {
    type: String,
    required: false, // Corrected required status for children
  },
  createdAt: {
    type: Date,
    required: false, // Corrected required status for createdAt
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: [String], // Array of strings
    required: false, // Optional field
  },
  originalPrice: {
    type: Number,
    required: true,
  },
  parent: {
    type: String,
    required: false, // Corrected required status for parent
  },
  quantity: {
    type: Number,
    required: false, // Corrected required status for quantity
  },
  stock: {
    type: Number,
    required: false, // Corrected required status for quantity
  },
  slug: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: false,
  },
  unit: {
    type: String,
    required: false,
  },
  updatedAt: {
    type: Date,
    required: false,
  },
  sku: {
    type: String,
    required: false,
  },
  variants: [{}],
  isCombination: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("ProductData", productDataSchema);
