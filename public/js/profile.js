$(function() {
    populateNavbar();
    var populate_profile = function(){
        var userid = getUrlParameter('userid');
        console.log(userid);
        $.get('/users/' + userid, function(resp) {
            console.log(resp.msg);
            if (resp.success) {
                var html = Handlebars.templates['profile'](resp.msg);
                $('.profile').html(html);
            } else {
                alert(resp.msg);
                window.location.href = '/';
            }
        })
    };
    populate_profile();
});

