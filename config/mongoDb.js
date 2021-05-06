const mongoose = require('mongoose');

require('dotenv').config();

const connectDb = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })

        console.log(`MongoDb connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}


module.exports = connectDb

//import from terminal>> mongoimport --db=po-sys --file=invoices.json --jsonArray
