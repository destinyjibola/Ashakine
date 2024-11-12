import mongoose from "mongoose"

export async function connect() {
    try {
        mongoose.connect(process.env.DATABASE_URL!);
        const connection = mongoose.connection;

        connection.on("connected", ()=>{
            console.log('MongoDB connected succesfully')

        })

        connection.on('error', (err)=>{
            console.log("MongoDB connection error. please make sure Mongo is running " + err)
            process.exit()

        })
    } catch (error) {
        console.log('Something goes wrong')
        console.log(error)
    }
}