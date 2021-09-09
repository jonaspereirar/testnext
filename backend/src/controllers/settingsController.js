function getSettings(req, res, next) { 
    res.json({
      email: 'jonasprodrigues@gmail.com'
    })
  }

module.exports = { getSettings }