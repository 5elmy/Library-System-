import moment from "moment";
import libraryModel from "../../../../DB/models/books.model.js";
import userModel from "../../../../DB/models/User.model.js";
import cloudnairy from "../../../utils/cloudnairy.js";
import { StatusCodeError } from "../../../utils/errorHandling.js";


export const addBook =async(req,res,next)=>
{ 

    const {id}= req.user ;
    const { bookName } = req.body;
        // console.log( bookName)
    if(!req.file)
    {
        return next(new StatusCodeError('file is required...',400))
    }
    const cloud = await cloudnairy.uploader.upload(req.file.path ,{folder:`book`})
    
   const {secure_url,public_id,folder}= cloud;

   const book = await libraryModel.create({
    bookName,
    bookPic:{secure_url,public_id,folder},
    adminId:id
   })
    return res.status(201).json({message:"Success", book})
}

export const deleteBook  =async(req,res,next)=>
{
    const {bookId} = req.params;
    console.log(bookId)
     const deletedBook=await libraryModel.findByIdAndDelete({_id:bookId});
       await cloudnairy.uploader.destroy(deletedBook.bookPic.public_id)
       console.log(deletedBook)
     return res.json({message:"Done", deletedBook})
}
// get All Books
export const getbooks  =async(req,res,next)=>
{
    const books = await libraryModel.find({})
    return books.length? res.status(200).json({message:"Done",books}) :next(new StatusCodeError('not found book',400))
}
//get all books valid
export const getValidbooks  =async(req,res,next)=>
{
    const books = await libraryModel.find({statusBook:"valid"})
    return books.length? res.status(200).json({message:"Done",books}):next(new StatusCodeError("Not valid book",400))
}
//get all books  invalid

export const getInvalidbooks  =async(req,res,next)=>
{
    const books = await libraryModel.find({statusBook:"in-valid"}).populate({
        path:"userId",
        select:"userName email "
    })
    return  res.status(200).json({message:"Done",books})
}
//borrow book
export const resevedBook= async(req,res,next)=>{
    const { bookId }= req.params;
    const { endDate}= req.body;
    const reseved_book = await libraryModel.findByIdAndUpdate({_id:bookId},{statusBook:"in-valid",borrowAt:moment().toDate(),
    revertAt:moment(endDate,"DD-MM-YYYY").toDate() ,userId:req.user.id},{new:true})

    return reseved_book? res.status(200).json({message:"Done",reseved_book}): next(new StatusCodeError('not  books',400))
} 
export const calcmoney= async(req,res,next)=>{
    const { bookId }= req.params;
    const dateNow = moment().toDate();
      const rever_book = await libraryModel.findById(bookId);
        let moment1= rever_book.revertAt
     let moment2= moment(dateNow).startOf('day').toString()
     console.log({moment1});
     console.log({moment2});
     const date_thats_u_late = moment(moment2).diff(moment1,"days")
    console.log( {date_thats_u_late})

      if(date_thats_u_late>0)
      {
        rever_book.cost = date_thats_u_late*10
        await rever_book.save() 
      }
      else 
      {
        rever_book.cost= 0
        await rever_book.save()
      }
    return res.status(200).json({message:"Done" , rever_book})
}
// rever book
export const reverBook= async(req,res,next)=>{
    const { bookId }= req.params;
    const dateNow = moment();
    console.log({dateNow})
     const rever_book = await libraryModel.findById(bookId);
        rever_book.statusBook="valid"
        await rever_book.save()
    return rever_book? res.status(200).json({message:"Done",rever_book}): next(new StatusCodeError('not  books',400))

}



// export const updateBook = async (req,res,next)=>{
//     const {bookId}=req.params;
//     console.log({bookId})
//     //const {bookName } = req.body ;
//     if(!req.file)
//     {
//         return next(new StatusCodeError('file is required...',400))
//     }
  
//      const cloud = await cloudnairy.uploader.upload(req.file.path ,{folder:`book`});
//     const {secure_url,public_id}= cloud;
//     const update_book = await libraryModel.findByIdAndUpdate({_id:bookId},{ bookPic:{secure_url,public_id}})
//           await  cloudnairy.uploader.destroy(update_book.bookPic.public_id);
//      return res.json({message:"Done", update_book})
// }