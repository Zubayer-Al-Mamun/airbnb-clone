const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");


  
app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "public")));


// CONNECTION WITH DATABASE
main().then(()=>{
    console.log("Connected With Database...");
}).catch((err) =>{
    console.log(err);
})
async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/travel")
}


// INDEX ROUTE 
app.get("/listing", async (req, res) =>{
    let allListings = await Listing.find({});
    res.render("listing/index.ejs",{allListings});
})



// EDITE ROUTE
app.get("/listing/:id/edit", async (req, res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listing/update.ejs",{listing});

})

// NEW LISTING ROUTE
app.get("/listing/new", (req, res) =>{
    res.render("listing/new.ejs");
}) 

// CREATE ROUTE
app.post("/listing", async ( req, res) =>{
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listing");
} )


// UPDATE ROUTE
app.put("/listing/:id", async (req, res) =>{
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    res.redirect(`/listing/${id}`);
})

//  SHOW ROUTE
app.get("/listing/:id", async (req, res) =>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listing/show.ejs", {listing});
})

// DELETE ROUTE 
app.delete("/listing/:id", async (req, res) =>{
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listing");
})



app.get("/", (req, res) => {
    res.send("hello i am root..");
})

app.listen(8000, () =>{
    console.log("Server is listening on port 8000..");
})