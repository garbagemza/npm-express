
module.exports = function health(app) {
    app.get('/health', (req, res) => {
        res.status(200)
        res.send("OK")
    })    
}