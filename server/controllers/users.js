const User = require('../models/users')

exports.getAllUsers = async (req, res) => {

}

exports.getUserById = async (req, res) => {
    
}

exports.createUser = async (req, res) => {
    try {
        const data = new User({
            username: req.body.username,
            password: req.body.password,
            country: req.body.country
        })
        const result = await data.save()
        if (result) {
            return res.status(201).send({
                msg: `User ${result.username} Created`,
                createdUser: {
                    url: `http://localhost:3000/users/${result._id}`,
                    result
                }
            })
        }
        res.status(500).send({
            msg: 'Error occured'
        })
    } catch (err) {
        res.status(500).send({
            err
        })
    }
}

exports.updateUser = async (req, res) => {
    
}

exports.patchUser = async (req, res) => {
    
}

exports.deleteUser = async (req, res) => {
    
}