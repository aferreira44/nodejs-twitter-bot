var Twitter = require('twitter');
var config = require('./config.js');

var T = new Twitter(config);

// Set up your search parameters
var params = {
    q: '#curitiba',
    count: 1,
    result_type: 'recent',
    lang: 'en'
}

T.get('search/tweets', params, function (err, data, response) {
    if (!err) {
        // Loop through the returned tweets
        for (let i = 0; i < data.statuses.length; i++) {
            let screen_name = data.statuses[i].user.screen_name;

            T.post('friendships/create', {
                screen_name
            }, function (err, res) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(screen_name, ': **FOLLOWED**');
                }
            });
        }
    } else {
        console.log(err);
    }
})