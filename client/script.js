const baseURL = `http://localhost:3000`

function getUserZodiac() {
  $.ajax({
    url: `http://localhost:3000/astros`,
    method: "GET",
    data: {
      month: "May",
      date: "20"
    }
  })
}

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