const mongoose = require("mongoose");


exports.connectDatabase = () => {
    mongoose.connect(process.env.MONGO_URL, {
        serverSelectionTimeoutMS: 5000
    }).then((con) => {
        console.log(`Database is connect to ${con.connection.host}`)
    }).catch((e) => console.log(e))
}