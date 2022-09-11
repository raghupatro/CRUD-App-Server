const express = require("express");
const app = express();
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
  host: "localhost",
  database: process.env.DB_NAME,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
});

app.get("/api/get", (req, res) => {
  const sqlGet = "SELECT * FROM movie_reviews";
  db.query(sqlGet, (err, result) => {
    if (err) console.log(err);
    res.send(result);
  });
});

app.post("/api/insert", (req, res) => {
  const movieName = req.body.movieName;
  const movieReview = req.body.movieReview;
  const sqlInsert =
    "INSERT INTO movie_reviews(movieName, movieReview) VALUES (?, ?)";
  db.query(sqlInsert, [movieName, movieReview], (err, result) => {
    // console.log(result);
  });
});

app.put("/api/update", (req, res) => {
  const id = req.body.id;
  const movieReview = req.body.movieReview;
  db.query(
    "UPDATE movie_reviews SET movieReview = ? WHERE id = ?",
    [movieReview, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/api/delete/:id", (req, res) => {
  const id = req.params.id;
  // console.log(req);
  db.query("DELETE FROM movie_reviews WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(5000, () => {
  console.log("server started at port 5000");
});
