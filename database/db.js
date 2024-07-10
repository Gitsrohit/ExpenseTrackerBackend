const mongoose = require('mongoose');

const db= async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Database connected successfully');
      } catch (err) {
        console.error('MongoDB connection error:', err.message);
      }
}

module.exports={db};


