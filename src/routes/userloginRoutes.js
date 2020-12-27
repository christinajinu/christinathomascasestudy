const express= require("express");

// express.Router() is a class to create route handlers
const userloginRouter = express.Router(); 
const Signupdata = require('../model/Signupdata')
const Singlebookdata = require('../model/Singlebookdata')
const Singleauthordata = require('../model/Singleauthordata')
userloginRouter.use(express.static("./public"));

function router(nav)
{
    userloginRouter.get('/',function(req,res)
    {
        res.render("index",
        {
          title:"Library",nav
    
        });
    });
     userloginRouter.post('/login',function(req,res){
        
        var email=req.body.email;
        var password=req.body.password;
        Signupdata.findOne({email:email,password:password},function(err,user){
           if(user)
           {
             res.redirect('/home');
           }
          
          if(err){
              console.log(err);
              
              res.render("index",
              {
                title:"Library",nav
          
              });
           }
            if(!user){
              
              res.render("index",
              {
                title:"Library",nav
          
              });
               
            }
            
        })
    });
    userloginRouter.get('/home',function(req,res)
    {
        res.render("home",
        {
        title:"Library",link:'/signup',name:'signup',nav
    
        });
    });
   


      return userloginRouter;
    }
    module.exports=router;     