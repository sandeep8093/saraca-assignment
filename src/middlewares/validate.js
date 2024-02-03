const Joi = require('joi');

const signUp = (req,res,next) => {

  const schema = Joi.object({
    name: Joi.string().required(),
    password: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
    imageUrl: Joi.string().required(),
    address: Joi.string(),
    profileSummary: Joi.string().required(),
    gender:Joi.string().valid('Male','Female','Others').required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  next(); 
};

const login = (req,res,next) => {
    const schema = Joi.object({
      email: Joi.string().required(),
      password: Joi.string().required()
    });
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
  
    next(); 
};


module.exports = {
    signUp,
    login
   
}
