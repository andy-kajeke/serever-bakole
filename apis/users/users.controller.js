const { create, getAllUsers, getUsersByUserId, updateUser, deleteUser, getUsersByUserEmail } = require('./user.service');
const { genSaltSync, hashSync, compareSync } = require('bcryptjs');
const { sign } = require('jsonwebtoken');

module.exports = {
    /////////////////////////////////////////Create user account Api///////////////////////////////////////////
    createUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);

        create(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: false,
                    message: 'Database connection failed'
                });
            }
            return res.status(200).json({
                success: true,
                data: results
            });
        });
    },

    /////////////////////////////////////////Get all users Api//////////////////////////////////////////////
    getAllUsers: (req, res) => {
        getAllUsers((err, results) => {
            if (err) {
                console.log(err);
                return res.json(err);
            }
            return res.json({
                success: true,
                data: results
            })
        })
    },

    /////////////////////////////////////////Get user by id Api//////////////////////////////////////////////
    getUsersByUserId: (req, res) => {
        const id = req.params.id;
        getUsersByUserId(id, (err, results) => {
            if (err) {
                console.log(err);
                return res.json(err);
            }
            if (!results) {
                return res.json({
                    success: false,
                    message: 'Record not found'
                });
            }
            return res.json({
                success: true,
                data: results
            })
        })
    },

    /////////////////////////////////////////Update user info Api//////////////////////////////////////////////
    updateUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);

        updateUser(body, (err, results) => {
            if (err) {
                console.log(err);
                return err;
            }
            if (!results) {
                return res.json({
                    success: false,
                    message: 'Update user info failed'
                });
            }
            return res.status(200).json({
                success: true,
                message: 'Updated user info successfully'
            });
        });
    },

    /////////////////////////////////////////Delete user Api//////////////////////////////////////////////
    deleteUser: (req, res) => {
        const data = req.params.id;
        deleteUser(data, (err, results) => {
            if (err) {
                console.log(err);
                return res.json(err);
            }
            if (!results) {
                return res.json({
                    success: true,
                    message: 'Deleted user successfully'
                });
            }
            return res.json({
                success: false,
                message: 'Deleting user failed'
            })
        })
    },

    /////////////////////////////////////////Login Api//////////////////////////////////////////////
    loginUser: (req, res) => {
        const body = req.body;
        getUsersByUserEmail(body.email, (err, results) => {
            const userPassword = compareSync(body.password, results.password);
            if (err) {
                console.log(err);
                return err;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: 'Invaild email or password'
                });
            }
            if (userPassword) {
                results.password = undefined;
                const jsontoken = sign({ userPassword: results }, process.env.SECURITY_KEY, {
                    expiresIn: '1h'
                });
                return res.json({
                    success: true,
                    message: 'logged in successfully',
                    token: jsontoken
                });
            } else {
                return res.json({
                    success: false,
                    message: 'Invaild email or password'
                });
            }
        });
    }
}