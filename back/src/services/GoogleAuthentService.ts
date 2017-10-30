var request = require('request');

export class GoogleAuthentService{

    static Authent(id_token){

        // Configure the request
        var options = {
            url: 'https://www.googleapis.com/oauth2/v3/tokeninfo?id_token='+id_token,
            method: 'get'
        }

        // Start the request
        request(options, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body)
                return true;
            }
            else{
                console.log("une errreur");
                return false;
            }
        })
    }
}