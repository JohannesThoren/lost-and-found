module.exports = (app) => {
    app.post("/user/new", (req, res) => {
      res.send(req)

    })
}