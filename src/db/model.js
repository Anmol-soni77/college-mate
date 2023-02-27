// REQUIRING THE PACKAGES
const mongoose = require('mongoose');
const validator = require('validator')
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

// DECLEARING THE PACKAGES
const clientSchema = new mongoose.Schema({
    name:{
        type: String,
        required:"This field is required",
        lowercase:true
    },
    lastname:{
        type: String,
        required:"This field is required",
        lowercase:true
    },
    username:{
        type: String,
        required:"This field is required",
        lowercase:true,
        unique:true,
    },
    email:{
        type:String,
        required:"This field is required",
        unique:true,
        validate(value){
            if (!validator.isEmail(value)) {
                throw new Error("Email is invalid");
            }
        }
    },
    hometown:{
        type:String,
        required:"This field is required",
    },
    college:{
        type:String,
        required:"This field is required",
    },
    year:{
        type:String,
        required:"This field is required",
    },
    branch:{
        type:String,
        required:"This field is required",
    },
    sports:{
        type:Array,
        required:"This field is required",
    },
    skills:{
        type:Array,
        required:"This field is required",
    },
    extra:{
        type:Array,
        required:"This field is required",
    },
    clubs:{
        type:Array,
        required:"This field is required",
    },
    image:{
        type:String,
        required:"This field is required",
    },
    password:{
        type:String,
        required:"This field is required",
    },
    tokens:[{
        token:{
                type:String,

            }
        }] 
}) 


// DECLEARING THE METHODS FOR THE INSTANCE OF AN MODELS
clientSchema.methods.genetratetoken = async function () {
    try {
        const tokenn = jwt.sign({_id:this._id},`mynameisnamolsonietmits3rdyearr` );
        this.tokens = this.tokens.concat({token:tokenn} );
        // console.log({token:tokenn});
        await this.save();
        return tokenn;
    } catch (error) {
        console.log(error);
    }
}

// DECLEARING THE PRE-METHODS BEFORE "save()" FUNCTION
clientSchema.pre("save", async function (next){
    if(this.isModified("password")){
        const bpass1 = await bcrypt.hash(this.password, 10);
        this.password = bpass1;
        console.log(bpass1);
    }
    next();
})

// DECLEARING THE PRE-METHODS BEFORE "update()" FUNCTION
// clientSchema.pre("update",async function(next) {
//     const password = this.getUpdate().$set.password;
//     if (!password) {
//         return next();
//     }
//     try {
//         const bpass1 = await bcrypt.hash(this.password, 10);
//         this.getUpdate().$set.password = bpass1;
//         next();
//     } catch (error) {
//         return next(error);
//     }
// });


// MAKING THE MODELS
const client = new mongoose.model('client',clientSchema);

// EXPORING THE MODELS
module.exports = client;