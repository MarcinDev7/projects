import mongoose from "mongoose";

export const connectToDb = async () => {
  mongoose.connect(process.env.DB_URL || "").catch((error) => {
    console.log("Coudn't connect to database", error);
  });

  mongoose.connection.on("connected", () => {
    console.log("Successfully connected to database");
  });
};
