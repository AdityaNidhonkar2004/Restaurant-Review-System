const path = require("path");
const express = require("express");
const fs = require("fs");
const app = express();

//
app.use(express.static("public"));

//
app.use(express.urlencoded({ extended: false }));

//
app.set("views", path.join(__dirname, "views"));
//
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  //Used when we don't use EJS
  // const htmlFilePath = path.join(__dirname, "views", "index.html");
  // res.sendFile(htmlFilePath);

  //As we use Template Engine(EJS) we just use res.render("file_name")
  res.render("index");
});

app.get("/restaurants", (req, res) => {
  // const htmlFilePath = path.join(__dirname, "views", "restaurants.html");
  // res.sendFile(htmlFilePath);

  //As we use Template Engine(EJS) we just use res.render("file_name")
  const filePath = path.join(__dirname, "data", "restaurants.json");
  const fileData = fs.readFileSync(filePath);
  const storedRestaurants = JSON.parse(fileData);
  res.render("restaurants", {
    numberOfRestaurants: storedRestaurants.length,
    restaurants: storedRestaurants,
  });
});

app.get("/recommend", (req, res) => {
  // const htmlFilePath = path.join(__dirname, "views", "recommend.html");
  // res.sendFile(htmlFilePath);

  //As we use Template Engine(EJS) we just use res.render("file_name")
  res.render("recommend");
});

app.post("/recommend", (req, res) => {
  const restaurant = req.body;
  const filePath = path.join(__dirname, "data", "restaurants.json");
  const fileData = fs.readFileSync(filePath);
  const storedRestaurants = JSON.parse(fileData);
  storedRestaurants.push(restaurant);

  fs.writeFileSync(filePath, JSON.stringify(storedRestaurants));
  //after wrting form and submiting the user will redirect to confirm page and will not get alert to submit same response again
  res.redirect("/confirm");
});

app.get("/about", (req, res) => {
  // const htmlFilePath = path.join(__dirname, "views", "about.html");
  // res.sendFile(htmlFilePath);

  //As we use Template Engine(EJS) we just use res.render("file_name")
  res.render("about");
});

app.get("/confirm", (req, res) => {
  // const htmlFilePath = path.join(__dirname, "views", "confirm.html");
  // res.sendFile(htmlFilePath);

  //As we use Template Engine(EJS) we just use res.render("file_name")
  res.render("confirm");
});

app.listen(3000);
