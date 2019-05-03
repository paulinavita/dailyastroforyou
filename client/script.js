var baseURL = `http://localhost:3000`

function getUserZodiac() {
  let birthDate = $('#birthDate').val().split("-")
  let birth = new Date(birthDate) 
  let timeBirth = birth.getTime()
  let today = new Date()
  let timeToday = today.getTime()
  if( timeBirth > timeToday){
    Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'invalid birthdate!'
      })  
}else{
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
           one += `${idx+1}. ${trait}<br>`
         })
         $("#physical-traits").html(one)
    
         let two = ''
         data.information.mental_traits.forEach((trait,idx) => {
          two += `${idx+1}. ${trait}<br>`
        })
         $("#mental-traits").html(two)
    
         let three = ''
         data.information.compatibility.forEach((zod,idx) => {
          three += `${idx+1}. ${zod}<br>`
        })
    
         $("#compatibility").html(three)
    
         let four = ''
         data.information.how_to_spot.forEach((txt,idx) => {
          four += `${idx+1}. ${txt}<br>`
        })
         $("#how-to-spot").html(four)
    
         let five = ''
         data.information.hates.forEach((txt,idx) => {
          five += `${idx+1}. ${txt}<br>`
        })
         $("#hate").html(five)
    
         $('#kanan-atas-foto').html('')
         
         
        //  console.log(data.dailyPrediction.sun_sign, 'ini DATA')
         getVideo(data.dailyPrediction.sun_sign)
      })
      .fail(err=>{
        console.log(err)
      })
  }
  
}

function generateDailyTarot() {
  $.ajax({
    url:`${baseURL}/astros/tarot`,
    method : 'GET'
  })
  .done((data) => {
    console.log(data)

    $('#gambarnya').attr("src", data.objWiki.picture.source);
    $('#nama-kartu').html(`${data.card.name}`)
    $('#deskripsi-kartu-up').html(`What can be good for today : ${data.card.meaning_up}`)
    $('#deskripsi-kartu-rev').html(`What can be wrong for today :${data.card.meaning_rev}`)

  })
  .fail((err) =>{
    console.log((err));
  })
}
function getVideo(zodiac){
    let date = new Date
    let monthInteger = date.getMonth()
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    let month = months[monthInteger]

    $.ajax({
        url : `${baseURL}/astros/${month}/${zodiac}/videos`,
        type : 'GET'
    })
    .done((data)=>{
        // console.log(data)
        $('#video').html(`
            <iframe width="560" height="315" src="https://www.youtube.com/embed/${data.videoId}?autoplay=1"></iframe>`   
        )
    })
    .fail(err =>{
        console.log(err)
    })
}


function signUp(){
  let userName = $('#usernameregister').val()
  let email = $('#emailregister').val()
  let password = $('#passwordregister').val()
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
    localStorage.removeItem('regis')
    console.log("success register", data)
    $("#hasil").show()
    $("#register-form").hide()
    $("#login-form").hide()
  })
  .fail((err) =>{
    console.log((err));
  })
}

function signIn(){
  let email = $('#emaillogin').val()
  let password = $('#passwordlogin').val()
  $.ajax({
    url:`${baseURL}/users/signin`,
    method : 'POST',
    data: {
      email,
      password
    }
  })
  .done((data) => {
    localStorage.setItem('token', data.token)
    localStorage.removeItem('login')
    $("#hasil").show()
    $("#register-form").hide()
    $("#login-form").hide()
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
      localStorage.removeItem('login')
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

  function logout(){
    localStorage.removeItem('regis')
    localStorage.setItem('login', null)
    $("#hasil").hide()
    $("#register-form").hide()
    $("#login-form").show()
  }

  function login(){
    if(localStorage.hasOwnProperty('token')){
      $("#hasil").show()
      $("#register-form").hide()
      $("#login-form").hide()
    } else if (localStorage.hasOwnProperty('regis')){
      regis()
    }else{
      logout()
    }
  }
  function loginGoogle(){
    $("#hasil").show()
    $("#register-form").hide()
    $("#login-form").hide()
  }
  function regis(){
    localStorage.setItem('regis', null)
    localStorage.removeItem('login')
    $("#hasil").hide()
    $("#login-form").hide()
    $("#register-form").show()
  }

$(document).ready(function () {
  if (localStorage.hasOwnProperty('token')){
    $("#hasil").show()
    $("#register-form").hide()
    $("#login-form").hide()
  }else if (localStorage.hasOwnProperty('regis')){
    $("#hasil").hide()
    $("#register-form").show()
    $("#login-form").hide()
  }
  else{
    localStorage.setItem('login', null)
    $("#hasil").hide()
    $("#register-form").hide()
    $("#login-form").show()
  }
})

