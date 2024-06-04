const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto=require("crypto")
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter your name"],
    },
    avatar: {
        public_id: String,
        url: String
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: [true, "Email already exists"]
    },
    password: {
        type: String,
        required: [true, "Please enter a password"],
        minLength: [6, "Password must be at least 6 characters long"],
        select: false,
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    }],
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    resetPasswordToken: String,
    resetPasswordExpire:Date,
});

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        try {
            this.password = await bcrypt.hash(this.password, 10);
            
        } catch (error) {
            console.log(error)
            
        }
    }
    next();
});

userSchema.methods.matchPassword = async function (password) {
    try {
        const isMatch = await bcrypt.compare(password, this.password);
        
        return isMatch;
    } catch (error) {
        console.error("Error comparing passwords:", error);
        return false;
    }
};


    

userSchema.methods.generateToken = function () {
    return jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
};
userSchema.methods.getresetPasswordToken=function(){
    const resetToken=crypto.randomBytes(20).toString("hex");
    console.log(resetToken)
    this.resetPasswordToken=crypto.createHash("sha256").update(resetToken).digest("hex");
    this.resetPasswordExpire=Date.now()+30*60*1000;
 
    return resetToken
}
module.exports = mongoose.model("User", userSchema);
