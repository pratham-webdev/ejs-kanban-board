const express = require('express');

const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/trello", {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});

const app = express();

app.set("view engine","ejs");

app.use(express.urlencoded({extended: true}));

app.use(express.static(__dirname+"/public/"));

const kanbanBoards = [];

const items = [];

const listItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

const ListSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    listItems : [listItemSchema]
});

const Kanban = mongoose.model('Kanban', ListSchema);
const ListItem = mongoose.model('List',listItemSchema);

app.get('/', (req,res) => {
    Kanban.find({}, (err, lists) => {
    res.render('index', {boards:lists});
    })
});

app.post('/add-list', (req,res) => {

    const newListName = req.body.listName;
    const newList = new Kanban({name:newListName});
    newList.save();
    res.redirect("/")
});

app.post('/add-list-item/:listID', (req,res) => {

    const newListItem = new ListItem({
        name: req.body.listItemName 
    });
    const listID = req.params.listID;
    Kanban.findOne({ _id : listID }, (err, foundList) => {
        foundList.listItems.push(newListItem);
        foundList.save();
        res.redirect("/");
    });
});

app.post('/delete-list/:id', (req,res) => {
    Kanban.deleteOne({_id:req.params.id}, (err) => {
        if(err){
            console.log(err);
        }
    });
    res.redirect('/');
});

app.post('/delete-list-item/:listid/:itemid', (req,res) => {

    Kanban.findOneAndUpdate({ _id:req.params.listid}, {$pull : {listItems: {_id:req.params.itemid}}}, (err) => {
        if(err){
            console.log(err);
        }
    });
    res.redirect("/");
});

app.listen(3000, () => {
    console.log("server on 3000");
});
