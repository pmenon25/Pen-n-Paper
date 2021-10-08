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
    newSpellElement.innerHTML = spellName;
    newSpellElement.setAttribute('class', "list-group-item spell");
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
    newEquipmentElement.innerHTML = equipmentName;
    newEquipmentElement.setAttribute('class', "list-group-item equipment");

    for (className of equipmentCategory) {
        let badgeElement = document.createElement('span');
        badgeElement.setAttribute('class', 'badge bg-warning text-black mx-1');
        badgeElement.innerHTML = className;
        newEquipmentElement.appendChild(badgeElement);
    }
    equipmentListGroupElement.prepend(newEquipmentElement);

})

function postData(url = '', data = {}) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", '/user/show', true);

    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {

        }
    }

    console.log(JSON.stringify(data));

    xhr.send(JSON.stringify(data));
}

function myPost(url, data) {
    fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        mode: 'no-cors'
        // -- or --
        // body : JSON.stringify({
        // user : document.getElementById('user').value,
        // ...
        // })
    }).then(
        response => response.json()
        // same as function(response) {return response.text();}
    ).then(
        html => console.log(html)
    );
}

async function sendCharacterSheet() {

    let response = await fetch('/usr/show', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: document.getElementById('name').value,
            class: "Barbarian", // document.getElementById('classes').value,
            level: "1", //  document.getElementById('level').value,
            hitPoints: "2", // document.getElementById('hp-field').value,
            armourClass: "3", // document.getElementById('ac-field').value,
            proficiency: "5", // document.getElementById('prof-bonus-field').value,
            strength: {
                modifier: "2", // document.getElementById('str-modifier').value,
                savingThrow: "3", // document.getElementById('str-saving-throw').value,
                skills: [2, 3, 4]
            },

            dexterity: {
                modifier: "2", // document.getElementById('dex-modifier').value,
                savingThrow: "7", // document.getElementById('dex-saving-throw').value,
                skills: [1, 2, 3]
            },

            constitution: {
                modifier: "9", // document.getElementById('con-modifier').value,
                savingThrow: "2", // document.getElementById('con-saving-throw').value,
                skills: [2, 3, 4]
            },

            intelligence: {
                intModifier: 0, // document.getElementById('int-modifier').value,
                intSavingThrow: 2, // document.getElementById('int-saving-throw').value,
                skills: [2, 3, 4]
            },

            wisdom: {
                modifier: 1, // document.getElementById('wis-modifier').value,
                savingThrow: 2, // document.getElementById('wis-saving-throw').value,
                skills: [2, 3, 4]
            },

            charisma: {
                modifier: 5, // document.getElementById('cha-modifier').value,
                savingThrow: 2, // document.getElementById('cha-saving-throw').value,
                skills: [7, 8]
            },

            spells: ["A", "B"], // document.getElementsByClassName('spell')[0].innerHTML,
            equipment: ["X", "Y"] // document.getElementsByClassName('equipment')[0].innerHTML,
        })
    }).then(res => console.log(res.json()))

    // myPost('/usr/show', })
}

let saveButton = document.getElementById('save');
saveButton.addEventListener('click', sendCharacterSheet);