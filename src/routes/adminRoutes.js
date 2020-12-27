const express= require("express");

// express.Router() is a class to create route handlers

const adminRouter = express.Router(); 
const Singlebookdata = require('../model/Singlebookdata')
adminRouter.use(express.static("./public"));
function router()
{
    const navi=[
        {
            link:'/home',name:'Home'
        },
        {
            link:'/books',name:'Books'
        },
        
        
        
        {
            link:'/',name:'Log Out'
        }
    
    
    ]; 

   
adminRouter.get('/',function(req,res)
{
    Singlebookdata.find()
    .then(function(books){
    res.render("editbooks",{
        navi,title:"Books",books
        
            });
        });
    })
    adminRouter.get('/:id',function(req,res)
    {
        const id = req.params.id;
        Singlebookdata.findById({_id:id})
        .then(function(book){
         res.render('updatebook',{
            
           
            navi,
             title: 'Books',
             book,
             
         });
        });
      }); 
   
    adminRouter.post('/:id/update',function (req,res)
    {
        const id = req.params.id;
    console.log('UPDATING',req.body);
    var item={  
       title:req.body.title,
       author: req.body.author,
       genre:req.body.genre,
       image: req.body.image
       
  }
  Singlebookdata.findByIdAndUpdate({_id:id},item,{new:true},(err,doc)=>{
      
    if(!err){
        // res.send(doc)
        res.redirect("/books");
    }
    else
    {
        console.log("error");
    };
  
    
});


  console.log("success");
});


    

adminRouter.get('/delete/:id',function(req,res)
{
const id= req.params.id;
// var condition={"_id":id};
Singlebookdata.deleteOne({_id: id})
    .then(function(){
    res.redirect("/books")
        
        
     })
  

})


return adminRouter;
}
module.exports=router;