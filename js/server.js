var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');

function getData1() {
    var url = "http://www.wunderground.com/cgi-bin/findweather/getForecast?&query=" + 02888;

    request(url, function (error, response, body) {
        if (!error) {
            var $ = cheerio.load(body),
                temperature = $("[data-variable='temperature'] .wx-value").html();

            console.log("It’s " + temperature + " degrees Fahrenheit.");
        } else {
            console.log("We’ve encountered an error: " + error);
        }
    });
}
function getDouData() {
    var url = "http://jobs.dou.ua/vacancies/?category=Front%20End";

    request(url, function (error, response, body) {
        if (!error) {
            var $ = cheerio.load(body),
                vacancy = $(".vt");

            console.log("It’s vacancy" + vacancy);
        } else {
            console.log("We’ve encountered an error: " + error);
        }
    });
}
function getJoobleData() {
    var url = "http://ua.jooble.org/%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%B0/%D0%9A%D0%B8%D0%B5%D0%B2?p=1";

    request(url, function (error, response, body) {
        if (!error) {
            var $ = cheerio.load(body),
                vacancies = $(".vacancy-item h2");
            vacancies.each(function (i, vacancy) {
                    // get the href attribute of each link
                    console.log($(vacancy).text());
                });
                //console.log("It’s vacancies" + vacancies);
            }
        else {
                console.log("We’ve encountered an error: " + error);
            }
        });
    }

    function getData2() {
        url = 'http://www.imdb.com/title/tt1229340/';

        request(url, function (error, response, html) {
            if (!error) {
                var $ = cheerio.load(html);

                var title, release, rating;
                var json = {title: "", release: "", rating: ""};

                $('.header').filter(function () {
                    var data = $(this);
                    title = data.children().first().text();
                    release = data.children().last().children().text();

                    json.title = title;
                    json.release = release;
                })

                $('.star-box-giga-star').filter(function () {
                    var data = $(this);
                    rating = data.text();

                    json.rating = rating;
                })
            }

            fs.writeFile('output.json', JSON.stringify(json, null, 4), function (err) {
                console.log('File successfully written! - Check your project directory for the output.json file');
            });
        });
    }

    console.log('we started');
    getJoobleData();
