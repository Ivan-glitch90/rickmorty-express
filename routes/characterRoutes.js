const express =require("express");
const router = express.Router();
const Character = require("../models/characterModel");//here is where the schema is imported so we can use as Character
const logIn = require("../middleware/requireLogin");//importing function from index.js

//route to find all characters:
router.get("/character/all",async(req,res)=>{
    const allCharacters = await Character.find();//finding all docs; Charater.xxx is how my access the info inside the model and do something with it
    res.json(allCharacters);
});

//route to filter by status:

router.get("/character/status/:status",async(req,res)=>{
    const statusCharacter = await Character.find({status:req.params.status});//:status is a wildcard; using req.params.status 
    res.json(statusCharacter);
});

router.get("/character/sorted/name",async(req,res)=>{
    const nameCharacter = await Character.find().sort({name:1});//ordering A to Z
    res.json(nameCharacter);
});

router.get("/character/count",async(req,res)=>{
    const countCharacter = await Character.countDocuments();//counting how many docs are in total.
    res.json({count:countCharacter});//sending as requested format.
});

//stretch goal #1 random character:
router.get("/character/random", async(req,res)=>{
   const count = await Character.countDocuments(); //step1 counting the amount of docs that we have.
    const randomIndex = Math.floor(Math.random()*count); // using Math to create a random "number" -shaking the jar- 
    const randomCharacter = await Character.findOne().skip(randomIndex); // taking a doc from randomIndex and skiping the first one.
    res.json(randomCharacter); // sending the doc.
});

//strech goal #2 New concept: conditionally building a filter object:
router.get("/character/search",async(req,res)=>{
    //building an empty object {}
    const filter = {};
    if (req.query.status){ //if and only if the query has "status"
        filter.status = req.query.status; //assign that query to status in the object
    }

    if (req.query.species){
        filter.species = req.query.species; //same logic here but with species
    }

    const results = await Character.find(filter); //waiting and finding any docs with .find using (filter) as the search requests(thinking about wording here to not use the same parameters word and create confusion)
    res.json(results);
});

router.post("/character/save/:name",logIn, async(req,res)=>{
    const resp = await fetch("https://rickandmortyapi.com/api/character/?name="+req.params.name); //route parameter: /character/save/:name| query string: /character/save no colon no name the path is now fixed.
    const data = await resp.json();
    const character = data.results[0];
    const newCharacter={
        characterId:character.id,
        name:character.name,
        status:character.status,
        species:character.species,
        gender:character.gender,
        origin:character.origin.name,
        location:character.location.name

    };
    const saved = await Character.findOneAndUpdate({characterId:newCharacter.characterId},newCharacter,{upsert:true,new:true});
    res.json(saved);
});
module.exports = router;
