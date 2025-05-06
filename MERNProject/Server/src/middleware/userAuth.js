const {ValidName, ValidEmail, ValidPassword} = require('../Validation/AllValidation')

exports.Valider = (req,res,next)=>{
    try{
    
        const data = req.body;
    
        if (!data) return res.status(400).send({ status: false, msg: `can't empty body` })
    
            const { name, email, password } = data;
        
            // Name Validation
            if (!name) return res.status(400).send({ status: false, msg: "Name is required" });
            if (!ValidName(name)) return res.status(400).send({ status: false, msg: "Name must contain only letters and spaces" });
            
            
            // Email Validation
            if (!email) return res.status(400).send({ status: false, msg: "Email is required" });
            if (!ValidEmail(email)) return res.status(400).send({ status: false, msg: "Email format is invalid" });
            
            
            // Password Validation
            if (!password)  return res.status(400).send({ status: false, msg: "Password is required" });
            if (!ValidPassword(password))  return res.status(400).send({ status: false,msg: "Password must be at least 8 characters long and include one uppercase letter, one number, and one special character" });
        next()
    
    }
    catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
    }