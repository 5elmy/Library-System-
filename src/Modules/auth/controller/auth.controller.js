
import userModel from "../../../../DB/models/User.model.js";
import { StatusCodeError } from "../../../utils/errorHandling.js";
import { generateToken, verifyToken } from "../../../utils/generateAndVerifyToken.js";
import { compare, hash } from "../../../utils/Hash&Compare.js";
import sendEmail from "../../../utils/sendEmail.js";



// signup
export const signUp = async (req, res, next) => {
  
    const { userName, email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (user) {

     return next(new StatusCodeError("email areadly exist",409)) 
    }
     const token = generateToken({payload:{email}, signature:process.env.EMAIL_SIGNTURE,expiresIn:60*1}) ;
     const link= `http://localhost:5000/auth/confirmEmail/${token}`;
    
     const reToken = generateToken({payload:{email}, signature:process.env.EMAIL_SIGNTURE,expiresIn:60*60*24*30}) ;
    const reLink= `http://localhost:5000/auth/newConfirmEmail/${reToken}`;
  
    const html=` <a href=${link}>click here to confirm your email now </a> 
                <br/><br/><br/>
                  <a href=${reLink}>click here to new confirm email</a>`
    
    const info = await sendEmail({to:email , subject:"confirm email", html})

    if(!info)
    {
      return next(new StatusCodeError('reject email..',400))
    }
    const hashPassword = hash({ plaintext: password });
    const createUser = await userModel.create({
      userName,
      email,
      password: hashPassword,
     // role:"admin"
    });
    return res.status(201).json({
      message: "User added successfully",
      user: createUser
    });

};
//confirm Email
export const confirmEmail =async(req,res,next)=>{
   const {token} = req.params
 //console.log("token........."+token)
  const {email} = verifyToken({ payload: token ,signature:process.env.EMAIL_SIGNTURE});
  const update_confirm_email_user = await userModel.findOneAndUpdate({email:email},{confirmEmail:true})
 // console.log({update_confirm_email_user})
  return  update_confirm_email_user? res.status(200).json({message:"confrim email is done "})//redirect("https://youtu.be/zhmlEB1nwpo")
                                :  next(new Error('not register account'))   
}
//new confirm Email
 export const newconfirmEmail = async(req,res,next)=>{
  const {token} = req.params;
  const {email}= verifyToken({payload:token , signature:process.env.EMAIL_SIGNTURE});
  const new_token_to_confirm_email = generateToken({payload:token , signature:process.env.EMAIL_SIGNTURE,expiresIn:60*1});
 const new_link= `http://localhost:5000/auth/ConfirmEmail/${new_token_to_confirm_email}`
 const ref_new_link= `http://localhost:5000/auth/ConfirmEmail/${token}`
  const html  =`<a href=${new_link}>Click here to confirm your email</a>
  <br/><br/><br/>
  <a href=${ref_new_link}>Click here to new confirm your email</a>`
 const info =  await sendEmail({to:email ,subject:"new confirm email" , html})
 if(!info)
 {
   return next(new StatusCodeError('rejected Email',400))
 }
 return res.status(200).json({message:"Done check your email"})

}

//login
export const logIn = async (req, res, next) => {

    const { email, password } = req.body;
    const user = await userModel.findOne({  email });
    if (!user) {
      return next(new StatusCodeError('User Not Found ', 404))  //res.json({ message: "User not found" });
    }
    if(user.confirmEmail != true)
    {
     return next(new StatusCodeError('Not register account please make confirm email ', 404)) 
    }

    const match = compare({ plaintext: password, hashValue: user.password });

    if (!match) {
      return next(new StatusCodeError('password incorrect',404)) //res.json({ message: "Password incorrect" });
    }

    const token = generateToken({
      payload: {
        id: user._id,
        isLoggedIN:true,
        email: user.email
      },
    });

    user.status = "Active";
    await user.save();

    return res.status(202).json({ message: "Logged in successfully" , access_token : token });
  
};
//forget password
export  const forgetPassword= async(req,res,next)=>{
  const {email} = req.body;
  
  const checkUser = await userModel.findOne({email});
  if(!checkUser){
    return next(new StatusCodeError('user not found or register',404))
  }

  const forgetPasswordToken = generateToken({
    payload:{email:checkUser.email , id:checkUser._id},
    signature:process.env.FORGET_PASSWORD_SIGNTURE ,
    expireIn:60*10});

    console.log(forgetPasswordToken)
    const subject ="forget password"

    const linkforgetpassword= `http://localhost:5000/auth/resetPassword/${checkUser._id}/${forgetPasswordToken}` 
    const html = `<a href=${linkforgetpassword}>Click here to make new password</a>`
    const info = await sendEmail({to:email ,subject ,html})
    if(!info)
    {
      return next(new StatusCodeError('rejected email',400))
    }
    
}
//reset password
export  const resetPassword= async(req,res,next)=>{

 const {userId,f_p_token}= req.params;
 const {password}=req.body
 console.log(userId,f_p_token);
  
  const checkUser = await userModel.findOne({_id:userId});
  if(!checkUser){
    return next(new StatusCodeError('user not found or register',404))
  }

  const verify_Token=  verifyToken({payload:f_p_token,signature:process.env.FORGET_PASSWORD_SIGNTURE})
  console.log(verify_Token);
  if(!verify_Token.email || !verify_Token.id)
  {
    return next(new  StatusCodeError('invalid  forgot token payload ....'))
  }

  checkUser.password=hash({plaintext:password});
  await checkUser.save()

  return res.send("Done successfuly change password And  Please Login...")
   

}


 //delete user if not confirm email

// export const newconfirmEmail =asyncHandlier( async(req,res,next)=>{
//   const {token} = req.params
//  // console.log("refresh token  is.....    "+token)

//   const {email} = verifyToken({ payload: token ,signature:process.env.EMAIL_SIGNTURE});
//   //console.log("Uaaaaaaaaaa Nassssssssssss "+email)


//   const user = await userModel.deleteOne({email, confirmEmail:false})
//   return  res.status(200).redirect('https://youtu.be/zhmlEB1nwpo')
// //                           : res.status(400).send("not register account")//next(new StatusCodeError('not register account',400))
// }
// )