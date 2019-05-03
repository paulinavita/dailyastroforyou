const baseURL = 'http://localhost:3000'

function signUp(){
  let userName = $('#userName').val()
  let email = $('#email').val()
  let password = $('#password').val()
  $.ajax({
    url:`${baseURL}/users/signup`,
    method : 'POST',
    data: {
      userName,
      email,
      password
    }
  })
  .done((data) => {
    localStorage.setItem('token', data.token)
    console.log("success register", data)
  })
  .fail((err) =>{
    console.log((err));
  })
}

function signIn(){
  let userName = $('#userName').val()
  $.ajax({
    url:`${baseURL}/users/signin`,
    method : 'POST',
    data: {
      userName
    }
  })
  .done((data) => {
    localStorage.setItem('token', data.token)
    console.log("success login", data)
  })
  .fail((err) =>{
    console.log((err));
  })
}

function onSignIn(googleUser) {
    const profile = googleUser.getBasicProfile();
    const id_token = googleUser.getAuthResponse().id_token
    $.ajax({
      url: `${baseURL}/users/signinGoogle`,
      type: 'POST',
      data:{
        id_token
      }
    })
    .done((result) => {
      localStorage.setItem('token', result.token)
      console.log(result, '++++++++++++++')
    })
    .fail((err) => {
      console.log(err)
    })
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      localStorage.removeItem('token')
      console.log('User signed out.');
    });
  }

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
    $('#zodiac-name').html(`${data.information.name}`)
    $('#description-result').html(`${data.dailyPrediction.prediction.personal_life}`);
 
     $( "#profession" ).click(function() {
     $('#description-result').html(`${data.dailyPrediction.prediction.profession}`)
    });

     $( "#travel" ).click(function() {
      $('#description-result').html(`${data.dailyPrediction.prediction.travel}`)
     });
     $( "#luck" ).click(function() {
      $('#description-result').html(`${data.dailyPrediction.prediction.luck}`)
     });
     $( "#emotions" ).click(function() {
      $('#description-result').html(`${data.dailyPrediction.prediction.emotions}`)
     });
     $( "#health" ).click(function() {
      $('#description-result').html(`${data.dailyPrediction.prediction.health}`)
     });
     
     let one = ''
     data.information.physical_traits.forEach((trait,idx) => {
       one += `${idx+1}. ${trait}\n`
     })
     $("#physical-traits").html(one)

     let two = ''
     data.information.mental_traits.forEach((trait,idx) => {
      two += `${idx+1}. ${trait}\n`
    })
     $("#mental-traits").html(two)

     let three = ''
     data.information.compatibility.forEach((zod,idx) => {
      three += `${idx+1}. ${zod}\n`
    })

     $("#compatibility").html(three)

     let four = ''
     data.information.how_to_spot.forEach((txt,idx) => {
      four += `${idx+1}. ${txt}\n`
    })
     $("#how-to-spot").html(four)

     let five = ''
     data.information.hates.forEach((txt,idx) => {
      five += `${idx+1}. ${txt}\n`
    })
     $("#hate").html(five)

     $('#kanan-atas-foto').html('')

    
    console.log(data)
  })
  .fail(err=>{
    console.log(err)
  })
}

function generateDailyTarot() {
  $.ajax({
    url:`${baseURL}/astros/tarot`,
    method : 'GET'
  })
  .done((data) => {
    $('#hehe').append(data.name)
    $('#hehe').append(data.meaning_up)
    $('#hehe').append(data.meaning_rev)

  })
  .fail((err) =>{
    console.log((err));
    
  })
}

$(document).ready(function () {


})

// $('#video').html(`
// <iframe width="560" height="315" src="https://www.youtube.com/embed/${response.items[0].id.videoId}?autoplay=1"></iframe>`   
// )