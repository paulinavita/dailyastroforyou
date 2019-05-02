const axios = require('axios')
const userID = "604192";
const apiKey = "0234030b15fc00680409a51b80d40862";
const apidata = 'JSON Request Data';


class AstroController {

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