const mongoose = require("mongoose");

const characterSchema = new mongoose.Schema({
    characterId:{
        type:Number,required:true,unique:true,min:1
    },

    name:{
        type:String, required:true,trim:true,lowercase:true
    },

    status:{
        type:String
    },

    species:{
        type:String
    },

    gender:{
        type:String

    },

    origin:{
        type:String
    },

    location:{
        type:String
    }
});


module.exports=mongoose.model("Character",characterSchema);