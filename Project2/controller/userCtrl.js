const request = require('request');
const User = require('../models/user.js');
const equipmentURL = "https://api.open5e.com/weapons/";
const spellURL = "https://api.open5e.com/spells/";
const classURL = "https://api.open5e.com/classes/";
const LANDING_PAGE_URL = "/user/show";

function index(req, res, next) {
    res.render('User/index.ejs', {
        user: req.user,
        name: req.query.name,
    });
};

async function show(req, res) {
    const result = await User.findById(req.user)
    res.render('User/show.ejs', { result: result.characters })
}

function equipment(req, res, next) {
    request(equipmentURL, function (err, response, body) {
        const equipment = JSON.parse(body);
        res.render('User/equipment.ejs', { equipment: equipment.results })
    })
}

function spells(req, res, next) {
    request(spellURL, function (err, response, body) {
        const spells = JSON.parse(body);
        res.render('User/spells.ejs', { spells: spells.results })
    })
}

function classes(req, res, next) {
    request(classURL, function (err, response, body) {
        const classes = JSON.parse(body);
        res.render('User/classes.ejs', { classes: classes.results })
    })
}

function getDefaultCharacter() {
    return {
        name: "Name",
        class: "Barbarian",
        level: 1,
        hitPoints: 0,
        armourClass: 0,
        proficiency: 0,
        strength: {
            modifier: 0,
            savingThrow: 0,
            skills: [0]
        },

        dexterity: {
            modifier: 0,
            savingThrow: 0,
            skills: [0]
        },

        constitution: {
            modifier: 0,
            savingThrow: 0,
            skills: [0]
        },

        intelligence: {
            intModifier: 0,
            intSavingThrow: 0,
            skills: [0]
        },

        wisdom: {
            modifier: 0,
            savingThrow: 0,
            skills: [0]
        },

        charisma: {
            modifier: 0,
            savingThrow: 0,
            skills: [0]
        },

        spells: [""],
        equipment: [""]
    }
}

function renderCharacterSheet(res, character, create = false) {
    request(equipmentURL, function (err, response, body) {
        const equipment = JSON.parse(body);
        request(spellURL, function (err, response, body) {
            const spells = JSON.parse(body);
            request(classURL, function (err, response, body) {
                const classes = JSON.parse(body);
                res.render('User/characterSheet.ejs', {
                    create: create,
                    character: character,
                    equipment: equipment.results,
                    spells: spells.results,
                    classes: classes.results
                })
            })
        })
    })
}

function create(req, res, next) {
    renderCharacterSheet(res, getDefaultCharacter(), create = true);
}

async function submit(req, res) {
    req.user.characters.push({
        name: req.body.name,
        class: req.body.class,
        level: req.body.level,
        hitPoints: req.body.hitPoints,
        armourClass: req.body.armourClass,
        proficiency: req.body.proficiency,
        strength: req.body.strength,
        dexterity: req.body.dexterity,
        constitution: req.body.constitution,
        intelligence: req.body.intelligence,
        wisdom: req.body.wisdom,
        charisma: req.body.charisma,
        spells: req.body.spells,
        equipment: req.body.equipment
    })

    await req.user.save();
    res.json({ 'success': true, 'url': LANDING_PAGE_URL });
}

async function updateSheet(req, res) {
    User.findOne({ 'characters._id': req.params.id }, function (err, user) {
        user.characters.id(req.params.id).remove();
        user.characters.push(req.body);
        user.save(function (err) {
            res.json({ 'success': true, 'url': LANDING_PAGE_URL });
        });
    })
}

function viewSheet(req, res) {
    for (let c of req.user.characters) {
        if (c._id.equals(req.params.id)) {
            renderCharacterSheet(res, c, create = false)
            return;
        }
    }
}

function deleteSheet(req, res, next) {
    User.findOne({ 'characters._id': req.params.id }, function (err, user) {
        user.characters.id(req.params.id).remove();
        user.save(function (err) {
            res.redirect(LANDING_PAGE_URL)
        });

    })
}

module.exports = {
    index,
    show,
    equipment,
    spells,
    classes,
    create,
    submit,
    viewSheet,
    deleteSheet,
    updateSheet
}