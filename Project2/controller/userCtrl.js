const request = require('request');
const User = require('../models/user.js');
const equipmentURL = "https://api.open5e.com/weapons/";
const spellURL = "https://api.open5e.com/spells/";
const classURL = "https://api.open5e.com/classes/";

function index(req, res, next) {
    console.log(req.user)
    res.render('User/index.ejs', {
        user: req.user,
        name: req.query.name,
    });
};

async function show(req, res) {
    const result = await User.findById(req.user)
    console.log(result)
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

function create(req, res, next) {
    request(equipmentURL, function (err, response, body) {
        const equipment = JSON.parse(body);
        request(spellURL, function (err, response, body) {
            const spells = JSON.parse(body);
            request(classURL, function (err, response, body) {
                const classes = JSON.parse(body);
                res.render('User/characterSheet.ejs', { equipment: equipment.results, spells: spells.results, classes: classes.results })
            })
        })
    })

}

async function submit(req, res) {
    req.user.characters.push({
        name: req.body.name,
        class: req.body.class,
        level: req.body.level,
        hitPoints: req.body.hitPoints,
        armourClass: req.body.armourClass,
        proficiency: req.body.proficiency,
        initative: req.body.initative,
        strength: req.body.strength,
        dexterity: req.body.dexterity,
        intelligence: req.body.intelligence,
        wisdom: req.body.wisdom,
        constitution: req.body.constitution,
        charisma: req.body.charisma,
        spells: req.body.spells,
        equipment: req.body.equipment
    })
    await req.user.save();
    res.render('User/show.ejs')
}

function viewSheet(req, res) {
    console.log(req.params.id)
    for (let c of req.user.characters) {
        console.log(c._id)
        if (c._id.equals(req.params.id)) {
            console.log(c)
            res.render('User/view.ejs', { result: c })
        }
    }
}

async function deleteSheet(req, res) {
    console.log("hello")
    for (let c of req.user.characters) {
        if (c._id.equals(req.params.id)) {
            await c.remove();
            res.redirect('/user/show')
        }
        
    }
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
    deleteSheet
}