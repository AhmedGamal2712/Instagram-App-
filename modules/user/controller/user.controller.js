const userModel = require("../../../DB/models/user.model");


const getProfile = async(req, res) => {
    console.log(req.userId);
    const userData = await userModel.findById(req.userId);
    
    res.json({ message: "Done", userData });
}

const updateProfilePic = async (req, res) => {
  console.log(req.file);
  const user = await userModel.findById(req.userId) 
  if (user) {
    console.log(req.fileURL);
    // let imgURL = req.fileURL+'/' + req.file.filename;
    let imgURL = `${req.protocol}://${req.headers.host}/${req.fileURL}/${req.file.filename}`;
    let updatedUser = await userModel.findByIdAndUpdate(user._id, { profilePic: imgURL },{new:true});
  res.json({ message: "Done", updatedUser });
  } else {
  res.status(404).json({ message: "invalid user" }); 
  }
  
}

const updateCoverPhotos = async(req, res) => {
  const user = await userModel.findById(req.userId)
  if (user) {
    let imagesURLS = [];
   
    for (let i = 0; i < req.files.length; i++) {
      let imgURL = `${req.protocol}://${req.headers.host}/${req.fileURL}/${req.files[i].filename}`;
      imagesURLS.push(imgURL);
    }
    let updatedUser = await userModel.findByIdAndUpdate(user._id, { coverPics: imagesURLS }, { new: true });
  res.json({ message: "Done", updatedUser });
  } else {
  res.status(404).json({ message: "invalid user" }); 
  }
}

module.exports = {
  getProfile,
  updateProfilePic,
  updateCoverPhotos
};