const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const jwtExpress = require("express-jwt");

const reqAuth = jwtExpress({
  secret: function (req, payload, done) {
    const hash = payload.hash;
    req.hash = hash;
    return done(null, "secret" + hash);
  },
  algorithms: ["HS256"],
  getToken: (req) => {
    if (req.cookies) {
      const { jwt } = req.cookies;
      return jwt;
    }
    return null;
  },
});
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

const expiresIn = 60;

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

app.post("/", (req, res) => {
  const iat = Date.now();
  const id = 1;
  const hash = "ae0aa1ae-9b23-11eb-a8b3-0242ac130003";
  const secret = "secret" + hash;
  const cookieOptions = {
    expires: new Date(Date.now() + expiresIn * 1000),
    httpOnly: true,
  };
  const token = jwt.sign(
    {
      id,
      hash,
      iat,
      exp: Math.floor(iat / 1000) + expiresIn,
    },
    secret
  );
  res.cookie("jwt", token, cookieOptions);
  console.log("Sending Token");
  return res.status(200).json({ message: "Cookie has been send" });
});

app.get("/", reqAuth, (req, res) => {
  const cookieOptions = {
    expires: new Date(Date.now() + expiresIn * 1000),
    httpOnly: true,
  };
  const iat = Date.now();
  const id = 1;
  const hash = "ae0aa1ae-9b23-11eb-a8b3-0242ac130003";
  const secret = "secret" + hash;
  const token = jwt.sign(
    {
      id,
      hash,
      iat,
      exp: Math.floor(iat / 1000) + expiresIn,
    },
    secret
  );
  res.cookie("jwt", token, cookieOptions);
  console.log("Token has been refreshed");
  return res.status(200).json({ message: "Cookie refreshed" });
});

app.use(function (err, req, res, next) {
  console.log("Error handler");
  console.log(err);
  return res
    .status(401)
    .json({ error: { name: err.name, message: err.message } });
});

app.listen(5000);
