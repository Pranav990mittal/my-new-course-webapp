// import { Course } from "../models/course.model.js";
// import { v2 as cloudinary } from "cloudinary";
// import { Purchase } from "../models/purchase.model.js";
// // import Stripe from "stripe";

// export const createCourse = async (req, res) => {
//   const adminId = req.adminId;
//   const { title, description, price } = req.body;

//   try {
//     if (!title || !description || !price) {
//       return res.status(400).json({ errors: "All fields are required" });
//     }
//     // const {image} = req.files;
//     const image = req.files["image"] || req.files["image "];

//     if (!req.files || Object.keys(req.files).length === 0) {
//       return res.status(400).json({ errors: "No file uploaded" });
//     }

//     const allowedFormat = ["image/png", "image/jpeg"];
//     if (!allowedFormat.includes(image.mimetype)) {
//       return res.status(400).json({
//         errors: "Invalid file format. Only JPG and PNG allowed",
//       });
//     }

//     const cloud_response = await cloudinary.uploader.upload(image.tempFilePath);
//     if (!cloud_response || cloud_response.error) {
//       return res
//         .status(400)
//         .json({ errors: "Error uploading file to Cloudinary" });
//     }

//     const courseData = {
//       title,
//       description,
//       price,
//       image: {
//         public_id: cloud_response.public_id,
//         url: cloud_response.url,
//       },
//       creatorId: adminId,
//     };
//     const course = await Course.create(courseData);
//     res.json({
//       message: "Course created successfully",
//       course,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ errors: "Server error" });
//   }
// };
// export const updateCourse = async (req, res) => {
//   const adminId = req.adminId;
//   const { courseId } = req.params;
//   const { title, description, price } = req.body;

//   try {
//     const course = await Course.findById(courseId);
//     if (!course) {
//       return res.status(404).json({ errors: "Course not found" });
//     }

//     let updatedImage = course.image;

//     if (req.files && req.files.image) {
//       const allowedFormat = ["image/png", "image/jpeg"];
//       const imageFile = req.files.image;

//       if (!allowedFormat.includes(imageFile.mimetype)) {
//         return res
//           .status(400)
//           .json({ errors: "Invalid file format. Only JPG and PNG allowed" });
//       }

//       const cloudResponse = await cloudinary.uploader.upload(imageFile.tempFilePath);

//       if (!cloudResponse || cloudResponse.error) {
//         return res.status(400).json({ errors: "Cloudinary upload failed" });
//       }

//       updatedImage = {
//         public_id: cloudResponse.public_id,
//         url: cloudResponse.url,
//       };
//     }

//     course.title = title || course.title;
//     course.description = description || course.description;
//     course.price = price || course.price;
//     course.image = updatedImage;

//     await course.save();

//     res.status(200).json({ message: "Course updated successfully", course });
//   } catch (error) {
//     console.log("Error in course updating ", error);
//     res.status(500).json({ errors: "Error in course updating" });
//   }
// };

// export const deleteCourse = async (req, res) => {
//   const adminId = req.adminId;
//   const { courseId } = req.params;
//   try {
//     const course = await Course.findOneAndDelete({
//       _id: courseId,
//       creatorId: adminId,
//     });
//     if (!course) {
//       return res.status(404).json({ error: "Cannot delete, created by other admin" });
//     }
//     res.status(200).json({ message: "Course deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ errors: "error in course deleting" });
//     console.log("Error in course deleting ", error);
//   }
// };

// export const getCourses = async (req, res) => {
//   try {
//     const courses = await Course.find({});
//     //const adminId = req.adminId;
//     //const courses = await Course.find({ creatorId: adminId });
//     res.status(201).json({ courses });
//   } catch (error) {
//     res.status(500).json({ error: "Error in getting courses" });
//     console.log("Error to get courses", error);
//   }
// };

// //getting particular course
// export const courseDetails = async (req, res) => {
//   const { courseId } = req.params;
//   try {
//     const course = await Course.findById(courseId);
//     if (!course) {
//       return res.status(404).json({ errors: "Course not found" });
//     }
//     res.status(200).json({ course });
//   } catch (error) {
//     res.status(500).json({ errors: "Error in getting course details" });
//     console.log("Error in course details", error);
//   }
// };

// // purhcased courses

// import Stripe from "stripe";
// import config from "../config.js";
// const stripe = new Stripe(config.STRIPE_SECRET_KEY);
// console.log(config.STRIPE_SECRET_KEY);

// export const buyCourses = async (req, res) => {
//   // first of all validate the user and his jwt token
//   const { userId } = req;
//   const { courseId } = req.params;
//   try {
//     const course = await Course.findById(courseId);
//     if (!course) {
//       return res.status(404).json({ errors: "Course not found" });
//     }
//     const existingPurchase = await Purchase.findOne({ userId, courseId });
//     if (existingPurchase) {
//       return res
//         .status(400)
//         .json({ errors: "User already has purchased this course" });
//     }
//     //stripe payment code
//     const amount = course.price;
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: amount,
//       currency: "usd",
//       payment_method_types: ["card"],
//     });

//     // const newPurchase = new Purchase({ userId, courseId });
//     // await newPurchase.save();
//     res
//       .status(201)
//       .json(
//         { message: "Course purchased successfully",
//         course,
//         clientSecret:paymentIntent.client_secret,
//   });
//   } catch (error) {
//     res.status(500).json({ errors: "Error in course buying" });
//     console.log("error in course buying ", error);
//   }
// };

import { Course } from "../models/course.model.js";
import { v2 as cloudinary } from "cloudinary";
import { Purchase } from "../models/purchase.model.js";

export const createCourse = async (req, res) => {
  const adminId = req.adminId;
  const { title, description, price } = req.body;
  console.log(title, description, price);

  try {
    if (!title || !description || !price) {
      return res.status(400).json({ errors: "All fields are required" });
    }
    const { image } = req.files;
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ errors: "No file uploaded" });
    }

    const allowedFormat = ["image/png", "image/jpeg"];
    if (!allowedFormat.includes(image.mimetype)) {
      return res
        .status(400)
        .json({ errors: "Invalid file format. Only PNG and JPG are allowed" });
    }

    // claudinary code
    const cloud_response = await cloudinary.uploader.upload(image.tempFilePath);
    if (!cloud_response || cloud_response.error) {
      return res
        .status(400)
        .json({ errors: "Error uploading file to cloudinary" });
    }

    const courseData = {
      title,
      description,
      price,
      image: {
        public_id: cloud_response.public_id,
        url: cloud_response.url,
      },
      creatorId: adminId,
    };
    const course = await Course.create(courseData);
    res.json({
      message: "Course created successfully",
      course,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error creating course" });
  }
};

export const updateCourse = async (req, res) => {
  const adminId = req.adminId;
  const { courseId } = req.params;
  const { title, description, price, image } = req.body;
  try {
    const courseSearch = await Course.findById(courseId);
    if (!courseSearch) {
      return res.status(404).json({ errors: "Course not found" });
    }
    const course = await Course.findOneAndUpdate(
      {
        _id: courseId,
        creatorId: adminId,
      },
      {
        title,
        description,
        price,
        image: {
          public_id: image?.public_id,
          url: image?.url,
        },
      }
    );
    if (!course) {
      return res
        .status(404)
        .json({ errors: "can't update, created by other admin" });
    }
    res.status(201).json({ message: "Course updated successfully", course });
  } catch (error) {
    res.status(500).json({ errors: "Error in course updating" });
    console.log("Error in course updating ", error);
  }
};

export const deleteCourse = async (req, res) => {
  const adminId = req.adminId;
  const { courseId } = req.params;
  try {
    const course = await Course.findOneAndDelete({
      _id: courseId,
      creatorId: adminId,
    });
    if (!course) {
      return res
        .status(404)
        .json({ errors: "can't delete, created by other admin" });
    }
    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ errors: "Error in course deleting" });
    console.log("Error in course deleting", error);
  }
};

export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find({});
    res.status(201).json({ courses });
  } catch (error) {
    res.status(500).json({ errors: "Error in getting courses" });
    console.log("error to get courses", error);
  }
};

export const courseDetails = async (req, res) => {
  const { courseId } = req.params;
  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    res.status(200).json({ course });
  } catch (error) {
    res.status(500).json({ errors: "Error in getting course details" });
    console.log("Error in course details", error);
  }
};

import Stripe from "stripe";
import config from "../config.js";
const stripe = new Stripe(config.STRIPE_SECRET_KEY);
console.log(config.STRIPE_SECRET_KEY);
export const buyCourses = async (req, res) => {
  const { userId } = req;
  const { courseId } = req.params;

  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ errors: "Course not found" });
    }
    const existingPurchase = await Purchase.findOne({ userId, courseId });
    if (existingPurchase) {
      return res
        .status(400)
        .json({ errors: "User has already purchased this course" });
    }

    // stripe payment code goes here!!
    const amount = course.price;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      payment_method_types: ["card"],
    });

    res.status(201).json({
      message: "Course purchased successfully",
      course,
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).json({ errors: "Error in course buying" });
    console.log("error in course buying ", error);
  }
};