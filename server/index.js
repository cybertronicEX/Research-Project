const express = require("express");
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const UserModel = require('./models/users');
mongoose.connect("mongodb+srv://user123:password123tech@cluster0.o3pj0ue.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
// Middleware to parse JSON request bodies
app.use(express.json());
app.use(cors());

app.get("/getUsersList", (req, res) => {
    UserModel.find({})
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            res.json(err);
        });
});

app.post("/newUser", (req, res) => {
    const newUser = new UserModel(req.body);

    newUser.save()
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            res.json(err);
        });
});

app.listen(3001, () => {
    console.log("webapp backend runs!")
});
