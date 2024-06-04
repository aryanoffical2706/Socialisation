const express=require('express');
const { register, login, followUser, logout, updatePassword, updateProfile, deleteMyProfile, myProfile, getUserProfile, getAllUsers, forgotPassword, resetPassword, myPosts, userPosts } = require('../controllers/User');
const { isAuthenticated } = require('../middlewares/auth');
const { commentOnPost } = require('../controllers/Post');

const router=express.Router();


router.route("/register").post(register)
router.route("/login").post(login);
router.route("/follow/:id").get(isAuthenticated,followUser)
router.route("/logout").post(isAuthenticated,logout)
router.route("/update/password").put(isAuthenticated,updatePassword);
router.route("/update/profile").put(isAuthenticated,updateProfile);
router.route("/delete/me").delete(isAuthenticated,deleteMyProfile)
router.route("/me").get(isAuthenticated,myProfile)
router.route("/my/posts").get(isAuthenticated,myPosts)
router.route("/user/:id").get(isAuthenticated,getUserProfile)
router.route("/users").get(isAuthenticated,getAllUsers)
router.route("/userPosts/:id").get(isAuthenticated,userPosts)

router.route("/forgot/password").post(forgotPassword)
router.route("/password/reset/:token").put(resetPassword)

module.exports=router; 