const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});
  await Listing.insertMany(initData.data);
initData.data = initData.data.map((obj)=>({...obj,Owner:"675d5c43de2a09a76b20e514"}));
  console.log("data was initialized");
};

initDB();
/*<% 'Scriptlet' tag, for control-flow, no output
<%_ 'Whitespace Slurping' Scriptlet tag, strips all whitespace before it
<%= Outputs the value into the template (escaped)
<%- Outputs the unescaped value into the template
<%# Comment tag, no execution, no output
<%% Outputs a literal '<%'
%%> Outputs a literal '%>'
%> Plain ending tag
-%> Trim-mode ('newline slurp') tag, trims following newline
_%> 'Whitespace Slurping' ending tag, removes all whitespace after*/