const express= require("express");

// express.Router() is a class to create route handlers

const authoradminRouter = express.Router(); 
const Singleauthordata = require('../model/Singleauthordata')
authoradminRouter.use(express.static("./public"));
function router()
{
    const navi=[
        {
            link:'/home',name:'Home'
        },
        {
            link:'/authors',name:'Authors'
        },
     
        
        {
            link:'/',name:'Log Out'
        }
    
    
    ]; 

   
authoradminRouter.get('/',function(req,res)
{
    Singleauthordata.find()
    .then(function(authors){
    res.render("editauthors",{
        navi,title:"Authors",authors
        
            });
        });
    })

    authoradminRouter.get('/:id',function(req,res)
    {
        const id = req.params.id;
        Singleauthordata.findById({_id:id})
        .then(function(author){
         res.render('updateauthor',{
            
          
            navi,
             title: 'Authors',
             author,
             
         });
        });
      }); 
   
    authoradminRouter.post('/:id/update',function (req,res)
    {
        const id = req.params.id;
    console.log('UPDATING',req.body);
    var item={  
       name:req.body.name,
       genre:req.body.genre,
       book1: req.body.book1,
       book2:req.body.book2,
       image: req.body.image
       
  }
  Singleauthordata.findByIdAndUpdate({_id:id},item,{new:true},(err,doc)=>{
      
    if(!err){
        
        res.redirect("/authors");
    }
    else
    {
        console.log("error");
    };
  
    
});


  console.log("success");
});

authoradminRouter.get('/delete/:id',function(req,res)
{
const id= req.params.id;
// var condition={"_id":id};
Singleauthordata.deleteOne({_id: id})
    .then(function(){
    res.redirect("/authors")
        
        
     })
  

})

return authoradminRouter;
}
module.exports=router;