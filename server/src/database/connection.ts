import { connect } from "mongoose"

export const dbConnection = async () => {
    try {
        const db = process.env.MONGO_URI;
        if (!db) {
            throw new Error("Connection string is not defined")
        }
        await connect(db);
        console.log("successfully connected to mongoDB");
    } catch(err) {
        console.error((err as Error).message);
    }
}