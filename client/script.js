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

$(document).ready(()=>{
  getUserZodiac()
})