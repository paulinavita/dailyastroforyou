const axios = require('axios')


class AstroController {
    static getVideos(req,res){
        let horoscope = req.query.horoscope
        let month = req.query.month
        axios
            .get(`https://www.googleapis.com/youtube/v3/search?part=id&q=horoscope ${month} ${horoscope}&type=video&channelId=UCKJ08TgPdcW4as_pfY4Dauw`)
            .then(({data})=>{
                res.status(200).json(data)
            })
            .catch(err =>{
                res.status(500).json(err)
            })
    }
}

module.exports = AstroController