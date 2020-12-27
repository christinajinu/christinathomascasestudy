const express= require("express");

// express.Router() is a class to create route handlers
const loginRouter = express.Router(); 
const Signupdata = require('../model/Signupdata')
loginRouter.use(express.static("./public"));
function router(nav)
{
  
    loginRouter.get('/',function(req,res)
    {
      res.render("adminlogin",{title:"adminlogin",nav,error : ""})
    });
    
loginRouter.post('/adminValidate',function(req,res){
  
  let email =req.body.email;
  let password =req.body.password;   

  if (email == "admin" && password=="1234"){
    res.render('adminhome',{
      
        title:"Library",nav
        // ,link:'/signup',name:'signup'
        
    });
  }
  else {

    res.render("adminLogin",
    {
        nav,
        title:"adminlogin",
        error : "Invalid Credentials! Please Try again!"
    }   
    );    
  }
});
loginRouter.get('/adminhome',function(req,res)
    {
        res.render("adminhome",
        {
        title:"Library",nav
        // ,link:'/signup',name:'signup'
        });
    });
      return loginRouter;
    }
    module.exports=router;     