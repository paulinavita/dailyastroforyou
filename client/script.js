const baseURL = `http://localhost:3000`

function getUserZodiac() {
  let birthDate = $('#birthDate').val().split("-")
  
  $.ajax({
    url: `${baseURL}/astros`,
    method: "POST",
    data: {
      birthDate
    }
  })
  .done(data=>{
    console.log(data)
  })
  .fail(err=>{
    console.log(err)
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
  $()
})