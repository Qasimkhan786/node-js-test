const bcrypt = require('bcrypt');
const userSchema = require('../models/user.model');

const userSignUp = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).send({
                message: "Something is missing.",
                status: false
            });
        } else {
            userSchema.findOne({ username }).then((user) => {
                if (user) {
                    return res.status(400).send({
                        message: "You already signup. Please login to proceed",
                        status: false
                    });
                } else {
                    const hashedPassword = bcrypt.hashSync(password, 10);
                    const newUser = new userSchema({
                        username,
                        password: hashedPassword
                    })
                    newUser.save().then((result) => {
                        if(result){
                            return res.status(200).send({
                                message: "User created successfully.",
                                status: true
                            });
                        }else{
                            return res.status(400).send({
                                message: "Something went wrong while creating new user.",
                                status: false
                            });    
                        }
                    }).catch((err) => {
                        console.log(err);
                        return res.status(400).send({
                            message: "Something went wrong while creating new user.",
                            status: false
                        });
                    });
                }
            }).catch((err) => {
                console.log(err);
                return res.status(400).send({
                    message: "Something went wrong while finding user.",
                    status: false
                });
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "Internal server error!",
            status: false
        })
    }
}

const userLogin = async (req, res) => {
    try {

    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "Internal server error!",
            status: false
        })
    }
}


module.exports = {
    userSignUp,
    userLogin
}