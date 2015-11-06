var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var sources = {
    'rabota.ua': function () {
    },
    'work.ua': function () {
    },
    'rabotaplus.ua': function () {
    },
    'HeadHunter.ua': function () {
    }
}

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
    var vacancies = [];

    function processLocalPage() {
        //var $ = cheerio.load(body);
        var $ = cheerio.load(fs.readFileSync('/home/jsdev/skills-planner/cache/jooblep1.html'));
        var $vacancies = $(".vacancy-item");
        var results = $vacancies.length;
        //console.log(page, results);

        //$('.vacancy-item h2').each(function (i, $title) {
        //    var title = $($title).text();
        //    console.log(title);
        //    //vacancies.push(title);
        //    //fs.writeFile('output.csv', title + "\n", function (err) { });
        //});
        //$('.vacancy-item .date-and-source').each(function (i, source) {
        //    console.log($(source).children().first().text());
        //});
        $('.vacancy-item').each(function (i, vacancy) {
            console.log($(vacancy).find('h2').text());
            console.log($(vacancy).find('.company span').text());
            console.log($(vacancy).find('.date-and-source').children().first().text());
            console.log($(vacancy).find('a').attr('href'));
        });

        //if (results > 0 && page<3) processPage(page + 1);  //task to scan next page, remove &&page<3 to scan all pages

    }

    function processPage(page) {
        page = page || 1;
        //var url = "http://ua.jooble.org/%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%B0/%D0%9A%D0%B8%D0%B5%D0%B2?p=" + page;
        var url = "http://ua.jooble.org/%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%B0-junior/%D0%9A%D0%B8%D0%B5%D0%B2?p=" + page;
        //var url='file:///home/jsdev/skills-planner/cache/jooblep1.html';

        request(url, function (error, response, body) {
            if (!error) {
                //var $ = cheerio.load(body);
                var $ = cheerio.load(fs.readFileSync('/home/jsdev/skills-planner/cache/jooblep1.html'));
                var $vacancies = $(".vacancy-item");
                var results = $vacancies.length;
                //console.log(page, results);

                $('.vacancy-item h2').each(function (i, vacancy) {
                    var title = $(vacancy).text();
                    console.log(title);
                    //vacancies.push(title);
                    //fs.writeFile('output.csv', title + "\n", function (err) { });
                });
                $('.vacancy-item .date-and-source span').each(function (i, source) {
                    console.log($(source).first().text());
                });

                //if (results > 0 && page<3) processPage(page + 1);  //task to scan next page, remove &&page<3 to scan all pages


            }
            else {
                console.log("We’ve encountered an error: " + error);
            }
        });
    }

    processLocalPage();
}

function getWorkdotUaVacancyDescription(url) {
    request(url, function (error, response, body) {
        if (!error) {
            //var $ = cheerio.load(body),
            vacancy = cheerio.load(body)(".card .overflow").text();
            console.log(vacancy);
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

        //fs.writeFile('output.json', JSON.stringify(json, null, 4), function (err) {
        //    console.log('File successfully written! - Check your project directory for the output.json file');
        //});
    });
}

function goRedirectUrl(url) {
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            newUrl = (cheerio.load(body)("#aGo")['0'].attribs.href);
            console.log('new url ' + newUrl);
        }
    });
}

console.log('job scrapper started');
getJoobleData();

//var url='http://ua.jooble.org'+'/away/-2710524878638791941?hqid=543139155&p=1&pos=1&ckey=junior&age=111&relb=12525';
//var url='http://rabota.ua/company1385326/vacancy5567727?utm_source=jooble&utm_medium=cpc&utm_campaign=jooble_employer_it';
//var url='http://www.work.ua/jobs/1956588/?utm_source=jooble&utm_medium=cpc&utm_campaign=developer&utm_content=1956588';
//var url='http://ua.jooble.org/away/-2710524878638791941?hqid=543139155&p=1&pos=1&ckey=junior&age=111&relb=12525';
//goRedirectUrl(url);