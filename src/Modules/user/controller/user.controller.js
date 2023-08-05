import userModel from "../../../../DB/models/User.model.js";
import cloudnairy from "../../../utils/cloudnairy.js";
import { StatusCodeError } from "../../../utils/errorHandling.js";
import { compare, hash } from "../../../utils/Hash&Compare.js";

export const getAllUsers = async (req, res, next) => {
  const user = await userModel.find({isDeleted:false})
 return res.json({ message: "All user " ,users:user});}
// soft Delete
export const userSoftDelete = async (req, res, next) => {
  const {id}= req.user 
  console.log(id)
  const softDelete = await userModel.findByIdAndUpdate({_id:req.user.id},{isDeleted:true},{new:true})
  softDelete.status="Not Active";
  await softDelete.save()
  return res.json({ message: "Delete user is Done", softDelete });
}

export const updatePassword = async (req, res, next) => {
  const {id} = req.user
  console.log(id);
  const {oldPassword, newPassword}= req.body;
  console.log({oldPassword , newPassword})
  const user = await userModel.findById(id);

  const match = compare({plaintext:oldPassword , hashValue:user.password})
  if(!match)
  {
     return next (new StatusCodeError('old password Wrong',400))
  }
  //   if(oldPassword == newPassword)
  // {
  //   return next (new StatusCodeError('you sould change password',400))
  // }

   const hashPassword = hash({plaintext:newPassword });
   const updateUserPassword = await  userModel.updateOne({password:hashPassword});
    // user.password = hashPassword
    // await user.save()
      
  return res.status(200).json({ message: "Done", User:updateUserPassword });
}




export const profilePicClould = async (req, res, next) => {
  
  if(!req.file)
  {
    return next (new StatusCodeError('file is required',400))
  }

const cloud = await cloudnairy.uploader.upload(req.file.path,{folder:`user/${req.user.id}/profile`});

const {secure_url,public_id} = cloud;

 const user = await userModel.findOneAndUpdate(req.user.id,{profileImage:secure_url ,ProfileImageId:public_id},{new:true});
              // await cloudnairy.uploader.destroy(user.ProfileImageId)
  return res.json({message:"Done" , user})

};


export const profilePic = async (req, res, next) => {
  
  if(!req.file)
  {
    return next (new StatusCodeError('file is required',400))
  }
 const  profileImage= req.file.dest;
  console.log(profileImage);
   
  const user = await userModel.findOneAndUpdate(req.user.id,{profileImage:profileImage},{new:true});
  return res.json({message:"Done" , user})

};




export const profile = async (req, res, next) => {


  const user = await userModel.findById(req.user._id).select("-password -updatedAt -isDeleted -role -confirmEmail -__v" );
  return res.json({ message: "user profile" , user});

};
export const updateProfile = async (req, res, next) => {
  const {userName , phone ,age , gender} = req.body;
  console.log({userName,phone,age ,gender});

  const user = await userModel.findOneAndUpdate({_id:req.user.id},{userName:userName,phone:phone,age,gender },{new:true})

  return res.json({ message: " update is Done ..." , 
  updateUser:{ userName: user.userName ,phone:user.phone,age:user.age ,gender:user.gender }});

};
