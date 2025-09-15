const mongose = require("mongoose");

const connectDB = async () => {
    try {
        await mongose.connect(process.env.MONGODB_URI, {});
        console.log("MongoDB connected");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
};

module.exports = connectDB;

