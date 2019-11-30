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

function derivada(y) {
  return 2 * y - 1;
}
function equacao(x) {
  let e = Math.exp(2 * x);
  return 0.5 * (e + 1);
}

function passoRungeKutta(y, h) {
  let k1 = derivada(y);
  let k2 = derivada(y + 0.5 * h * k1);
  let k3 = derivada(y + 0.5 * h * k2);
  let k4 = derivada(y + h * k3);

  return y + (h / 6) * (k1 + 2 * k2 + 2 * k3 + k4);
}

app.post("/euler/", async (req, res) => {
  // let ret = "oi"
  let h = req.body.h;
  let x = [];
  let y = [];
  let yn = 1;
  let xn = 0;
  let yReal = [];
  let xReal = [];

  y.push(yn);
  x.push(xn);
  while (xn < 1) {
    yn = yn + h * derivada(yn);
    xn += h;
    y.push(yn);
    x.push(xn);
  }
  yn = 1;
  xn = 0;
  while (xn < 1) {
    yReal.push(equacao(xn));
    xReal.push(xn);
    xn += 0.001;
  }
  let ret = {
    y: y,
    x: x,
    yReal: yReal,
    xReal: xReal
  };
  res.send(ret);
});

app.post("/runge-kutta/", async (req, res) => {
  // let ret = "oi"
  let h = req.body.h;
  let x = [];
  let y = [];
  let yn = 1;
  let xn = 0;
  let yReal = [];
  let xReal = [];
  y.push(yn);
  x.push(xn);

  while (xn < 1) {
    yn = passoRungeKutta(yn, h);
    xn += h;
    y.push(yn);
    x.push(xn);
  }
  yn = 1;
  xn = 0;
  while (xn < 1) {
    yReal.push(equacao(xn));
    xReal.push(xn);
    xn += 0.001;
  }
  let ret = {
    y: y,
    x: x,
    yReal: yReal,
    xReal: xReal
  };
  res.send(ret);
});

app.post("/ambos/", async (req, res) => {
  // let ret = "oi"
  let h = req.body.h;
  let x = [];
  let y = [];
  let yn = 1;
  let xn = 0;
  let yReal = [];
  let xReal = [];
  y.push(yn);
  x.push(xn);

  while (xn < 1) {
    yn = passoRungeKutta(yn, h);
    xn += h;
    y.push(yn);
    x.push(xn);
  }
  yn = 1;
  xn = 0;
  while (xn < 1) {
    yReal.push(equacao(xn));
    xReal.push(xn);
    xn += 0.001;
  }

  h = req.body.h;
  xEuler = [];
  yEuler = [];
  yn = 1;
  xn = 0;

  yEuler.push(yn);
  xEuler.push(xn);
  while (xn < 1) {
    yn = yn + h * derivada(yn);
    xn += h;
    yEuler.push(yn);
    xEuler.push(xn);
  }

  let ret = {
    y: y,
    x: x,
    yReal: yReal,
    xReal: xReal,
    xEuler: xEuler,
    yEuler: yEuler
  };
  res.send(ret);
});

app.listen(3000, () => console.log("listening on port 3000"));
