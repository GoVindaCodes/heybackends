require("dotenv").config();
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const nodemailer = require("nodemailer");

const signInToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      address: user.address,
      phone: user.phone,
      image: user.image,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "2d",
    }
  );
};

const tokenForVerify = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
    },
    process.env.JWT_SECRET_FOR_VERIFY,
    { expiresIn: "15h" }
  );
};

const isAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  console.log('authorization', authorization)
  try {
    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).send({
      message: err.message,
    });
  }
};

// const isAdmin = async (req, res, next) => {
//   const admin = await Admin.findOne({ role: "Admin" });
//   if (admin) {
//     next();
//   } else {
//     res.status(401).send({
//       message: "User is not Admin",
//     });
//   }
// };

const isAdmin = async (req, res, next) => {
  try {
    const admin = await Admin.findOne({ role: "Admin" });
    if (admin) {
      console.log("Admin found:", admin);
      next();
    } else {
      console.log("Admin not found");
      res.status(401).send({
        message: "User is not Admin",
      });
    }
  } catch (error) {
    console.error("Error checking admin:", error);
    res.status(500).send({
      message: "Internal server error",
    });
  }
};


const sendEmail = async (emailOptions, res, message) => {
  // console.log("email options : ", emailOptions)
  // console.log("email options 2 : ", message)
  // console.log("email options 3 : ", res)
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "govindayadav2478@gmail.com",
      pass: "nhyc dvcz nmmb ljau",
    },
  });
  // Send email
  try {
    await transporter.sendMail(emailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = {
  signInToken,
  tokenForVerify,
  isAuth,
  isAdmin,
  sendEmail,
};
