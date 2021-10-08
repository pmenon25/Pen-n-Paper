let rollArray = [1, 2, 3, 4, 5, 6];
let diceRoll;
let rolltimes;
let totalRoll;
let totalRollElement = document.getElementById('total-roll');

document.getElementById('roll').addEventListener('click', function (event) {
    for (let counter = 0; counter < rollArray.length; counter++) {
        totalRoll = 0;
        for (rolltimes = 0; rolltimes < 3; rolltimes++) {
            diceRoll = Math.floor(Math.random() * 6) + 1;
            totalRoll += diceRoll;
        }
    }
    totalRollElement.innerHTML = 'You rolled:' + totalRoll;
    totalRollElement.style.color = 'red';
});


const level = document.getElementById('level');
const value = level.value;

level.addEventListener('change', function (event) {
    let value = event.target.value;
    let bonus = 0;

    if (value <= 4) {
        bonus = 2;
    } else if (value <= 8) {
        bonus = 3;
    } else if (value <= 12) {
        bonus = 4
    } else if (value <= 16) {
        bonus = 5;
    } else {
        bonus = 6;
    }

    document.getElementById('prof-bonus-field').value = '+' + bonus;
})

const addSpellElement = document.getElementById('add-spell-button');
const spellListElement = document.getElementById('spell-list');
const spellListGroupElement = document.getElementById('spell-list-group');

addSpellElement.addEventListener('click', function (event) {
    let value = spellListElement.value.split(',');
    let spellName = value[0];
    let spellClasses = value.slice(1);

    let newSpellElement = document.createElement('li');
    newSpellElement.setAttribute('class', "list-group-item");

    let spellElement = document.createElement('div');
    spellElement.innerHTML = spellName;
    spellElement.setAttribute('class', 'spell');
    spellElement.setAttribute('style', 'display: inline-block');
    newSpellElement.appendChild(spellElement);

    for (className of spellClasses) {
        let badgeElement = document.createElement('span');
        badgeElement.setAttribute('class', 'badge bg-success mx-1');
        badgeElement.innerHTML = className;
        newSpellElement.appendChild(badgeElement);
    }

    spellListGroupElement.prepend(newSpellElement)
});

const addEquipmentElement = document.getElementById('add-equipment-button');
const equipmentListElement = document.getElementById('equipment-list');
const equipmentListGroupElement = document.getElementById('equipment-list-group');

addEquipmentElement.addEventListener('click', function (event) {
    let value = equipmentListElement.value.split(',');
    let equipmentName = value[0];
    let equipmentCategory = value.slice(1);

    let newEquipmentElement = document.createElement('li');
    newEquipmentElement.setAttribute('class' , "list-group-item");
    let equipmentElement = document.createElement('div');
    equipmentElement.innerHTML = equipmentName;
    equipmentElement.setAttribute('class' , 'equipment');
    equipmentElement.setAttribute('style' , 'display : inline-block');
    newEquipmentElement.appendChild(equipmentElement)
   
    for (className of equipmentCategory) {
        let badgeElement = document.createElement('span');
        badgeElement.setAttribute('class', 'badge bg-warning text-black mx-1');
        badgeElement.innerHTML = className;
        newEquipmentElement.appendChild(badgeElement);
    }
    equipmentListGroupElement.prepend(newEquipmentElement);

})

function getSkillList(className) {
    let skillList = [];
    const skills = document.getElementsByClassName(className);

    for (let i = 0; i < skills.length; i++) {
        skillList.push(parseInt(skills[i].value));
    }

    return skillList;
}

function getSpellList() {
    let spellList = [];
    const spells = document.getElementsByClassName('spell')
    for (let spell of spells) {
        spellList.push(spell.innerHTML)
    }

    return spellList;
}

function getEquipmentList(){
    let equipmentList = [];
    const equipments = document.getElementsByClassName('equipment');
    for(let equipment of equipments){
        equipmentList.push(equipment.innerHTML)
    }

    return equipmentList;
}

function getCharacterData() {
    return {
        name: document.getElementById('name').value,
        class: document.getElementById('classes').value,
        level: parseInt(document.getElementById('level').value),
        hitPoints: parseInt(document.getElementById('hp-field').value),
        armourClass: parseInt(document.getElementById('ac-field').value),
        proficiency: parseInt(document.getElementById('prof-bonus-field').value),
        strength: {
            modifier: parseInt(document.getElementById('str-modifier').value),
            savingThrow: parseInt(document.getElementById('str-saving-throw').value),
            skills: getSkillList('str-skill')
        },

        dexterity: {
            modifier: parseInt(document.getElementById('dex-modifier').value),
            savingThrow: parseInt(document.getElementById('dex-saving-throw').value),
            skills: getSkillList('dex-skill')
        },

        constitution: {
            modifier: parseInt(document.getElementById('con-modifier').value),
            savingThrow: parseInt(document.getElementById('con-saving-throw').value),
            skills: getSkillList('con-skill')
        },

        intelligence: {
            modifier: parseInt(document.getElementById('int-modifier').value),
            savingThrow: parseInt(document.getElementById('int-saving-throw').value),
            skills: getSkillList('int-skill')
        },

        wisdom: {
            modifier: parseInt(document.getElementById('int-modifier').value),
            savingThrow: parseInt(document.getElementById('int-saving-throw').value),
            skills: getSkillList('wis-skill')
        },

        charisma: {
            modifier: parseInt(document.getElementById('cha-modifier').value),
            savingThrow: parseInt(document.getElementById('cha-saving-throw').value),
            skills: getSkillList('cha-skill')
        },

        spells: getSpellList(),
        equipment: getEquipmentList()
    }
}

document.getElementById('save').addEventListener('click', async (event) => {
    event.preventDefault();

    await fetch(SUBMIT_URL, {
        method: SUBMIT_METHOD,
        headers: { 'Content-Type': 'application/json' },
        redirect: 'follow',
        body: JSON.stringify(getCharacterData())
    })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if (data.success) {
                window.location.href = data.url;
            }
        });
});

