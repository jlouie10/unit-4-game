// Declare variables
var you = "";
var globalChoice = 1;
var character = {
    list: {
        ironman: {
            name: "Iron Man",
            stats: {
                health: 100,
                attack: 10,
                counter: 15,
                experience: 2
            },
            role: "none", // { none, avenger, villain }
            active: false
        },
        captainAmerica: {
            name: "Captain America",
            stats: {
                health: 75,
                attack: 15,
                counter: 5,
                experience: 1,
            },
            role: "none",
            active: false
        }
    },
    choose: function () { // Method for choosing your character
        var option = globalChoice;
        var choice = "";

        if (option === 1) {
            choice = "ironman";
            you = character.list[choice];
        }
        else {
            choice = "captainAmerica";
            you = character.list[choice];
        }

        you.active = true;

        this.assignRoles(choice);
    },
    assignRoles: function(yourChoice) { // Method for assigning roles to all characters
        var keys = Object.keys(this.list);

        for (i = 0; i < keys.length; i++) {
            if (keys[i] === yourChoice) {
                
                // Assign your role as Avenger
                you.role = "avenger";
            }
            else {

                // Assign all other characters as villains
                character.list[keys[i]].role = "villain";
            }
        }
    }
}

character.choose();

console.log(you);
console.log(character.list);