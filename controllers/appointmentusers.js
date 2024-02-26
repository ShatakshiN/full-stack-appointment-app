const User  = require('../models/appointmentUser');

exports.postUsers = async (req,res,next)=>{
    try{

        if(!req.body.contact){
            throw new Error('require phone no')
        }

        if (!/^\d+$/.test(req.body.contact)) {
            throw new Error('Invalid phone number format');
        }

        if (!req.body.name){
            throw new Error('require name')

        }

        if(!req.body.mail){
            throw new Error('require mail')
        }

        const name = req.body.name;
        const contact = req.body.contact;
        const mail = req.body.mail;

        const data = await User.create({
            name : name,
            contact: contact,
            mail : mail
        
        });
        res.status(201).json({newUserDetail : data}); //sending this data to the frontend

    }catch(error){
        res.status(500).json({error : error.message})
    }
    
};

exports.getUsers = async (req,res,next)=>{

    const users =  await User.findAll();
    res.status(200).json({allUser : users})
};

exports.delUser =  async (req, res, next) => {
    const userId = req.params.userId;

    try {
        // Find the user by ID
        const user = await User.findByPk(userId);

        if (!user) {
            throw new Error('User not found');
        }

        // Delete the user
        await user.destroy();

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.err = (req,res,next)=>{
    res.status(404);
    res.send('<h1>page not found</h1>')
};
