const express = require('express');
const { register, login, getAllUsers, resetPassword, updateUserById, getUserbyId, deleteUser } = require('../controller/user');

const userRoute = express.Router()

userRoute.get('/alluser', getAllUsers)
userRoute.post('/register', register);
userRoute.post('/login', login);
userRoute.post('/reset', resetPassword)
userRoute.patch('/updateUser/:id', updateUserById);
userRoute.get('/getuser/:id', getUserbyId)
userRoute.delete('/deleteuser/:id', deleteUser)

module.exports = { userRoute }