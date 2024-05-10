const bcrypt = require("bcryptjs");
const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
dayjs.extend(utc);
const jwt = require("jsonwebtoken");
const { signInToken, tokenForVerify, sendEmail } = require("../config/auth");
const Admin = require("../models/Admin");

// const registerAdmin = async (req, res) => {
//   try {
//     const isAdded = await Admin.findOne({ email: req.body.email });
//     if (isAdded) {
//       return res.status(403).send({
//         message: "This Email already Added!",
//       });
//     } else {
//       const newStaff = new Admin({
//         name: req.body.name,
//         email: req.body.email,
//         role: req.body.role,
//         password: bcrypt.hashSync(req.body.password),
//       });
//       const staff = await newStaff.save();
//       const token = signInToken(staff);
//       res.send({
//         token,
//         _id: staff._id,
//         name: staff.name,
//         email: staff.email,
//         role: staff.role,
//         joiningData: Date.now(),
//       });
//     }
//   } catch (err) {
//     res.status(500).send({
//       message: err.message,
//     });
//   }
// };


// const registerAdmin = async (req, res) => {
//   try {
//     console.log("Request body:", req.body);

//     const isAdded = await Admin.findOne({ email: req.body.email });
//     console.log("Admin found by email:", isAdded);

//     if (isAdded) {
//       console.log("Email already added");

//       return res.status(403).send({
//         message: "This Email already Added!",
//       });
//     } else {
//       console.log("Email is not already added");

//       const newStaff = new Admin({
//         name: req.body.name,
//         email: req.body.email,
//         phone: req.body.phone,
//         role: req.body.role,
//         password: bcrypt.hashSync(req.body.password),
//       });

//       console.log("New admin object:", newStaff);

//       const staff = await newStaff.save();
//       console.log("Saved admin:", staff);

//       const token = signInToken(staff);
//       console.log("Generated token:", token);

//       res.send({
//         token,
//         _id: staff._id,
//         name: staff.name,
//         email: staff.email,
//         role: staff.role,
//         joiningData: Date.now(),
//       });
//     }
//   } catch (err) {
//     console.error("Error in registerAdmin:", err);

//     res.status(500).send({
//       message: err.message,
//     });
//   }
// };

const registerAdmin = async (req, res) => {
  try {
    console.log("Request body:", req.body);

    const isAdded = await Admin.findOne({ email: req.body.email });
    console.log("Admin found by email:", isAdded);

    if (isAdded) {
      console.log("Email already added");

      return res.status(403).send({
        message: "This Email already Added!",
      });
    } else {
      console.log("Email is not already added");

      const nameObject = {
        en: req.body.name, // Assuming 'en' is the default language
      };

      const newStaff = new Admin({
        name: nameObject,
        email: req.body.email,
        phone: req.body.phone,
        role: req.body.role,
        password: bcrypt.hashSync(req.body.password),
      });

      console.log("New admin object:", newStaff);

      const staff = await newStaff.save();
      console.log("Saved admin:", staff);

      const token = signInToken(staff);
      console.log("Generated token:", token);

      res.send({
        token,
        _id: staff._id,
        name: staff.name.en, // Accessing the 'en' property of the name object
        email: staff.email,
        role: staff.role,
        joiningData: Date.now(),
      });
    }
  } catch (err) {
    console.error("Error in registerAdmin:", err);

    res.status(500).send({
      message: err.message,
    });
  }
};


const loginAdmin = async (req, res) => {
  try {
    console.log("Request body:", req.body);
    const admin = await Admin.findOne({ email: req.body.email });
    console.log("Admin found:", admin);

    if (admin && bcrypt.compareSync(req.body.password, admin.password)) {
      console.log("Password is correct");

      const token = signInToken(admin);
      console.log("Generated token:", token);

      res.send({
        token,
        _id: admin._id,
        name: admin.name,
        phone: admin.phone,
        email: admin.email,
        image: admin.image,
      });
    } else {
      res.status(401).send({
        message: "Invalid Email or password!",
        redirectToLogin: true
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

// const forgetPassword = async (req, res) => {
//   const isAdded = await Admin.findOne({ email: req.body.verifyEmail });
//   if (!isAdded) {
//     return res.status(404).send({
//       message: "Admin/Staff Not found with this email!",
//     });
//   } else {
//     const token = tokenForVerify(isAdded);
//     const body = {
//       from: process.env.EMAIL_USER,
//       to: `${req.body.verifyEmail}`,
//       subject: "Password Reset",
//       html: `<h2>Hello ${req.body.verifyEmail}</h2>
//       <p>A request has been received to change the password for your <strong>Kachabazar</strong> account </p>

//         <p>This link will expire in <strong> 15 minute</strong>.</p>

//         <p style="margin-bottom:20px;">Click this link for reset your password</p>

//         <a href=${process.env.ADMIN_URL}/reset-password/${token}  style="background:#22c55e;color:white;border:1px solid #22c55e; padding: 10px 15px; border-radius: 4px; text-decoration:none;">Reset Password </a>


//         <p style="margin-top: 35px;">If you did not initiate this request, please contact us immediately at support@kachabazar.com</p>

//         <p style="margin-bottom:0px;">Thank you</p>
//         <strong>Kachabazar Team</strong>
//              `,
//     };
//     const message = "Please check your email to reset password!";
//     sendEmail(body, res, message);
//   }
// };

const forgetPassword = async (req, res) => {
  console.log("Forget Password Request Received:", req.body.verifyEmail);

  // Find the user by email
  const isAdded = await Admin.findOne({ email: req.body.verifyEmail });
  console.log("User Found:", isAdded);

  if (!isAdded) {
    console.log("User Not Found. Sending 404 response.");
    return res.status(404).send({
      message: "Admin/Staff Not found with this email!",
    });
  } else {
    // Generate token for password reset
    const token = tokenForVerify(isAdded);
    console.log("Token Generated:", token);

    // Prepare email body
    const body = {
      from: process.env.EMAIL_USER,
      to: `${req.body.verifyEmail}`,
      subject: "Password Reset",
      html: `<h2>Hello ${req.body.verifyEmail}</h2>
      <p>A request has been received to change the password for your <strong>Kachabazar</strong> account </p>
      <p>This link will expire in <strong> 15 minute</strong>.</p>
      <p style="margin-bottom:20px;">Click this link for reset your password</p>
      <a href=${`http://localhost:3000`}/reset-password/${token}  style="background:#22c55e;color:white;border:1px solid #22c55e; padding: 10px 15px; border-radius: 4px; text-decoration:none;">Reset Password </a>
      <p style="margin-top: 35px;">If you did not initiate this request, please contact us immediately at support@kachabazar.com</p>
      <p style="margin-bottom:0px;">Thank you</p>
      <strong>Kachabazar Team</strong>
      `,
    };

    console.log("Sending Password Reset Email:", body);

    // Send email
    const message = "Please check your email to reset password!";
    sendEmail(body, res, message);
  }
};


// const resetPassword = async (req, res) => {
//   const token = req.body.token;
//   const { email } = jwt.decode(token);
//   const staff = await Admin.findOne({ email: email });

//   if (token) {
//     jwt.verify(token, process.env.JWT_SECRET_FOR_VERIFY, (err, decoded) => {
//       if (err) {
//         return res.status(500).send({
//           message: "Token expired, please try again!",
//         });
//       } else {
//         staff.password = bcrypt.hashSync(req.body.newPassword);
//         staff.save();
//         res.send({
//           message: "Your password change successful, you can login now!",
//         });
//       }
//     });
//   }
// };

const resetPassword = async (req, res) => {
  const token = req.body.token;
  jwt.verify(token, process.env.JWT_SECRET_FOR_VERIFY, async (err, decoded) => {
    if (err) {
      return res.status(500).send({
        message: "Token expired or invalid, please try again!",
      });
    }
    const { email } = decoded;
    try {
      const staff = await Admin.findOne({ email });
      if (!staff) {
        return res.status(404).send({
          message: "User not found!",
        });
      }
      staff.password = bcrypt.hashSync(req.body.newPassword);
      await staff.save();
      res.send({
        message: "Your password has been changed successfully. You can now log in with your new password!",
      });
    } catch (error) {
      console.error("Error resetting password:", error);
      res.status(500).send({
        message: "An error occurred while resetting your password. Please try again later!",
      });
    }
  });
};



// const addStaff = async (req, res) => {
//   // console.log("add staf....", req.body.staffData);
//   try {
//     const isAdded = await Admin.findOne({ email: req.body.email });
//     if (isAdded) {
//       return res.status(500).send({
//         message: "This Email already Added!",
//       });
//     } else {
//       const newStaff = new Admin({
//         name: { ...req.body.name },
//         email: req.body.email,
//         password: bcrypt.hashSync(req.body.password),
//         phone: req.body.phone,
//         joiningDate: req.body.joiningDate,
//         role: req.body.role,
//         image: req.body.image,
//         lang: req.body.language,
//       });
//       await newStaff.save();
//       res.status(200).send({
//         message: "Staff Added Successfully!",
//       });
//     }
//   } catch (err) {
//     res.status(500).send({
//       message: err.message,
//     });
//     // console.log("error", err);
//   }
// };

const addStaff = async (req, res) => {
  console.log("add staff....", req.body.staffData);
  try {
    // Access the nested password field
    const password = req.body.staffData?.password;
    console.log('Password received:', password);

    // Check if the email already exists
    const isAdded = await Admin.findOne({ email: req.body.staffData.email });
    if (isAdded) {
      return res.status(400).send({ message: "This email is already added!" });
    }

    // Ensure password is provided
    if (!password) {
      return res.status(400).send({ message: "Password is required!" });
    }

    // Hash the password
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Create a new staff member
    const newStaff = new Admin({
      name: req.body.staffData.name,
      email: req.body.staffData.email,
      password: hashedPassword,
      phone: req.body.staffData.phone,
      joiningDate: req.body.staffData.joiningDate,
      role: req.body.staffData.role,
      image: req.body.staffData.image,
      lang: req.body.staffData.lang,
    });

    // Save the new staff member
    await newStaff.save();

    // Respond with success message
    res.status(200).send({ message: "Staff added successfully!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
    console.log("Error:", err);
  }
};

const getAllStaff = async (req, res) => {
  // console.log('allamdin')
  try {
    const admins = await Admin.find({}).sort({ _id: -1 });
    res.send(admins);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getStaffById = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    res.send(admin);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const updateStaff = async (req, res) => {
  console.log("staffs Datas", req.body)
  try {
    const admin = await Admin.findOne({ _id: req.params.id });
    console.log("admin:", admin)
    if (admin) {
      admin.name = { ...admin.name, ...req.body.name };
      admin.email = req.body.email;
      admin.phone = req.body.phone;
      admin.role = req.body.role;
      admin.joiningData = req.body.joiningDate;
      admin.password =
        req.body.password !== undefined
          ? bcrypt.hashSync(req.body.password)
          : admin.password;

      admin.image = req.body.image;
      const updatedAdmin = await admin.save();
      console.log("updated Admins", updatedAdmin)
      const token = signInToken(updatedAdmin);
      res.send({
        token,
        message: "Staff Updated Successfully!",
        _id: updatedAdmin._id,
        name: updatedAdmin.name,
        email: updatedAdmin.email,
        role: updatedAdmin.role,
        image: updatedAdmin.image,
      });
    } else {
      res.status(404).send({
        message: "This Staff not found!",
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const deleteStaff = (req, res) => {
  console.log("ids : ", req.params.id)
  Admin.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      res.status(500).send({
        message: err.message,
      });
    } else {
      res.status(200).send({
        message: "Admin Deleted Successfully!",
      });
    }
  });
};

const updatedStatus = async (req, res) => {
  try {
    const newStatus = req.body.status;

    await Admin.updateOne(
      { _id: req.params.id },
      {
        $set: {
          status: newStatus,
        },
      }
    );
    res.send({
      message: `Staff ${newStatus} Successfully!`,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

module.exports = {
  registerAdmin,
  loginAdmin,
  forgetPassword,
  resetPassword,
  addStaff,
  getAllStaff,
  getStaffById,
  updateStaff,
  deleteStaff,
  updatedStatus,
};
