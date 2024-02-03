const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


exports.signup = async(req,res)=>{
    try{
        const {name,password,email,phone,imageUrl,address='',gender,profileSummary} = req.body;
        const savedUser = await User.findOne({email:req.body.email});
        if (savedUser) {
            return res.status(400).json({ message: 'User Already Exists' });
        }

        const newUser = new User({
            name:name,
            password: bcrypt.hashSync(password,10),
            email:email,
            phone:phone,
            imageUrl:imageUrl,
            address:address,
            gender:gender,
            profileSummary:profileSummary
        })
        await newUser.save();
        return res.status(200).json({"message":"User Registered Successfully"});
    }catch(err){
        console.log(err)
        res.status(500).json(err);
    }
}

exports.login= async(req,res) =>{
    try{
        const {email,password} = req.body;
        const savedUser = await User.findOne({email:email});
     
        if(!savedUser){
            return res.status(200).json("User with this email does not exists");
        }
        if(bcrypt.compareSync(password,savedUser.password)){
            const payload = {
                id:savedUser._id,
                email:savedUser.email
            }
            const token=jwt.sign(payload,process.env.JWT_SECRET,{expiresIn: '6h'});
            return res.status(200).json({
                token,
                payload
            })
        }
        else{
            return res.status(400).json("Wrong Password Entered");
        }
    }catch(err){
        res.status(500).json(err);
    }
}
  
exports.getUsers= async(req,res) =>{
    try{
       const savedUsers= await User.find();
       return res.status(200).json(savedUsers);
    }catch(err){
        res.status(500).json(err);
    }
    
}

exports.getUserProfile = async (req, res) => {
    const userId = req.query.id || req.user.id; 
    try {
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ error: 'User not found' });
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
};

exports.updateUser = async (req, res) => {
    const userId = req.user.id; 
    const {name,email,gender,phone,address,profileSummary}= req.body;
    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ error: 'User not found' });

        if (name !== undefined) user.name = name;
        if (phone!==undefined) user.phone = phone;
        if (address!==undefined) user.address = address;
        if (profileSummary!==undefined) user.profileSummary = profileSummary;

        const updatedUser=await user.save();
        res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
};

exports.deleteUser = async(req,res)=>{
    const userId = req.user.id;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const deleted = await User.deleteOne({_id:userId});
        console.log(deleted)
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal server error' });
    }
}