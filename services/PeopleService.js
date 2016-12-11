/**
 * Contains methods for hitting the external People API
 * https://developer.mit.edu/apis-people
 *
 * @author: larat
 */
var request = require('request');

var PeopleService = function() {
    var that = Object.create(PeopleService.prototype);
    var client_id = '324ab1e57f0d4abd968ed4f04b631513';
    var client_secret = 'ae0369964f584b8cBE5CCDB57B62D487';

    that.person = function(kerberos, callback) {
        var options = {
            url: 'https://mit-public.cloudhub.io/people/v3/people/' + kerberos,
            headers: {
                'Accept': 'application/json',
                'client_id': client_id,
                'client_secret': client_secret
            }
        };


        request(options, function (error, response, body) {
          if (!error && response.statusCode == 200) {
            callback({ person: JSON.parse(body).item });
          } else {
            callback({}, { message: "Could not validate kerberos." });
          }
        });
    }

    Object.freeze(that);
    return that;
}

module.exports = PeopleService();
