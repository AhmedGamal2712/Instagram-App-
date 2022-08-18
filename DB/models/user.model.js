const mongoose = require("mongoose");
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  firstName: String,
  lastName: String,
  age: {
    type: Number,
    required: true,
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
  isConfirmed: {
    type: Boolean,
    default:false
  },
  profilePic: String,
  coverPics: Array,
  lastSean: String,
  role: {
    type: String,
    default:"user"
  },
  gender: {
    type: String,
    enums: ["Male", "Female"],
    default:"Male"
  },
  isBlocked: Boolean,
  Following: [{type:mongoose.Schema.Types.ObjectId, ref:"user"}],
  followers: [{type:mongoose.Schema.Types.ObjectId, ref:"user"}],
  online: Boolean,
  shareLink:String
}, {
  timestamps:true
});

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hashSync(this.password,parseInt(process.env.saltRounds))
})
const userModel = mongoose.model("user", userSchema);


module.exports = userModel;