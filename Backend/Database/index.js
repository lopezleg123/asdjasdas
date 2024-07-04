const mongoose = require("mongoose");

const MONGO_URL = "mongodb+srv://agustinlopez:xPSAtjaebtkdDLth@cluster0.sd9eqeh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const db = async () =>{
    try {
        const conn = await mongoose.connect(MONGO_URL);
        console.log("conexion completada: ", conn.connection.host);
    } catch (error) {
        console.log(error)
    }
}

module.exports = db;
