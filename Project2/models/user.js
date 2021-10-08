var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var classesSchema = new mongoose.Schema({
  name: String,
  hp_at_1st_level: Number,
  hp_at_higher_levels: Number,
  prof_armor: String,
  prof_weapons: String,
  prof_tools: String,
  prof_saving_throws: String,
  prof_skills: String
})
var spellsSchema = new mongoose.Schema({
  name: String,
  range: String,
  level: Number,
  class: String,
  castingTime: Number,
  duration: String,
});

var equipmentSchema = new mongoose.Schema({
  name: String,
  category: String,
  damage: String
});


var abilityScoreSchema = new mongoose.Schema({
  modifier: Number,
  savingThrow: Number,
  skills: [Number]
});

var characterSchema = new mongoose.Schema({
  name: String,
  class: String,
  level: Number,
  hitPoints: Number,
  armourClass: Number,
  proficiency: Number,
  strength: abilityScoreSchema,
  dexterity: abilityScoreSchema,
  constitution: abilityScoreSchema,
  intelligence: abilityScoreSchema,
  wisdom: abilityScoreSchema,
  charisma: abilityScoreSchema,
  spells: [String],
  equipment: [String]
});

var userSchema = new mongoose.Schema({
  name: String,
  email: String,
  cohort: String,
  avatar: String,
  googleId: String,
  characters: [characterSchema],
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);