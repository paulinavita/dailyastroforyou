const axios = require('axios')

// ax.defaults.headers.common['Authorization'] = `token ${process.env.GITHUB_TOKEN}`

class AstroController{
  static getUserHoro(req,res){
    axios
    .get(`https://zodiacal.herokuapp.com/api`)
    .then(({data})=>{
      for(let zodiac of data){
        zodiac.sun_dates = zodiac.sun_dates.map(a=>a.split(" "))
        if(req.body.month == zodiac.sun_dates[0][0]){
          if(Number(req.body.date) >= Number(zodiac.sun_dates[0][1])){
            data = {...zodiac}
            break
          }
        }
        else if(req.body.month == zodiac.sun_dates[1][0]){
          if(Number(req.body.date) <= Number(zodiac.sun_dates[1][1])){
            data = {...zodiac}
            break
          }
        }
      }
      res.status(200).json(data)
    })
    .catch(err=>{
      console.log(err)
      res.status(500).json(err)
    })
  }
  static getRepos(req,res){
    axios
    .get('/user')
    .then(({data})=>{
      res.status(200).json(data)
    })
    .catch(err=>{
      res.status(500).json(err)
    })
  }
  static getUserRepos(req,res){
    axios
    .get(`/user/${req.params.owner}/repos`)
    .then(({data})=>{
      res.status(200).json(data)
    })
    .catch(err=>{
      res.status(500).json(err)
    })
  }
  static showRepos(req,res){
    axios
    .get('/user/repos')
    .then(({data})=>{
      res.status(201).json(data)
    })
    .catch(err=>{
      res.status(500).json(err)
    })
  }
  static searchRepos(req,res){
    console.log(req.query.q)
    axios
    .get(`/search/repositories?q=${req.query.q}`)
    .then(({data})=>{
      res.status(201).json(data)
    })
    .catch(err=>{
      res.status(500).json(err)
    })
  }
  static createRepo(req,res){
    axios
    .post('/user/repos',{
      name: req.body.name,
      description: req.body.description,
    })
    .then(({data})=>{
      res.status(201).json(data)
    })
    .catch(err=>{
      res.status(500).json(err)
    })
  }
  static deleteRepo(req,res){
    axios
    .delete(`/repos/${req.params.owner}/${req.params.repo}`)
    .then(({data})=>{
      res.status(200).json(data)
    })
    .catch(err=>{
      res.status(500).json(err)
    })
  }
  static unstarStarredRepo(req,res){
    axios
    .delete(`/user/starred/${req.params.owner}/${req.params.repo}`)
    .then(({data})=>{
      res.status(200).json(data)
    })
    .catch(err=>{
      res.status(500).json(err)
    })
  }
  static listStarredRepo(req,res){
    axios
    .get(`/user/starred`)
    .then(({data})=>{
      res.status(200).json(data)
    })
    .catch(err=>{
      res.status(500).json(err)
    })
  }
}

module.exports = AstroController