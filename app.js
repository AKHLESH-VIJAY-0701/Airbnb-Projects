// if(process.env.NODE_ENV !="PRODUCTION"){
//   require('dotenv').config();
// }
// const express = require("express");
// const app = express();
// //const path = require("node:path");
// app.use(express.json()); // CommonJS
// const mongoose = require("mongoose");
// const Listing = require("./models/listing.js");
// const path = require("path");
// const methodOverride = require("method-override");
// const ejsMate=require("ejs-mate");
// const wrapAsync = require("./utils/wrapAsync.js");


// const ExpressError = require("./utils/ExpressError.js");
// app.use(express.static(path.join(__dirname,"public")));
// app.wrapAsync=require("./utils/wrapAsync.js");
// app.ExpressError=require("./utils/ExpressError.js")
// const{listingSchema,reviewSchema}= require("./schema.js")
// const Review = require("./models/review.js");
// const listingsRouter =require("./routes/listing.js");
// const reviewRouter = require("./routes/review.js");
// const userRouter=require("./routes/user.js");
// const session = require('express-session');

// //const session =require("express-session");
// const MongoStore = require("connect-mongo").default;
// const reviews = require("./routes/review.js");
// const flash =require("connect-flash");
// const passport = require("passport");
// const LocalStartegy = require("passport-local");
// const User =require("./models/user.js");



// app.set("views",path.join(__dirname,"views"));//set
// app.set("view engine", "ejs");

// app.use(express.urlencoded({ extended: true }));

// app.use(methodOverride("_method"));
// app.engine("ejs",ejsMate)
// app.use(express.static(path.join(__dirname,"/public")));

// const dbUrl=process.env.ATLASDB_URL;
// main()
//   .then(() => {
//     console.log("connected to DB");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// async function main() {
//    await mongoose.connect(dbUrl);
// }
// app.use(express.json());
// app.set("views", path.join(__dirname, "views"));//s
// app.set("view engine", "ejs");

// app.set("views", path.join(__dirname, "views"));//set
// app.use(express.urlencoded({ extended: true }));

// app.use(methodOverride("_method"));
// app.engine("ejs",ejsMate)
// app.use(express.static(path.join(__dirname,"public")));

// const store = MongoStore.create({
//   mongoUrl: dbUrl,
//   crypto: {
//     secret:process.env.SECRET,
//   },
//   touchAfter: 24 * 3600,
// });

// //

// store.on("error",function(e){
//   console.log("session store error in mongodb session",e);
// });
// const sessionOptions={
//   store,
//   secret:process.env.SECRET,
//   resave: false,
//   saveUninitialized: true,
//   cookie:{
//     expires:Date.now() + 7 * 24 * 60 * 60 * 10000,
//     maxAge:+ 7 * 24 * 60 * 60 * 10000,
//     httpOnly:true
//   }
// }





// app.use(session(sessionOptions));
// //passport process
// app.use(flash())
// app.use(passport.initialize());

// app.use(passport.session());
// passport.use(new LocalStartegy(User.authenticate()));

// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

// app.use((req,res,next)=>{
//   res.locals.success= req.flash("success");
//   res.locals.error= req.flash("error");
//   res.locals.currUser = req.user;
//   next();
// })


// // app.all("*",(req,res,next)=>{
// //   next(new ExpressError(404,"page not working!"))
// // })

// app.use("/listings",listingsRouter);
// app.use("/listings/:id/reviews",reviewRouter)
// app.use("/",userRouter);
// //req.flash("success","New Listing Create!");//req changed
// //res.redirect("/listings");


// app.use((err,req,res,next)=>{
//   let{statusCode=500}= err;
//   res.status(statusCode).render("error.ejs",{err});
//  //res.status(statusCode).send("something is wrong");
// });


// app.listen(8080, () => {
//   console.log("server is listening to port 8080");
// })



// app.get("/search", async (req, res, next) => {
//   try {
//     const q = req.query.q || "";

//     const listings = await Listing.find({
//       $or: [
//         { title: { $regex: q, $options: "i" } },
//         { location: { $regex: q, $options: "i" } },
//         { country: { $regex: q, $options: "i" } }
//       ]
//     });

//     res.render("search/results", { listings, q });
//     console.log("good work")

//   } catch (err) {
//     next(err);
//   }
// });




if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config();
}

// ================= CORE =================
const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

// ================= MODELS =================
const Listing = require("./models/listing.js");
const Review = require("./models/review.js");
const User = require("./models/user.js");

// ================= ROUTES =================
const listingsRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

// ================= AUTH =================
const session = require("express-session");
const MongoStore = require("connect-mongo").default;
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");

// ================= DB =================
const dbUrl = process.env.ATLASDB_URL;

async function main() {
  await mongoose.connect(dbUrl);
}

main()
  .then(() => console.log("✅ connected to DB"))
  .catch((err) => console.log(err));

// ================= VIEW ENGINE =================
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);

// ================= MIDDLEWARE =================
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

// ================= SESSION STORE =================
const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600,
});

store.on("error", (e) => {
  console.log("session store error", e);
});

// ================= SESSION CONFIG =================
const sessionOptions = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

app.use(session(sessionOptions));
app.use(flash());

// ================= PASSPORT =================
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ================= GLOBAL VARIABLES =================
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

// ================= HOME ROUTE =================
app.get("/", (req, res) => {
  res.render("listing/index");
});

// ================= SEARCH ROUTE =================
app.get("/search", async (req, res, next) => {
  try {
    const q = req.query.q || "";

    const listings = await Listing.find({
      $or: [
        { title: { $regex: q, $options: "i" } },
        { location: { $regex: q, $options: "i" } },
        { country: { $regex: q, $options: "i" } },
      ],
    });

    res.render("search/results", { listings, q });
  } catch (err) {
    next(err);
  }
});

// ================= ROUTES =================
app.use("/listings", listingsRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);

// ================= ERROR HANDLER =================
app.use((err, req, res, next) => {
  let { statusCode = 500 } = err;

  res.status(statusCode).render("error", {
    err,
  });
});

// ================= SERVER =================
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`🚀 server running on port ${PORT}`);
});


