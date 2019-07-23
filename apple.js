var needle = require("needle");
var tress = require("tress");
var fs = require('fs');
var resolve = require("url").resolve;
var cheerio = require("cheerio");

var URL = "https://www.apple.com/ ";
var result = [];

var q = tress(function(url, callback){
    needle.get(url,function(err, res){
        if(err) throw(err);

        var $ = cheerio.load(res.body);

        var links = [];
        $("a").each(function(){
            links.push(
                $(this).attr("href")
            )
        })
        result.push({
            hyperlinks: links
        })
        console.log(result);
        //h2
        var h2 = [];
        $("h2").each(function(){
            h2.push(
                $(this).text()
            )
        })
        result.push({
            h2: h2
        })
        //h3
        var h3 = [];
        $("h3").each(function(){
            h3.push(
                $(this).text()
            )
        })
        result.push({
            h3: h3
        })
        // li
        var li = [];
        $("li").each(function(){
            li.push(
                $(this).text().replace(/\s+/g,' ').trim()
            )
        })
        result.push({
            li: li
        })

        callback();
    })
})



q.drain = function(){
    fs.writeFileSync('./appleData.json', JSON.stringify(result, null, 4));
}
q.push(URL);