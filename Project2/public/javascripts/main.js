
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
    newSpellElement.setAttribute('class', "list-group-item");

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

addEquipmentElement.addEventListener('click' , function(event){
    let value = spellListElement.value.split(',');
    let equipmentName = value[0];
    let equipmentCategory = value.slice(1);

    let newEquipmentElement = document.createElement('li');
    newEquipmentElement.innerHTML  = equipmentName;
    newEquipmentElement.setAttribute('class' , "list-group-item");
    
    for (className of equipmentCategory){
        let badgeElement = document.createElement('span');
        badgeElement.setAttribute('class', 'badge bg-success mx-1');
        badgeElement.innerHTML = className;
        newEquipmentElement.appendChild(badgeElement);
    }
    equipmentListGroupElement.prepend(newEquipmentElement);

})