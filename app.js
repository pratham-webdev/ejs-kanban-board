const express = require('express');

const app = express();

app.set("view engine","ejs");

app.use(express.urlencoded({extended: true}));

app.use(express.static("public"));

const kanbanBoards = [];

const items = [];

app.get('/', (req,res) => {
    res.render('index', {boards:kanbanBoards});
});

app.post('/', (req,res) => {
    if(req.body.button === "list"){
        const listName = {
            id: kanbanBoards.length,
            name : req.body.list,
            listItems : []
        };
        kanbanBoards.push(listName);
    }
    else{
        const listItem = {
            detail : req.body.listItem,
            author : "Yuji",
            image : "img/yuji.png"
        }
        kanbanBoards.forEach((abc) => {
            let listID = Number(req.body.button);
            if( listID === abc.id){
                kanbanBoards[abc.id].listItems.push(listItem);
            }
        });
    }
    res.redirect('/');
});

app.listen(3000, () => {
    console.log("server on 3000");
});
