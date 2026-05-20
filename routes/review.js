const express=require("express");
const router= express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const ExpressError = require("../utils/ExpressError.js");
const{listingSchema}= require("../schema.js")
const Review = require("../models/review.js");
const{validateReview, isLoggedIn,isReviewAuthor}=require("../middleware.js")
const revieController=require("../controllers/reviews.js")


//Review post rout
router.post("/",isLoggedIn,validateReview,wrapAsync(revieController.createReview
  
)
)
  // Delete Review route
  router.delete("/:reviewId"
    ,isLoggedIn,isReviewAuthor,wrapAsync(revieController.destroyReview));
  module.exports =router;