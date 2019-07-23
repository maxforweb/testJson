var needle = require("needle");
var tress = require("tress");
var fs = require('fs');
var resolve = require("url").resolve;
var cheerio = require("cheerio");

var URL = "https://flutter.dev/ ";
var result = [];

var q = tress(function( url, callback ){
    needle.get( url, function( err, res ){
        if(err) throw(err);

        var $ = cheerio.load(res.body);

        // FLUTTER VERSION
        var versionText = $(".site-banner--default>a:first-child").text();
        var version = (text) => {
            text = text.substr(11,22);
            return text;
        }
        versionText = version(versionText);

        result.push({
            flutter_version: versionText
        });
        console.log(result);
        // FLUTTER VERSION
        //NAV BAR
            var nav = [];
            $("header .navbar-nav>li>a").each(function(){
                nav.push(
                    $(this).text()
                )
            });
           
            result.push({
                navBar: nav
            });
            //NAV BAR

            result.push({
                description: $('.homepage__intro .homepage__intro__statement').text().replace(/\s+/g,' ').trim()
            });


           // ADVANTAGES
            var advantages = [];
            $(".homepage__key-points .homepage__key-point").each(function(){
                advantages.push({
                    title: $('h3', this).text(),
                    description: $('p', this).text().replace(/\s+/g,' ').trim()
                })
            });
            
            var adv = (classes) => {
                $(classes).each(function(){
                    advantages.push({
                        title: $('h2', this).text(),
                        description: $('p', this).text().replace(/\s+/g,' ').trim()
                    })
                })
            }   

            var hot = '.homepage__hot-reload .col-lg-4';
            var ui = '.homepage__beautiful-uis .col-lg-4';
            var native = '.homepage__native-performance .col-lg-4';
            var learn = '.homepage__learn .col-lg-4';
            var use = '.homepage__use-cases .col-lg-5';

            adv(hot);
            adv(ui);
            adv(native);
            adv(learn);
            adv(use);

            result.push({
                advantages: advantages
            });
            // ADVANTAGES

            var img = [];
            $('img').each(function(){
                img.push(
                    $(this).attr("src")
                )
            })
            
            result.push({
                images: img
            })

            
        callback();
    });
});

q.drain = function(){
    fs.writeFileSync('./flutterData.json', JSON.stringify(result, null, 4));
}

q.push(URL);