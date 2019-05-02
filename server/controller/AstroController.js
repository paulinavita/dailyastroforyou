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
      for(let zodiac of data){
        zodiac.sun_dates = zodiac.sun_dates.map(a=>a.split(" "))
        if(req.body.month == zodiac.sun_dates[0][0]){
          if(Number(req.body.date) >= Number(zodiac.sun_dates[0][1])){
            foundData = {...zodiac}
            break
          }
        }
        else if(req.body.month == zodiac.sun_dates[1][0]){
          if(Number(req.body.date) <= Number(zodiac.sun_dates[1][1])){
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
          res.status(200).json({data, hehe : foundData})
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
}

module.exports = AstroController