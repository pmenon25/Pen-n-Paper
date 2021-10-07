
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

let mySubmitButton = document.getElementById('mysubmit');

mySubmitButton.addEventListener('click', function (event) {
    postData('/usr/show', {
        name: document.getElementById('name').value,

        class: document.getElementById('classes').value,
        
        level: document.getElementById('level').value,
        
        hitPoints: document.getElementById('hp-field').value,
        armourClass: document.getElementById('ac-field').value,
        proficiency: document.getElementById('prof-bonus-field').value,
        strength: {
            modifier: document.getElementById('str-modifier').value,
            savingThrow: document.getElementById('str-saving-throw').value,
            skills: [2, 3, 4]
        },

        dexterity: {
            modifier: document.getElementById('dex-modifier').value,
            savingThrow: document.getElementById('dex-saving-throw').value,
            skills: [1, 2, 3]
        },

        constitution: {
            modifier: document.getElementById('con-modifier').value,
            savingThrow: document.getElementById('con-saving-throw').value,
            skills: [2, 3, 4]
        },

        intelligence : {
            intModifier: document.getElementById('int-modifier').value,
            intSavingThrow: document.getElementById('int-saving-throw').value,
            skills: [2, 3, 4]
        },

        wisdom : {
            modifier: document.getElementById('wis-modifier').value,
            savingThrow: document.getElementById('wis-saving-throw').value,
            skills: [2, 3, 4]
        },

        charisma : {
            modifier: document.getElementById('cha-modifier').value,
            savingThrow: document.getElementById('cha-saving-throw').value,
            skills: [7, 8]
        },

        spells: document.getElementsByClassName('spell')[0].innerHTML,
        
        equipment: document.getElementsByClassName('equipment')[0].innerHTML,
    })

    console.log(document.getElementsByClassName('equipment').innerHTML)
});

