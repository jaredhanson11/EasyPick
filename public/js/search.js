/**
 * Created by Famien Koko on 11/20/2016.
 */
/**
 * Handles form submission for search page
 */

$(function(){
    $('#search-submit').click(function(){

        var tags = [];
        if ($('#hass-input').prop('checked', true)) {
            tags.push({name: 'hass'})

        }if ($('#cih-input').prop('checked', true)) {
            tags.push({name: 'cih'})

        }if ($('#cihw-input').prop('checked', true)) {
            tags.push({name: 'cihw'})
        }
        $.get('/courses',
            {
                course_numbers: $('#course-number-select').valueOf(),
                department: $('#department-select').valueOf(),
                units: $('#units-select').valueOf(),
                tags: tags
            },
            function(res){
                console.log(res);
            }
        )
    });
});