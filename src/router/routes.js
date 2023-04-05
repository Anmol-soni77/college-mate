const express = require("express")
const router = express.Router();
const path = require('path');
const bcrypt = require("bcrypt");
const client = require('../db/model');
const auth = require('../middleware/authentication');
const cloudinary = require('cloudinary').v2;
console.log(`dirictory path is : ${__dirname}`);

// Configuration 
cloudinary.config({
    cloud_name: "da9i6wrgu",
    api_key: "442149359759167",
    api_secret: "KsLVtYYdg-uM6NCD4tZ0FL7K2hQ"
});

router.get("/",(req,res)=>{
    res.render('login',{
        content:""
    });
})

router.get("/home",auth,async (req,res)=>{
    try {
        let user = req.user;
        let latest = await client.find().limit(4).sort({_id:-1});
        latest = latest.filter((currentelement)=>{
            return currentelement.username != req.user.username;
    })
        let sameyear = await client.find({year:user.year}).limit(3);
        sameyear = sameyear.filter((currentelement)=>{
            return currentelement.username != req.user.username;
    })
        let samebranch = await client.find({branch:user.branch}).limit(3);
        samebranch = samebranch.filter((currentelement)=>{
            return currentelement.username != req.user.username;
    })
        res.render('home',{
        sameyear,
        latest,
        samebranch,
    })
} catch (error) {
    res.render('filler',{
        content:error
    });
    // res.send(error)
}
})

router.get("/logout",auth,async (req,res)=>{
    try {
        
        console.log("This is before removing token");
        console.log(req.user.tokens);
        
        req.user.tokens = req.user.tokens.filter((currentelement)=>{
            return currentelement.token != req.token;
        })

        console.log("This is After removing token");
        console.log(req.user.tokens);

        res.clearCookie('jwt');
        await req.user.save();

        res.render('login',{
            content:""
        });
    } catch (error) {
        // res.render(error)
        res.render('login',{
            content:""
        });
    }
})

router.post("/login",async (req,res)=>{
    try {
        const username = req.body.username;
        const pass = req.body.password;
        const user = await client.findOne({username});
        
        const is_bpass_corr = await bcrypt.compare(pass,user.password); 

        const token = await user.genetratetoken();
        console.log(token);

        let latest = await client.find().limit(4).sort({_id:-1});
        latest = latest.filter((currentelement)=>{
            return currentelement.username != user.username;
    })
        let sameyear = await client.find({year:user.year}).limit(3);
        sameyear = sameyear.filter((currentelement)=>{
            return currentelement.username != user.username;
    })
        let samebranch = await client.find({branch:user.branch}).limit(3);
        samebranch = samebranch.filter((currentelement)=>{
            return currentelement.username != user.username;
    })
        console.log(user.branch);
        // if (samebranch == "") {
        //     console.log(`This is people of same branch ${samebranch}`);            
        // }

        if (is_bpass_corr) {
            res.cookie("jwt",token,{
                expires: new Date(Date.now()+ 1800000),
                httpOnly:true,
            });
            res.render('home',{
                sameyear,
                latest,
                samebranch,
            })
        }
        else{
            res.status(500).render('login',{
                content:"Password or email does'nt match"
            })
        }
    } catch (error) {
        res.render('filler',{
            content:error
        })
    }
})

router.post("/signup",async (req,res)=>{
    try {
            const newclient = new client(req.body);
            const user = await newclient.save();
            const token = newclient.genetratetoken();
            // console.log(token);        
            console.log(user);
            res.render('login',{
                content:""
            });

    } catch (err) {
        // res.send(err);
        res.render('login',{
            content:`Erroorrr is       : ${err}`
        });
    }
})

// router.post("/signup",async (req,res)=>{
//     try {
//         let data = req.files.image;
//         const ress = cloudinary.uploader.upload(data.tempFilePath)
//         ress.then(async (result)=>{
//             console.log(result);
//             req.body.image = result.url;
//             const newclient = new client(req.body);
//             const user = await newclient.save();
//             const token = newclient.genetratetoken();
//             // console.log(token);        
//             console.log(user);
//             res.render('login',{
//                 content:""
//             });
//         }).catch((err)=>{
//             console.log(`Error occured : ${err}`);
//         })
//     } catch (err) {
//         // res.send(err);
//         res.render('login',{
//             content:`Erroorrr is       : ${err}`
//         });
//     }
// })

router.get("/login",(req,res)=>{ 
    res.render('login',{
        content:""
    }) 
})

router.get("/student/:username",auth,async (req,res)=>{
    try {
        const usernam = req.params.username;
        const user = await client.findOne({username:usernam});
        console.log(user.image);
        res.render('user',{
            user,
        }) 
    } catch (error) {
        // res.send(error)
        res.render('login');
    }
})

router.get("/myprofile/",auth,async (req,res)=>{
    try {
        const usernam = req.user.username;
        const user = await client.findOne({username:usernam});
        console.log(user.image);
        res.render('user',{
            user,
        }) 
    } catch (error) {
        // res.send(error)
        res.render('login');
    }
})

router.get("/viewmore/year",auth,async (req,res)=>{
    try {
        const year = req.user.year;
        let users = await client.find({year});
        users = users.filter((currentelement)=>{
            return currentelement.username != req.user.username;
        })
        res.render('viewmore',{
            users,
        }) 
    } catch (error) {
        // res.send(error)
        res.render('filler',{
            content:error
        });
    }
})

router.get("/viewmore/branch",auth,async (req,res)=>{
    try {
        const branch = req.user.branch;
        let users = await client.find({branch});
        users = users.filter((currentelement)=>{
            return currentelement.username != req.user.username;
        })
        res.render('viewmore',{
            users,
        }) 
    } catch (error) {
        // res.send(error)
        res.render('filler',{
            content:error
        });
    }
})

router.get("/viewmore/latest",auth,async (req,res)=>{
    try {
        let users = await client.find().sort({_id:-1});
        users = users.filter((currentelement)=>{
            return currentelement.username != req.user.username;
    })
        res.render('viewmore',{
            users,
        }) 
    } catch (error) {
        // res.send(error)
        res.render('filler',{
            content:error
        });
    }
})

router.get("/test",async(req,res)=>{
    try {
        const user = await client.findOne({username:"test1"});
        user.skills.forEach(element => {
            console.log(element);
        });
        res.send(user.skills)
    } catch (error) {
        res.send(error);
    }
})

router.get("/about",async(req,res)=>{
    try {
        res.render('about');
    } catch (error) {
        res.send(error);
    }
})

router.get("/signup",(req,res)=>{
    res.render('signup') 
})

router.get("/find",auth,(req,res)=>{
    res.render('find') 
})

router.get("/update",auth,async(req,res)=>{
    try {
        res.render('update',{
        user:req.user,
        }) 
    } catch (error) {
        res.render('login');
    }
})

router.post("/update/:field",auth, async(req,res)=>{
    try {
        
        let field = req.params.field;
        let searchterm = req.body.updateterm;
        let query = {};
        query[field] = searchterm;
        // console.log(`field is: ${field} and searchterm is : ${searchterm}`);
        // console.log("Username is  : " + req.user.username);
        // console.log("name is  : " + req.user.name);
        let updateuser = await client.update({username:req.user.username},query)
        // console.log(`Update hua ya nahi ? :`);
        console.log(updateuser);
        res.render('update',{
        user:req.user,
        }) 

    } catch (error) {
        console.log(error);
        res.send(error);
    }
})

router.post("/find/:fields",auth,async(req,res)=>{
    try {
        let field = req.params.fields;
        let searchterm = req.body.findingparam;
        let query = {};
        query[field] = searchterm;
        let findusers = await client.find(query);
        findusers = findusers.filter((currentelement)=>{
            return currentelement.username != req.user.username;
        })

        // res.send( `${field} : ${searchterm}`);
        // res.send( findusers );
        res.render('findresult',{
            findusers
        });
        
    } catch (error) {
        // res.status(500).send(error);
        res.render('login');
    }
})

router.get("*",(req,res)=>{
    res.send("404 Error occured"); 
})

module.exports = router;