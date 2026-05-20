// router.get("/search", async (req, res) => {
//   const q = req.query.q || "";

//   if (!q) {
//     return res.render("search/results", { listings: [], q });
//   }

//   const listings = await Listing.find({
//     $or: [
//       { title: { $regex: q, $options: "i" } },
//       { location: { $regex: q, $options: "i" } },
//       { country: { $regex: q, $options: "i" } }
//     ]
//   });

//   res.render("search/results", { listings, q });
// });
