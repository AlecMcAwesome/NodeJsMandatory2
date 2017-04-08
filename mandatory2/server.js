var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended": false}));

// create some players for testing
var jPlayerOne = {"nickname": "a", "choice": ""};
var jPlayerTwo = {"nickname": "b", "choice": ""};


app.get("/", function(req,res){
  res.sendFile(__dirname + "/index.html")
});

app.post("/final", function(req,res){
  var sName= req.body.txtName;
  console.log(sName);
  res.sendFile(__dirname + "/final.html");
});

app.post("/update/user", function(req,res){
  var sId = req.body.txtId;
  var sName = req.body.txtId;
  var sLastName = req.body.txtId;
});

app.get("/delete/user/:id", function(req,res){
  var sId = req.params.id;
});

app.get("/game", function(req,res){
  res.sendFile(__dirname + "/game.html");
});
// valg ad sten/saks/papir
app.get("/match/:nickname/:choice", function(req,res){
  var sNickname = req.params.nickname;
  var sChoice = req.params.choice;
  console.log(sNickname, sChoice);
  if (sNickname == "a") {
    jPlayerOne.choice = sChoice;
  }else{
    jPlayerTwo.choice = sChoice;
  }
  res.json({"Response":"ok", "code": "200"})
});

// TODO: clear cache when entering the game. id:3
// TODO: Make both players be able to get color chemes for background! +id 1 id:2

app.get("/result/:nickname", function(req,res){
  var sNickname = req.params.nickname;

  // waiting
  if (jPlayerOne.choice == "" || jPlayerTwo.choice == "") {
    res.json({"status":"wait"});
  }
  // even mistake
  if (jPlayerOne.choice == jPlayerTwo.choice) {
    res.json({"status":"even"});
  }

  if (jPlayerOne.choice == "rock" && jPlayerTwo.choice == "scissor") {
    res.json({
        "status":"winner",
        "nickname":jPlayerOne.nickname
      });
  }

  if (jPlayerOne.choice == "rock" && jPlayerTwo.choice == "paper") {
    res.json({
        "status": "winner",
        "nickname": jPlayerTwo.nickname
      });
  }

  if (jPlayerOne.choice == "paper" && jPlayerTwo.choice == "rock") {
    res.json({
      "status": "winner",
      "nickname": jPlayerOne.nickname
    });
  }

  if (jPlayerOne.choice == "paper" && jPlayerTwo.choice == "scissor") {
    res.json({
      "status":"winner",
      "nickname": jPlayerTwo.nickname
    });
  }

  if (jPlayerOne.choice == "scissor" && jPlayerTwo.choice == "paper") {
    res.json({
      "status":"winner",
      "nickname": jPlayerOne.nickname
    });
 }
  if (jPlayerOne.choice == "scissor" && jPlayerTwo.choice == "rock") {
      res.json({
        "status":"winner",
        "nickname": jPlayerTwo.nickname
      });
  }
});

app.listen(8080, function(err,req,res){
  if (err) {
    console.log("Error something went Wrong!");
  }
  console.log("server is up 8080!")
});
