

const express =require ("express");
const app=express();

app.use (express.static("."));
app.get("/", function(req, res){
    res.sendFile(__dirname + "/html/pagina.html");

});

app.get("/", function(req, res){
    res.sendFile(__dirname + "/css/style.css");

});

app.get("/", function(req, res){
    res.sendFile(__dirname + "/javascript/script.js");

});


app.listen(5000, () => {
    console.log("servidor funcionando en el puerto", 5000);
});
