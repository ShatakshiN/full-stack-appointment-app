const http = require('http');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const sequelize = require('./util/database');
var cors = require('cors');
const User = require('./models/appointmentUser');
app.use(cors());

app.use(bodyParser.json());

app.post('/add-user',async (req,res,next)=>{
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
    
   

});

app.get('/add-user', async (req,res,next)=>{

    const users =  await User.findAll();
    res.status(200).json({allUser : users})
});

// Add a new endpoint for deleting a user
app.delete('/delete-user/:userId', async (req, res, next) => {
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
});




sequelize.sync()
    .then(user =>{
        //console.log(user);
        app.listen(4000);
        console.log('server is running')

    })
    .catch(err => console.log(err));


