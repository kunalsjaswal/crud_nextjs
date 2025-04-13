import mongoose from "mongoose";

const connectMongooDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI as string);

        console.log("MongoDB connected successfully");
    } catch (error) {
      console.error("MongoDB connection error:", error);
    }
}

export default connectMongooDB;