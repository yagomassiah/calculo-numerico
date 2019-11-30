const express = require("express");
const app = express();


app.use(express.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

function derivada(y){
    return (2*y -1);
}
app.post("/euler/", async (req, res) => {
    let ret = "oi"
    let x0 = 0.1;
    let ret = {
        valor: req.body.h
    }
    res.send(ret);
  });



  app.listen(3000, () => console.log("listening on port 3000"));