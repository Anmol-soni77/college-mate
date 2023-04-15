require('./model');

const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
mongoose.connect(`mongodb+srv://anmol_77Soni:Soniji%4023@cluster0.gp9fjqp.mongodb.net/must-project2`,{
}).then(()=>{
    console.log("connected successfully");
}).catch((err)=>{
    console.log(`Error is ${err}`);
})

require('./model');