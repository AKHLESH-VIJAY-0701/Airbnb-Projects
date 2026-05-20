const mongoose = require("mongoose");
const review = require("./review.js");
// const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
const Schema = mongoose.Schema;
const Review=require("./review.js")
const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    url:String,
    filename:String,
  },
  price: Number,
  location: String,
  country: String,
  reviews: [
    {
      type:Schema.Types.ObjectId,
      ref:"Review",
    },
  ],
  owner:
    
      {
    type:Schema.Types.ObjectId,
    ref:"User",
      },
    
  
});
listingSchema.post("findOneAndDelete",async(listing)=>{
  if(listing){
await Review.deleteMany({_id:{$in:listing.review}});
}
});
const Listing = mongoose.model("Listing", listingSchema);
module.exports= Listing;