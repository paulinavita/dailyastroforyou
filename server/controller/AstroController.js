const axios = require('axios')


class AstroController {
    static getVideos(req,res){
        let horoscope = req.query.horoscope
        axios
            .get(`https://www.googleapis.com/youtube/v3/search?part=id&q=horoscope May ${horoscope}&type=video`)
            .then(({data})=>{
                res.status(200).json(data)
            })
            .catch(err =>{
                res.status(500).json(err)
            })
    }
}

module.exports = AstroController