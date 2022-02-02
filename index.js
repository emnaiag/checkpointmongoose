const express = require("express");
const mongoose = require("mongoose");
const PersonInfo = require("./models/PersonInfo");

require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 5000;
// Installing and setting up Mongoose
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected");
  })
  .catch((e) => {
    console.log("Something went wrong", e);
  });

// Create Many Records with model.create()
const addPerson = async (name, age, favoriteFoods) => {
  const personInfo = await PersonInfo.create({ name, age, favoriteFoods });
  console.log(personInfo);
};
// addPerson("rihem", 20, ["spagetti"]);
// addPerson("Eya", 14, ["sandwitch", "salade"]);
// addPerson("Ahmed", 40, ["poulet", "kouskous", "salade"]);

// Use model.find() to Search Your Database
const findperson = async (guest) => {
  const personInfos = await PersonInfo.find({ name: guest });
  console.log(personInfos);
};
// findperson("Ahmed");

// Use model.findOne()
const findpers = async (food) => {
  const personInfos = await PersonInfo.findOne({ favoriteFoods: food });
  console.log(personInfos);
};
// findpers("salade");

// Use model.findById()
const findid = async (personId) => {
  const personInfos = await PersonInfo.findById(personId);
  console.log(personInfos);
};
// findid("61f93ccc7654e33234ef8559");

// Perform Classic Updates by Running Find
const findandup = async (personId) => {
  const personInfos = await PersonInfo.findById(personId);
  // personInfos.favoriteFoods.push("spaghetti");
  await personInfos.save();
  console.log(personInfos);
};
findandup("61f93ccc7654e33234ef8559");

// Perform New Updates on a Document Using model.findOneAndUpdate()
const findupname = async (nom) => {
  const personInfos = await PersonInfo.findOneAndUpdate({name:nom},{age:20});
  console.log(personInfos);
};
// findupname("Eya")

// Delete One Document Using model.findByIdAndRemove
const findremove = async (id) => {
  const personInfos = await PersonInfo.findByIdAndRemove(id);
  console.log(personInfos);
};
// findremove("61f93d79f8175805252bb8c3")
const deletemary = async () => {
  const personInfos = await PersonInfo.deleteMany({name: "Mary"});
  console.log(personInfos);
};
// deletemary();

// Chain Search Query Helpers to Narrow Search Results
PersonInfo.find({ favoriteFoods: "Sandwitch" }) 
    .limit(2) 
    .sort({ name: 1 }) 
    .select({ age: false }) 
    .exec((err, data) => {
        if (err) {
            console.log(err);
        } else console.log(data);
    });

app.listen(PORT, () => console.log(`SERVER STARTED ON PORT ${PORT}`));
