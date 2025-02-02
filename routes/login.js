const express = require("express");
const { AuthenticateUser } = require("../controllers/login");
const client = require("../redis");
var router = express.Router();

client
  .connect()
  .then(() => {
    console.log("connected to redis");
  })
  .catch((e) => {
    console.log(e);
  });

router.post("/", async (req, res) => {
    try{
  const { email, password } = await req.body;
  var loginCredentials = await AuthenticateUser(email, password);
  console.log(loginCredentials);
  if (loginCredentials === "Invalid Username or Password") {
    res.status(200).send("Invalid Username or Password");
  } else if (loginCredentials === "Server Busy") {
    res.status(200).send("Server Busy");
  } else {
    res.status(200).json({token:loginCredentials.token});
  }
}catch(e){
    console.log(e);
    res.status(500).send("Server Busy");
}
});
//hi
module.exports = router;
