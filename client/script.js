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

$(document).ready(function () {


})

