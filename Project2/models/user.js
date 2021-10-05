var mongoose = require('mongoose');
const { equipment } = require('../controller/userCtrl');
const Schema = mongoose.Schema;


var spellsSchema = new mongoose.Schema({
  name:String,
  description:String,
  range: String,
  level:Number,
  class: String,
  castingTime: Number,
  duration:String, 
});

var equipmentSchema = new mongoose.Schema({
  name:String,
  category:String,
  damage:String
}); 

var characterSchema = new mongoose.Schema({
  name:String,
  class: String,
  level: Number,
  hitPoints: Number,
  armourClass: Number,
  proficiency: Number,
  initiative: Number,
  strength:Number,
  dexterity:Number,
  intelligence:Number,
  wisdom: Number,
  constitution : Number,
  charisma: Number,
  spells:[spellsSchema],
  equipment:[equipmentSchema]

});

var userSchema = new mongoose.Schema({
    name: String,
    email: String,
    cohort: String,
    avatar: String,
    googleId:String,
    characters:[characterSchema],
  }, {
    timestamps: true
  });
  
  module.exports = mongoose.model('User', userSchema);