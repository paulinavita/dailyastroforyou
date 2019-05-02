const baseURL = `http://localhost:4000`

function getDailyHoroscope() {
    let zodiac = $('#zodiac-field').val() 
    $.ajax({
        url : `${baseURL}/astros/daily/${zodiac}`,
        type : 'POST'
    })
    .done((data) => {
        console.log(data);
        
    })
    .fail((error) => {
        console.log(err)
    })
}

$(document).ready(function () {

})