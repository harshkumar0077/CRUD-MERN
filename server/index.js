const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
// const BASE_URL = process.env.BASE_URL
const path = require("path");
const app = express();

mongoose.connect(
  "mongodb+srv://harshkumar0077:Annuroy1@harshkumar7.piboaho.mongodb.net/?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);

const User = mongoose.model("Users", {
  name: String,
  email: String,
  gender: String,
});

app.use(bodyParser.json());
app.use(cors());
app.post("/users", async (req, res) => {
  const data = {
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
  };
  const user = new User(data);
  await user.save();
  res.send(user);
});

app.get("/users", async (req, res) => {
  const users = await User.find();
  res.send(users);
});

app.get("/users/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  res.send(user);
});

app.put("/users/:id", async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body);
  res.send("data has been update");
});

app.delete("/users/:id", async (req, res) => {
  const user = await User.findByIdAndRemove(req.params.id);
  res.send(user);
});

app.use(express.static(path.join(__dirname, "./frontend/build")));

app.get("*", function (_, res) {
  res.sendFile(
    path.join(__dirname, "./frontend/build/index.html"),
    function (err) {
      res.status(500).send(err);
    }
  );
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on `);
});
