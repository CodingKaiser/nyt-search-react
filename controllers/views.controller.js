// Create all our routes and set up logic within those routes where required.
module.exports.home = (req, res) => {
  res.sendFile(__dirname + "../public/index.html")
}
