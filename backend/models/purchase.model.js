// import mongoose from "mongoose";
// const purchaseSchema=new mongoose.Schema({
//     userId:{
//         type:mongoose.Types.ObjectId,
//         ref:"User"  // i will get userId from User table or collection
//     },
//     courseId:{
//         type:mongoose.Types.ObjectId,
//         ref:"Course" // this will get from the Course table/ collection 
//     }
// })
// export const Purchase = mongoose.model("Purchase",purchaseSchema);


import mongoose from "mongoose";

const pruchaseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  courseId: {
    type: mongoose.Types.ObjectId,
    ref: "Course",
  },
});

export const Purchase = mongoose.model("Purchase", pruchaseSchema);
