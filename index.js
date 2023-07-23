import express from "express";
import bodyParser from "body-parser";
import ejs from "ejs"


const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

app.set('view engine', 'ejs');

const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

var todoList = [];

var workList = [];

app.get("/", function(req, res) {
    const d = new Date();
    let day = weekday[d.getDay()];
    let name = month[d.getMonth()];
    let date = d.getDate();

    //console.log(day + name + date);
    res.render("index.ejs", {
        weekName: day,
        monthName: name,
        dateToday: date,
        list: todoList.reverse(),
    });
});

app.get("/work", function(req, res) {
    res.render("work.ejs", {
        work: workList.reverse(),
    });
});

app.post('/' , (req , res)=>{

   const todoItem = req.body["todo-item"];
    todoList.push(todoItem);
        res.redirect("/");

});

app.post('/work' , (req , res)=>{

   const workItem = req.body["work-item"];
    workList.push(workItem);
   
   res.redirect("/work");

});






app.listen(port, function() {
    console.log(`Listening on port ${port}`);
});