const User = require('../models/users');
function isstringinvalid(string){
  if(string == undefined ||string.length === 0){
      return true
  } else {
      return false
  }
}

exports.signup = async (req, res)=>{
  try{
  const { name, email, password } = req.body;
  console.log('email', email)
  if(isstringinvalid(name) || isstringinvalid(email || isstringinvalid(password))){
      return res.status(400).json({err: "Bad parameters . Something is missing"})
  }

  
      await User.create({ name, email, password})
      res.status(201).json({message: 'Successfuly create new user'})
}
  catch(err) {
          res.status(500).json(err);
      }
    }
    exports.login = async (req, res)=>{
      try{
        const {email,password} = req.body;
        if(isstringinvalid(email) || isstringinvalid(password)){
          return res.status(400).json({message:'email id or password is missing',success:false})
        }
      console.log(password);
      const user  = await User.findAll({where:{email}})
      if(user.length > 0){
        if(user[0].password === password){
          res.status(200).json({sucess: true, message:"user logged in successfully"})
        }
        else{
          return res.status(400).json({success:false, message:'Password is incoorect'})
        }
      }
      else{
        return res.status(404).json({success:false , message: 'User Doesnot exitst'})
      }
    }
      catch(err){
        res.status(500).json({message:err,success:false})
      }
    }