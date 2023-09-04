let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["Stick"];

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterNameText = document.querySelector("#monsterName");
const monsterHealthText =document.querySelector("#monsterHealth");

const weapons = [
    {
        name: "Stick",
        power: 5,
    },
    {
        name: "Dagger",
        power: 30
    },
    {
        name: "Claw Hammer",
        power: 50
    },
    {
        name: "Sword",
        power: 100
    }
];
const locations = [
    {
        name: "town square",
        "button text": ["Go to store", "Go to cave", "Fight dragon"], // "button text is in two words thus needs quotation marks"
        "button functions": [goStore, goCave, fightDragon],
        text: "You are in the town square. You see a sign that says \"store\".",
    },
    {
        name: "store",
        "button text": ["Buy 10 Health (10 gold)", "Buy Weapon (30 gold)", "Go to town square"], // "button text is in two words thus needs quotation marks"
        "button functions": [buyHealth, buyWeapon, goTown],
        text: "You enter the store.",
    },
    {
        name: "cave",
        "button text": ["Buy 10 Health (10 gold)", "Buy Weapon (30 gold)", "Go to town square"], // "button text is in two words thus needs quotation marks"
        "button functions": [buyHealth, buyWeapon, goTown],
        text: "You enter the cave. You see some monsters.",
    },
    {
        name: "fight",
        "button text": ["Attack", "Dodge", "Run"], // "button text is in two words thus needs quotation marks"
        "button functions": [attack, dodge, goTown],
        text: "You are fighting  a monster."
        
    }

]
const monsters = [
    {
        name: "Slime",
        level: 2,
        health: 15
    },
    {
        name: "Fanged Beast",
        level: 8,
        health: 60
    },
    {
        name: "Dragon",
        level: 20,
        health: 300
    }
]
// initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location){
    button1.innerText = location["button text"][0];
    button2.innerText = location["button text"][1];
    button3.innerText = location["button text"][2];
    button1.onclick = location["button functions"][0]; //when key gives back 2 or more (array), need bracket notation,
    button2.onclick = location["button functions"][1]; // otherwise can just use . notation
    button3.onclick = location["button functions"][2];
    text.innerText = location.text

}

function toString(array){
    list = ""
    current = 0;
    while (array[current+1] != undefined){ //does not add comma to last element
        list+=array[current] + ", ";
        current++;
    }
    list += array[current];
    return list;

}
function goTown(){
    update(locations[0]);
} 


function goStore() {
   update(locations[1]);
   text.innerText+=`\nIn your inventory you have: ${toString(inventory)}`;
}

function buyHealth(){
    if (gold >= 10){
        gold-= 10;
        health+= 10;
        goldText.innerText = gold;
        healthText.innerText = health;
    }
    else{
        text.innerText = "You do not have enough gold to buy health.";

    }
}
function buyWeapon(){
    if (currentWeapon == weapons.length) { //if current weapon is the last of weapons array, then "error"
        text.innerText = "No more weapons available." // designed so that wont break if weapons array is expanded.
    }
    else if (gold <=30){
        text.innerText = "You do not have enough gold to buy the next weapon.";
    }
    else{
        // future ref: add if statement and bool variable to choose 'a' or 'an' for text string.
        gold-=30;
        currentWeapon++;
        goldText.innerText = gold;
        let newWeapon = weapons[currentWeapon].name;
        inventory.push(newWeapon);
        text.innerText = `Purchaced a ${newWeapon} for 30 gold.`;
    }
    text.innerText+=`\nIn your inventory you have: ${toString(inventory)}`;
    
}


function goCave(){
    
}


function fightSlime(){
    enemy = 0;
    goFight()

}
function fightBeast(){
    enemy = 1;
    goFight();
}
function fightDragon(){
    enemy = 2;
    goFight();
}

function goFight(){
    update(locations[3]);
    monsterHealth = monsters[enemy].health;
    monsterStats.style.display = "block";
    monsterNameText.innerText = monsters[enemy].name;
    monsterHealthText.innerText = monsterHealth;
}
function attack(){
    text.innerText = `The ${monsters[enemy].name} attacks.`;
    text.innerText += `\nYou attack it with your ${weapons[currentWeapon].name}.`;
    health -= monsters[enemy].level;
    monsterHealth -= weapons[currentWeapon.power].power + Math.floor(Math.random() * xp) + 1;
    healthText.innerText = health;
    monsterHealthText.innerText = monsterHealth;
    if (health <=0){
        lose();
    }
    else if (monsterHealth <= 0){
        defeatMonster();
    }
}
function dodge(){

}

function lose(){

}
function defeatMonster(){
    
}