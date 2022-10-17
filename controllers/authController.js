const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
  const { name, lastName, email, password } = req.body;
  try {
    //check if user already exists
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json([{ msg: "This User already exists" }]);
    }
    user = new User({ name, lastName, email, password });

    // const newUser = new User({ name, lastName, email, phone });
    // await newUser.save().then((user)=>)

    //hash password
    // gensalt = 10 degré de compléxite de hashage
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    //save the user
    await user.save();

    //login the user ( token)
    const payload = { 
        userId : user._id
    }
    const token = jwt.sign(payload , process.env.SECRET , {expiresIn : '1h'} )
    console.log(token)
    res.send({token , user : {
        name : user.name,
        lastName : user.lastName,
        email : user.email,
        _id : user._id
    }})

  } catch (error) {
    console.log(error);
  }
};
/**********************************************LOGIIIIIIINNNN*********************************/
const login = async (req , res) => {
    const { email , password} = req.body
    try {
        //1check if email exists
        let user = await User.findOne({email})
        if(!user) {
            return res.status(400).send({msg : "BAD CREDENTIALS (EMAIL)"})
        }

        //compare password
        const isMatch = await bcrypt.compare(password , user.password)
        if (!isMatch) {
            return res.status(400).send({msg : "BAD CREDENTIALS (PASSWORD)"})
        }
        const payload = {
            userId : user._id
        }
        const token = jwt.sign(payload , process.env.SECRET , {expiresIn : '1h'} )
    console.log(token)
    res.send({token , user : {
        name : user.name,
        lastName : user.lastName,
        email : user.email,
        _id : user._id
    }})
        
    } catch (error) {
        console.log(error)
        
    }
}

const getAuthUser = (req ,res) => {
    res.send ({user : req.user})
}

module.exports = {
  register,
  login,
  getAuthUser,
};
