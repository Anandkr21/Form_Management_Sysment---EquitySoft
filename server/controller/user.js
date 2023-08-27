const { User } = require('../model/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

require('dotenv').config();

module.exports = {

    // user registration
    register: async (req, res) => {
        try {
            const { name, email, password, age, gender, role } = req.body;

            if (!name || !email || !password || !age || !gender || !role) {
                res.status(400).send({
                    status: true,
                    message: "Please provide all details."
                })
            }

            const existUser = await User.findOne({ where: { email } });
            if (existUser) {
                res.status(400).send({
                    status: false,
                    message: "User already registerd, please Login!"
                })
            }

            // password hashing
            const hashedPassword = await bcrypt.hash(password, 7)

            const newUser = await User.create({
                name, email, password: hashedPassword, age, gender, role
            });

            res.status(201).send({
                status: true,
                message: newUser
            })
        } catch (error) {
            res.status(500).send({
                status: false,
                error: error.message
            })
        }
    },

    login: async (req, res) => {
        try {
            let { email, password } = req.body;
            let user = await User.findOne({ where: { email } });
            if (!user) {
                res.status(404).send({
                    status: false,
                    msg: "User Not found!"
                })
            }

            let checkPassword = await bcrypt.compare(password, user.password)
            if (!checkPassword) {
                res.status(401).send({
                    status: false,
                    msg: "Invalid password"
                })
            }

            const token = jwt.sign({ userID: user.id }, process.env.Secret_Key, {
                expiresIn: "1d"
            })

            const refreshToken = jwt.sign({ userID: user.id }, process.env.Refresh_Token, {
                expiresIn: "7d"
            })

            res.status(200).send({
                status: true,
                msg: `${user.name} logged in successfully.`,
                token: token,
                refresh_Token: refreshToken,
                user: user
            })
        } catch (error) {
            console.log(error);
            res.status(500).send({
                status: false,
                error: error.message
            })
        }
    },

    getAllUsers: async (req, res) => {
        try {
            const allUsers = await User.findAll();
            res.status(200).json({
                status: true,
                message: 'Successfully retrieved all users',
                allUsers: allUsers
            });
        } catch (error) {
            res.status(500).json({
                status: false,
                error: error.message
            });
        }
    },

    resetPassword: async (req, res) => {
        const { email, password } = req.body; // Assuming you're receiving email and new password in the request body

        try {
            const user = await User.findOne({ where: { email } });
            if (!user) {
                return res.status(404).json({
                    status: false,
                    message: "User not found"
                });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            await user.update({ password: hashedPassword });

            return res.status(200).json({
                status: true,
                message: "Password updated successfully"
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                status: false,
                error: error.message
            });
        }
    },

    // update user data by id
    updateUserById: async (req, res) => {
        const userID = req.params.id;
        const updateData = req.body;
        try {
            const data = await User.update(updateData, {
                where: {
                    id: userID
                }
            })

            res.status(200).send({
                status: true,
                message: "data updated",
            })
        } catch (error) {
            res.status(500).json({
                status: false,
                error: error.message
            });
        }
    },

    // find user by id
    getUserbyId: async (req, res) => {
        try {
            const userId = req.params.id;
            const user = await User.findByPk(userId)
            if (!user) {
                res.status(404).send({
                    status: false,
                    msg: "User not found"
                })
            }
            res.status(200).send({
                status: true,
                msg: user
            })

        } catch (error) {
            res.status(500).json({
                status: false,
                error: error.message
            });
        }
    },

    deleteUser: async (req, res) => {
        try {
            const id = req.params.id;
            const user = await User.findByPk(id)

            if (!user) {
                res.status(404).send({
                    status: false,
                    msg: "User not found"
                })
            }

            user.destroy()

            res.status(200).send({
                status: true,
                msg: `${user.name} deleted.`
            })
        } catch (error) {
            res.status(500).json({
                status: false,
                error: error.message
            });
        }
    }
}
