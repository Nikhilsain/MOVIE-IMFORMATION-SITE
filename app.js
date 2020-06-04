var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    request = require("request");
    var options = {
      method: 'GET',
      url: 'https://imdb-internet-movie-database-unofficial.p.rapidapi.com/film/tarzen',
      headers: {
        'x-rapidapi-host': 'imdb-internet-movie-database-unofficial.p.rapidapi.com',
        'x-rapidapi-key': 'c1b2f9e23bmsh0888f88251a5fccp1c2d02jsn67a68a5b20e3',
        useQueryString: true
      }
    };
    

app.use(express.static("public"));    
app.use(express.static(__dirname + "/views"));
app.use(express.static(__dirname + "/views/partials"))
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended: true}));




app.get("/", function(req,res){
    res.render("Movie");
});

app.get("/results",function(req,res)
{
  var movie = req.query.search;
  options.url = 'https://imdb-internet-movie-database-unofficial.p.rapidapi.com/film/' + movie;
  
  request(options, function (error, response, body) {
	if (error) throw new Error(error);
    var data = JSON.parse(body);
    //res.send(data);
   // console.log(data.poster.length)
    if(data.poster.length > 0){
    res.render("info", {data:data});
    }
    else
    {
      res.send("Sorry!!! Movie not Found");
    }
});
});

app.listen(3000,function(){
    console.log("this server strats");
});