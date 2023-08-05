import mongoose, { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    profileImage:String,
    ProfileImageId:String ,
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      default: "Male",
      enum: ["Male", "Female"],
    },
    status: {
      type: String,
      default: "Not Active",
      enum: ["Active", "Not Active"],
    },
    confirmEmail: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"],
    },
    phone:String,
    age:Number,
    isDeleted:{
      type:Boolean,
      default:false,
      enum:[true,false]
    }

   
  },
  {
    timestamps: true,
  }
);
const userModel = mongoose.models.User || model("User", userSchema);
export default userModel;
