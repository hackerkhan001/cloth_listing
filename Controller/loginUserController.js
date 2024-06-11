const User = require('../Model/Registerationmodel');
const Admin = require('../Model/adminmodel');
const {generateSessionToken} = require('../utlisFunction/sessionProvider');
const bcrypt = require('bcrypt');

async function loginUser(req,res){
    const {email, password} = req.body;
    if(email == 'admin@gmail.com' && password=="admin@123"){
        let admin;
        const isExist = await Admin.findOne({where: {email }});
        if(isExist){
            const deleteRecord = await Admin.destroy({where : {email}})
            if(deleteRecord){
                admin = await Admin.create({email , password}); 
            }
        }else{
            admin = await Admin.create({email , password});
        }
        res.status(201).json({role : 'admin' , user: admin ,msg: "Valid Email or Password" });
    }
    else{
    try{
        const user = await User.findOne({where: { email} });
        const hashedPasswordFromDatabase = user.password;
        const passwordMatch = await bcrypt.compare(password, hashedPasswordFromDatabase);

        if(!user){
            res.status(403).send({msg:"Invalid Mail or Passoword" })
        }    
        if (passwordMatch) {
            const sessionToken = generateSessionToken(user);
            res.status(201).json({role: 'user', user :user, msg: "Valid Email or Password",token : sessionToken});
        }
        else {
            return res.status(403).send({ msg: "Invalid Email or Password" });
        }
        
    }catch(error){
        console.log("Error in Login", error);
    }
}
}

module.exports = {loginUser};