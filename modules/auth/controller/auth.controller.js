const userModel = require("../../../DB/models/user.model");
const bcrypt = require("bcrypt");
const sendEmail = require("../../../service/sendEmail");
var jwt = require("jsonwebtoken");

const signUp = async (req, res) => {
  try {
    const { userName, email, password, age } = req.body;

    let user = new userModel({ userName, email, password, age });
    const addedUser = await user.save();
    var token = jwt.sign({ id: addedUser._id }, process.env.verfyTokenKey,{expiresIn:60});
    // http://localhost:3000/comfirm
    let URL = `${req.protocol}://${req.headers.host}/api/v1/auth/confirm/${token}`;
    await sendEmail(email, `<a href='${URL}'>please click here to verfiy</h1>`);
    res.json({ message: "Done", addedUser });
  } catch (error) {
    if (error.keyValue && error.keyValue.email) {
      res.status(422).json({ message: "this email is already register", error });
    } else {
      res.status(404).json({ message: "invalid email", error });
    }
  }
};

const signIn = async (req, res) => {
  const { email, password } = req.body;
  const foundedUser = await userModel.findOne({ email });
  if (foundedUser) {
    if (foundedUser.isConfirmed) {
      bcrypt.compare(password, foundedUser.password, function (err, result) {
        // result == true
        if (result) {
         var token = jwt.sign({ id: foundedUser._id,isLogin:true }, process.env.verfyTokenKey);

          res.json({ message: "WELCOME", token });
        } else {
          res.status(422).json({ message: "your password is incorrect" });
        }
      });
    } else {
        res.status(422).json({ message: "You have to verify your email first" });

    }
  } else {
    res.status(404).json({ message: "email not exist please register first" });
  }
};


const confirmEmail =  async(req,res) =>{
  try {
    let { token } = req.params;

    if (token == undefined || token == null || !token) {
      res.status(404).json({ message: "you should have a token" });
    } else {
      let decoded = jwt.verify(token, process.env.verfyTokenKey);
      if (decoded) {
        let { id } = decoded;
        let foundedUser = await userModel.findById(id);
        if (foundedUser) {
          if (foundedUser.isConfirmed) {
            res.status(400).json({ message: "Email already confirmed" });
          } else {
            let updateUser = await userModel.findByIdAndUpdate(foundedUser.id, { isConfirmed: true }, { new: true });
            res.status(200).json({ message: "Email confiemed scussfully" });
          }
        } else {
          res.status(400).json({ message: "invalid email" });
        }
      } else {
        res.status(403).json({ message: "invalid token" });
      }
    }
  } catch (error) {
   res.status(400).json({ message: "invalid token", error });

  }
}

module.exports = {
  signUp,
  signIn,
  confirmEmail,
};





// senderEmail/SenderPassword
// reciver email
// messgae


// http://localhost:3000/api/v1/auth/confirm/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYzAzNDRkMmMwMjVkYTI3OTRiZDZhZSIsImlhdCI6MTY1Njc2MzQ2OX0.2RdpRBQBSHjx8ppthlBHjfFWqUeRXVqZ9Nug1OwlhtU