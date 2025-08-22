import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import express from "express"
import bodyParser from "body-parser"

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    const q = req.query.q ? req.query.q.toLowerCase() : null;
    let filteredCards = cards;
    if (q) {
        filteredCards = cards.filter(card =>
            card.title.toLowerCase().includes(q) ||
            card.text.toLowerCase().includes(q)
        );
    }
    res.render("index.ejs", { cards: filteredCards });
});
app.post("/submit", (req, res) =>{
    res.render("index.ejs");
})
app.get("/inventory", (req, res) => {
    const imagesDir = path.join(__dirname, "public", "imagesForInventory");
    fs.readdir(imagesDir, (err, files) => {
        if (err) {
            return res.status(500).send("Unable to scan imagesForInventory directory.");
        }
        // Filter for image files only
        const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file));
        res.render("inventory.ejs", { images: imageFiles });
    });
});

app.post("/submitAgro", (req, res) =>{
    res.render("agroforestry.ejs");
})
app.post("/submitAqua", (req, res) =>{
    res.render("aquaculture.ejs");
})
app.post("/submitBeaches", (req, res) =>{
    res.render("beachesAndShorelines.ejs");
})
app.post("/submitDesert", (req, res) =>{
    res.render("deserts.ejs");
})
app.post("/submitDesigned", (req, res) =>{
    res.render("designedLandscapes.ejs");
})
app.post("/submitForest", (req, res) =>{
    res.render("forests.ejs");
})
app.post("/submitLiveStock", (req, res) =>{
    res.render("livestockFarms.ejs");
})
app.post("/submitMountains", (req, res) =>{
    res.render("mountainsAndHills.ejs");
})
app.post("/submitNatural", (req, res) =>{
    res.render("natural.ejs");
})
app.post("/submitPark", (req, res) =>{
    res.render("publicParks.ejs");
})
app.post("/submitRivers", (req, res) =>{
    res.render("riversAndWaterfalls.ejs");
});
app.post("/submitStreet-Side",(req,res)=>{
    res.render("street-SidePlantings.ejs");
})
    
   const cards =[
    {
        img: "/images/AgroforestyLandscape.jpg",
        title: "Agroforesty Landscape",
        text: "About agroforesty landscapes",
        action: "/submitAgro"
    },
    {
        img: "/images/AquacultureLandscapes.jpg",
        title: "Aquaculture Landscape",
        text: "About aquaculture landscapes",
        action: "/submitAqua"
    },
    {
        img: "/images/BeachesAndShorelinesLandscape.jpg",
        title: "Beaches and Shorelines Landscape",
        text: "About beaches and shorelines landscapes",
        action: "/submitBeaches"
    },
    {
        img: "/images/DesertLandscape.jpg",
        title: "Desert Landscape",
        text: "About desert landscapes",
        action: "/submitDesert"
    },
    {
        img: "/images/DesignedLandscape.jpg",
        title: "Designed Landscape",
        text: "About designed landscapes",
        action: "/submitDesigned"
    },
    {
        img: "/images/ForestLandscape.jpg",
        title: "Forest Landscape",
        text: "About forest landscapes",
        action: "/submitForest"
    },
    {
        img: "/images/MountainsAndHillsLandscape.jpg",
        title: "Mountains and Hills Landscape",
        text: "About mountains and hills landscapes",
        action: "/submitMountains"
    },
    {
        img: "/images/NaturalLandscape.jpg",
        title: "Natural Landscape",
        text: "About natural landscapes",
        action: "/submitNatural"
    },
    {
        img: "/images/PublicParkLandscape.jpg",
        title: "Public Park Landscape",
        text: "About public park landscapes",
        action: "/submitPark"
    },
    {
        img: "/images/RiversAndWaterfallsLandscape.jpg",
        title: "Rivers and Waterfalls Landscape",
        text: "About rivers and waterfalls landscapes",
        action: "/submitRivers"
    },
    {
        img: "/images/Street-SidePlantingsLandscape.jpg",
        title: "Street-Side Plantings Landscape",
        text: "About street-side plantings landscapes",
        action: "/submitStreet-Side"
    },
    {
        img: "/images/LivestockFarmsandscape.jpg",
        title: "Livestock Farms Landscape",
        text: "About livestock farms landscapes",
        action: "/submitLiveStock"
    }
 ] 
app.get("/", (req,res)=>{
    res.render("index.ejs");
});
app.post("/submit",(req,res)=>{
    res.render("index.ejs");
});
app.post("/card/:id",(req,res)=>{
const card = cards.find(c =>c.id == req.params.id);
if(!card) return res.status(404).send("Card not found");

res.render("card", {card});
});

app.listen(port, () =>{
    console.log(`Server is running at ${port}`);
});
