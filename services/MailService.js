/**
 * Contains methods for sending emails.
 *
 * @author: larat
 */
var request = require('request');
var nodemailer = require('nodemailer');

var MailService = function() {
    var that = Object.create(MailService.prototype);
    var transporter = nodemailer.createTransport('smtps://walimu.easypick%40gmail.com:walimueasypick@smtp.gmail.com');

    that.sendConfirmationEmail = function(user, next) {
        // TODO: fix site_url for prod enviroment
        var site_url = "localhost:3000"
        var activation_link = site_url +'/activate?token=' + user.token;
        var mail_options = {
            from: '"EasyPick" <walimu.easypick@gmail.com>', // sender address
            to: user.kerberos + '@mit.edu', // list of receivers
            subject: "Account activation", // Subject line
            text: "Account activation", // plaintext body
            html: '<b>Welcome to EasyPick</b><br />'
                + 'To activate your account, please click the following link: '
                + '<a href="' + activation_link + '">' + activation_link + '</a>',
        };
        // send mail with defined transport object
        transporter.sendMail(mail_options, function(error, info){
            if(error)
                next({ success: false, error: error });
            else
                next({ success: true });
        });
    }

    Object.freeze(that);
    return that;
}

module.exports = MailService();
