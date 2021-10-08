const request = require('request');
const User = require('../models/user.js');
const equipmentURL = "https://api.open5e.com/weapons/";
const spellURL = "https://api.open5e.com/spells/";
const classURL = "https://api.open5e.com/classes/";

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

function renderCharacterSheet(res) {
    request(equipmentURL, function (err, response, body) {
        const equipment = JSON.parse(body);
        request(spellURL, function (err, response, body) {
            const spells = JSON.parse(body);
            request(classURL, function (err, response, body) {
                const classes = JSON.parse(body);
                res.render('User/characterSheet.ejs', {
                    defaultSettings: {
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
                    },

                    equipment: equipment.results,
                    spells: spells.results,
                    classes: classes.results
                })
            })
        })
    })
}

function create(req, res, next) {
    renderCharacterSheet(res);
}

async function submit(req, res) {
    console.log("submit -->", req.body);

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
    res.redirect('/user/show')
}

function viewSheet(req, res) {
    request(equipmentURL, function (err, response, body) {
        const equipment = JSON.parse(body);
        request(spellURL, function (err, response, body) {
            const spells = JSON.parse(body);
            request(classURL, function (err, response, body) {
                const classes = JSON.parse(body);
                for (let c of req.user.characters) {
                    if (c._id.equals(req.params.id)) {
                        console.log(c)
                        res.render('User/characterSheet.ejs', {
                            defaultSettings: {
                                name: c.name,
                                class: c.class,
                                level: c.level,
                                hitPoints: c.hitPoints,
                                armourClass: c.armourClass,
                                proficiency: c.proficiency,
                                strength: {
                                    modifier: c.strength.modifier,
                                    savingThrow: c.strength.savingThrow,
                                    skills: c.strength.skills
                                },

                                dexterity: {
                                    modifier: c.dexterity.modifier,
                                    savingThrow: c.dexterity.savingThrow,
                                    skills: c.dexterity.skills
                                },

                                constitution: {
                                    modifier: c.constitution.modifier,
                                    savingThrow: c.constitution.savingThrow,
                                    skills: c.constitution.skills
                                },

                                intelligence: {
                                    modifier: c.intelligence.modifier,
                                    savingThrow: c.intelligence.savingThrow,
                                    skills: c.intelligence.skills
                                },

                                wisdom: {
                                    modifier: c.wisdom.modifier,
                                    savingThrow: c.wisdom.savingThrow,
                                    skills: c.wisdom.skills
                                },

                                charisma: {
                                    modifier: c.charisma.modifier,
                                    savingThrow: c.charisma.savingThrow,
                                    skills: c.charisma.skills
                                },

                                spells: [""],
                                equipment: [""]
                            },
                            equipment: equipment.results,
                            spells: spells.results,
                            classes: classes.results
                        });
                        return;
                    }
                }
            });

        });

    });
}

function deleteSheet(req, res, next) {
    User.findOne({ 'characters._id': req.params.id }, function (err, user) {
        user.characters.id(req.params.id).remove();
        user.save(function (err) {
            res.redirect('/user/show')
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
    deleteSheet
}