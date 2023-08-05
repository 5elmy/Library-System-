import mongoose, { model, Schema, Types } from "mongoose";

const librarySchema = new Schema(
  {
    bookName: {
      type: String,
      required: true,
      unique:true
    },
    userId: {
      type: Types.ObjectId,
      ref: "User"
    
    },
    adminId:{
      type: Types.ObjectId,
      ref: "User"
    },
    statusBook:{
      type:String,
      default:"valid",
      enum:["valid","invalid"]
    },
    isDeleted:{
      type:Boolean,
      default:false,
      enum:[true , false]
    },
    bookPic:{
      type:Object,
      required:true
    },
    borrowAt:String,
    revertAt:String,
    cost:Number,
   
  },
  {
    timestamps: true,
  }
);

const libraryModel = mongoose.models.Message || model("Library", librarySchema);
export default libraryModel;
