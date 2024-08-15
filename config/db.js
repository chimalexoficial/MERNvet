import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const db = await mongoose.connect(process.env.MONGO_URI);
        const host = `${db.connection.host}`
        const port = `${db.connection.port}`
        console.log(`MogoDB connected on ${host}:${port}`);
    } catch (error) {
        console.log(`error: ${error.message}`);
        process.exit(1);
    }
}

export default connectDB;