const express =require('express');
const path = require('path');
const {v4:uuid} =require("uuid");
const methodOverride =require('method-override');

const app =express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(methodOverride('_method'));

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

//arry db
let comments = [
    {
            id:uuid(),
            username:"Mophamed",
            comment:'Lol that was good'
    },
    {
        id:uuid(),
        username:"Asik",
        comment:'1st that is  good'
},
{
    id:uuid(),
    username:"Kavi",
    comment:'badu that was Agky'
},
{
    id:uuid(),
    username:"Trump",
    comment:'eat to pizza'
}
];

// create get // comments
// it will list all comments on browser
app.get("/comments",(req,res)=> {
        res.render('comments/index',{comments})
})

app.get('/comments/new',(req,res)=> {
    res.render('comments/new');
})

app.post('/comments',(req,res)=> {
    const {username,comment} =req.body;
    comments.push({ username,comment,id:uuid()});
    res.redirect("/comments");
})
app.get('/comments/:id',(req,res)=> {
    const {id} =req.params;
    const comment= comments.find(c=> c.id===id);
    res.render('comments/show',{comment})
})

app.get('/comments/:id/edit',(req,res)=> {
    const {id} =req.params;
    const comment= comments.find(c=> c.id===id);
    res.render('comments/edit',{comment})
})
app.patch('/comments/:id',(req,res)=> {
    const {id} =req.params;
    const foundComment =comments.find(c=> c.id===id);
    // get new text from req.body
    const newCommentText =req.body.comment;
    foundComment.comment=newCommentText;
    res.redirect('/comments');

})
app.delete('/comments/:id', (req, res) => {
    const { id } = req.params;
    comments = comments.filter(c => c.id !== id);
    res.redirect('/comments');
})

app.listen(3000,()=> {
        console.log('Server start on 3000 port...');
})
