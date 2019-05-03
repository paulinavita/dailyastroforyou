const baseURL = `http://localhost:3000`


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
         
         
         getVideo(data.dailyPrediction.sun_sign)
        console.log(data.information)
        inputPicture(data.information.famous_people[0], data.information.famous_people[1],data.information.famous_people[2])
         
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
function inputPicture(celeb0, celeb1, celeb2){
    $(".celebPic").empty()
    $(".celebPic").html(`
    <div class="row celebPicGrid">
            
    </div>`)
    getCelebsPictures(celeb0)
    getCelebsPictures(celeb1)
    getCelebsPictures(celeb2)
}

function getCelebsPictures(celeb){
    $.ajax({
        url : `${baseURL}/astros/celebPictures/${celeb}`,
        type : 'GET'
    })
    .done((data)=>{
        let pic = data.query.pages[0].thumbnail.source
        console.log(pic)
        $(".celebPicGrid").append(
            `<div class="col-sm">
                <div class="card" style="width: 10rem;">
                <img class="card-img-top" src=${pic} alt="Card image cap">
                <div class="card-body">
                    <p class="card-text" font-size=12>${celeb}</p>
                </div>
                </div>
            </div>`
        )
        // $('.celebPic').attr("src", pic)
    })
    .fail(err=>{
        console.log(err)
    })
}


$(document).ready(function () {
   

})

