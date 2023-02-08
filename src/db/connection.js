const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
mongoose.connect(`${process.env.DATABASE_CONNECTION_STRING}`,{
}).then(()=>{
    console.log("connected successfully");
}).catch((err)=>{
    console.log(`Error is ${err}`);
})
