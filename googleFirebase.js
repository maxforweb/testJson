var needle = require("needle");
var tress = require("tress");
var fs = require('fs');
var resolve = require("url").resolve;
var cheerio = require("cheerio");

var URL = "https://firebase.google.com/products/#develop-products ";
var result = [];

var q = tress(function(url, callback){
    needle.get(url,function(err, res){
        if(err) throw(err);

        var $ = cheerio.load(res.body);

        //TITLES
        var titles = [];

        $("h2").each(function(){
            titles.push(
                $(this).text()
            )
        })
        
        result.push({
            titles: titles
        })
        console.log(result);
        
        result.push({
            h1: $("h1").text()
        })
        
        //H5
        var h5 = [];
        $("h5").each(function(){
            h5.push(
                $(this).text()
            )
        })
        result.push({
            h5: h5
        })

        //LINKS
        var a =[];
        $("a").each(function(){
            a.push(
                $(this).attr('href')
            )
        })
    
        result.push({
            links: a
        })

        //P

        var p = [];
        $("p").each(function(){
            p.push(
                $(this).text()
            )
        })
        result.push({
            p: p
        })

        //IMG
        var images = [];
        $("img").each(function(){
            images.push(
                $(this).attr("src")
            )
        })
        result.push({
            images: images
        })

        callback();
    })
})

q.drain = function(){
    fs.writeFileSync('./googleFirebaseData.json', JSON.stringify(result, null, 4));
}
q.push(URL);