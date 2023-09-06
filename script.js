let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let enemy;
let monsterHealth;
let inventory = ["Stick"];
let lasthitDied = false; // tracks if monster died to last hit
let brokenWeapon = "";

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
        "button text": ["Buy 10 Health (10 gold)", "Buy Weapon (30 gold)", "Go to Town Square"], // "button text is in two words thus needs quotation marks"
        "button functions": [buyHealth, buyWeapon, goTown],
        text: "You enter the store.",
    },
    {
        name: "cave",
        "button text": ["Fight Slime", "Fight Fanged Beast", "Go to Town Square"], // "button text is in two words thus needs quotation marks"
        "button functions": [fightSlime, fightBeast, goTown],
        text: "You enter the cave. You see some monsters.",
    },
    {
        name: "fight",
        "button text": ["Attack", "Dodge", "Run"], // "button text is in two words thus needs quotation marks"
        "button functions": [attack, dodge, goTown],
        text: "You are fighting  a monster."
        
    },
    {
        name: "kill monster",
        "button text": ["Go to Town Square", "Go to Town Square", "Go to Town Square"], // "button text is in two words thus needs quotation marks"
        "button functions": [goTown, goTown, goTown],
        text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.'
    },
    {
        name: "lose",
        "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
        "button functions": [restart, restart, restart],
        text: " You die. ☠️"
    },
    {
        name: "win",
        "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
        "button functions": [restart, restart, restart],
        text: "You defeat the Dragon! YOU WIN THE GAME! 🎉" 
    },
    {
        name: ""
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
    monsterStats.style.display = "none";
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
    if (currentWeapon == weapons.length-1) { //if current weapon is the last of weapons array, then "error"
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
        text.innerText = `Purchased a ${newWeapon} for 30 gold.`;
    }
    text.innerText+=`\nIn your inventory you have: ${toString(inventory)}`
    
    
}


function goCave(){
    update(locations[2]);
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
    lasthitDied = false;
    text.innerText = `The ${monsters[enemy].name} attacks.`;
    text.innerText += `\nYou attack it with your ${weapons[currentWeapon].name}.`;
    if (monsterHitChance()){
        let hit = getMonsterAttackValue(monsters[enemy].level)
        health -= hit;
        text.innerText += `\nThe ${monsters[enemy].name} deals ${hit} damage.`;
    
    }
    else{
        text.innerText+= `\nThe ${monsters[enemy].name} misses it's attack. You take no damage.`;
    }

    if (playerHitChance()){
        let dmg = weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
        text.innerText+= `\nYou succesfully deal ${dmg} damage.`;
        monsterHealth -= dmg;
        if (weaponBreakChance()){
            brokenWeapon = inventory.pop()
            text.innerText+= `\nHowever, Your ${brokenWeapon} breaks.`;
            currentWeapon--;
            if (monsterHealth <= 0){
                lasthitDied = true; // monster died to last hit; once screen updates, must still inform player that the weapon breaks.
            }
        }
    }
    else{
        text.innerText+= `\nYou miss your attack. You deal no damage.`;
    }

    healthText.innerText = health;
    monsterHealthText.innerText = monsterHealth;
    if (health <=0){
        lose();
    }
    else if (monsterHealth <= 0){
        enemy === 2 ? winGame() : defeatMonster();  //ternary operator (faster if else) 
        
    }
}
function getMonsterAttackValue(level){
    let hit = (level*5) - Math.floor(Math.random()*xp);
    console.log(`${monsters[enemy].name} hits for ${hit} damage.`);
    return hit;
}
function monsterHitChance(){ //85% chance the monster does damage
    if (Math.random() > 0.15){
        return true;
    }
    else{
        return false;
    }
}
function playerHitChance(){ // 80% chance the player does damage
    if (Math.random() > 0.2){
        return true;
    }
    else{
        return false;
    }
}
function weaponBreakChance(){
    if (Math.random() <= .1 && inventory.length > 1){ //10% chance for weapon to break && Cannot break player's first/only weapon
        return true;
    }
    else{
        return false;
    }
}
function dodge(){ // 20% chance to -5 health. 15% chance to +10 health. 65% chance for nothing.
    text.innerText = "You dodge the attack from the " + monsters[enemy].name + ".";
    let dodgeChance = Math.random()
    if (dodgeChance <= 0.2){
        let dmg = 5;
        text.innerText+= `\nHowever, you barely manage to escape and take ${dmg} damage`;
        health-= dmg;
        if (health <= 0){
            lose();
        }
        
    }
    else if (dodgeChance >= 0.85){
        let regen = 10;
        text.innerText+= `\nIt gives you time to breathe. You regenerate ${regen} health`;
        health+= regen;
    }
    healthText.innerText = health;
}

function lose(){
    monsterStats.style.display = "none";
    update(locations[5]);
}
function defeatMonster(){
    monsterStats.style.display = "none";
    gold+= Math.floor(monsters[enemy].level * 6.7) 
    xp+= monsters[enemy].level;
    goldText.innerText = gold;
    xpText.innerText = xp;
    update(locations[4]);
    if (lasthitDied){
        text.innerText += `\n\nYour ${brokenWeapon} breaks in the battle.`
    }
}
function restart(){
    xp = 0;
    health = 100;
    gold = 50;
    currentWeapon = 0;
    inventory = ["Stick"];
    healthText.innerText = health;
    goldText.innerText = gold;
    xpText.innerText = xp;
    goTown();
}
function winGame(){
    monsterStats.style.display = "none";
    update(locations[6])
}
/*function easterEgg(){    // to be added...
    update(locations[7])
}
*/
