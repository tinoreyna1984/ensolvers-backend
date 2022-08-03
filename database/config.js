const mongoose = require("mongoose");

const dbConnection = async () => {
    try {

        await mongoose.connect(process.env.MONGO_URL);
        console.log('Connected to the DB')
        
    } catch (error) {
        console.log(error);
        throw new Error('Error on connecting to the DB');
    }
}

module.exports = { dbConnection };
