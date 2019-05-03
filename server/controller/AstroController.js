const axios = require('axios')
  
const userID = "604192";
const apiKey = "0234030b15fc00680409a51b80d40862";
const apidata = 'JSON Request Data';

class AstroController{
  static getUserHoro(req,res){
    let foundData = null;
    axios
    .get(`https://zodiacal.herokuapp.com/api`)
    .then(({data})=>{
      let month
      let date = req.body.birthDate[2]
      switch(Number(req.body.birthDate[1])){
        case 1: month = "January";
            break;
        case 2: month = "February";
            break;
        case 3: month = "March";
            break;
        case 4: month = "April";
            break;
        case 5: month = "May";
            break;
        case 6: month = "June"; 
            break;
        case 7: month = "July";
            break;
        case 8: month = "August";
            break;
        case 9: month = "September";
            break;
        case 10: month = "October";
            break;
        case 11: month = "November";
            break;
        case 12: month = "December";
            break;
        }
      for(let zodiac of data){
        zodiac.sun_dates = zodiac.sun_dates.map(a=>a.split(" "))
        if(month == zodiac.sun_dates[0][0]){
          if(Number(date) >= Number(zodiac.sun_dates[0][1])){
            foundData = {...zodiac}
            break
          }
        }
        else if(month == zodiac.sun_dates[1][0]){
          if(Number(date) <= Number(zodiac.sun_dates[1][1])){
            foundData = {...zodiac}
            break
          }
        }
      }      
    let api = `sun_sign_prediction/daily/${foundData.name.toLowerCase()}`
      return Promise.all([
        axios.post(`https://json.astrologyapi.com/v1/` + api, {
            data: JSON.stringify(apidata)}, {
            headers: {
                "authorization": "Basic " + new Buffer(userID + ":" + apiKey).toString('base64'),
                "Content-Type": 'application/json'
            }
        })
    ])
  })
    .then(([details]) => {
      let {data} = details
       console.log(data, 'DAPET APA DI BAGIAN KEDUA');
          res.status(200).json({dailyPrediction : data, information : foundData})
    })
    .catch(err=>{
      console.log(err)
      res.status(500).json(err)
    })
  }

    static getDailyReading(req, res) {
        let api = `sun_sign_prediction/daily/${req.params.sign}`
        axios.post(`https://json.astrologyapi.com/v1/` + api, 
        {
            data: JSON.stringify(apidata)}, {
            headers: {
                "authorization": "Basic " + new Buffer(userID + ":" + apiKey).toString('base64'),
                "Content-Type": 'application/json'
            }
        })
        .then(({ data }) => {
            res.status(200).json(data)
        })
        .catch((err) => {
            res.status(500).json(err)
        })
      }

    static getVideos(req,res){
        console.log('tes')
        let sign = req.params.sign
        let month = req.params.month
        axios
            .get(`https://www.googleapis.com/youtube/v3/search?part=id&q=horoscope ${month} ${sign}&type=video&channelId=UCKJ08TgPdcW4as_pfY4Dauw&key=AIzaSyDAYSVY55IT5ZUxZbXs6mcCPA4yIvgZqcg`)
            .then(({data})=>{
                res.status(200).json(data.items[0].id)
            })
            .catch(err =>{
                res.status(500).json(err)
            })
    }
  

  static async getTarot(req, res) {
    try {
      let randomIdx = Math.floor( Math.random() * ( 0 + 77 - 0 ) ) + 0
      let halo = randomIdx
      let {data} = await axios.get(`https://rws-cards-api.herokuapp.com/api/v1/cards/`)
      let wikiData = await axios.get(`https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=1&srsearch=${data.cards[halo].name}`)
      let wikiPic = await axios.get(`https://en.wikipedia.org/w/api.php?action=query&titles=${wikiData.data.query.search[0].title}&prop=pageimages&format=json&pithumbsize=100`)
      console.log(wikiPic.data.query, '?????');
      
      
      // let objWiki = {
      //   detailArticle : wikiData.data.query.search[0],
      //   url: encodeURI(`https://en.wikipedia.org/wiki/${detailArticle.title}`)
      //  }
      // res.status(200).json({card : data.cards[halo], objWiki}) 
    } catch (error) {
      console.log(error);
      
      res.status(500).json(error)
    }

  }
}

module.exports = AstroController