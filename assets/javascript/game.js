// Declare variables
var game = {
    status: "start",
    difficulty: "easy",
    round: 1,
    defeated: [],
    win: function(id, health) {
        if (health <= 0) {
            this.defeated[this.round - 1] = id;
            this.champion();
            this.round++;

            console.log("Won");

            return true;
        }
        else {
            return false;
        }
    },
    champion: function() {
        if (this.round === this.defeated.length) {
            console.log("You have won the Infinity Gauntlet")
        }
    }
}

var characters = {
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
        },
        spiderman: {
            name: "Spider Man",
            stats: {
                health: 50,
                attack: 5,
                counter: 15,
                experience: 5,
            },
            role: "none",
            active: false
        },
        hulk: {
            name: "Hulk",
            stats: {
                health: 200,
                attack: 20,
                counter: 10,
                experience: 1,
            },
            role: "none",
            active: false
        }
    },
    activate: function (input) { // Method for choosing your character
        this.list[input].active = true;
    },
    assignRoles: function (input) { // Method for assigning roles to all characters
        var keys = Object.keys(this.list);

        for (i = 0; i < keys.length; i++) {
            if (keys[i] === input) {

                // Assign your role as Avenger
                this.list[keys[i]].role = "avenger";
            }
            else {

                // Assign all other characters as villains
                this.list[keys[i]].role = "villain";
            }
        }
    }
};

var player = {
    id: "",
    name: "",
    stats: {
        health: 0,
        attack: 0,
        counter: 0,
        experience: 0
    },
    select: function(input, characterProfile) {
        this.id = input;
        this.name = characterProfile.name;
        this.stats.health = characterProfile.stats.health;
        this.stats.attack = characterProfile.stats.attack;
    },
    attackOpponent: function() {
        currentAttack = this.stats.attack;
        this.stats.attack += this.stats.experience;

        return currentAttack;
    },
    reset: function(characterProfile) {
        this.stats.health = characterProfile.stats.health;
    }
};

var opponent = {
    id: "",
    name: "",
    stats: {
        health: 0,
        attack: 0,
        counter: 0,
        experience: 0
    },
    select: function(input, characterProfile) {
        this.id = input;
        this.name = characterProfile.name;
        this.stats.health = characterProfile.stats.health;
        this.stats.counter = characterProfile.stats.counter;
    },
    counterAttack: function() {
        currentCounter = this.stats.counter;
    }
}

game.status = "select player character";

// This function is run whenever user clicks a hero
$(".hero").on("click", function () {

    var input = $(this).attr("data-value");

    // Selects player character and opponent only once
    if (game.status === "select player character") {
        
        player.select(input, characters.list[input]);
        characters.activate(input);
        characters.assignRoles(input);
        game.status = "select opponent";
        console.log(player);
    }
    else if (game.status === "select opponent") {
        opponent.select(input, characters.list[input]);
        characters.activate(input);
        game.status = "match start";
        console.log(opponent);
    }
    else {
        console.log("Character select failed");
    }

    if (game.status === "match start") {
        game.status = "match in progress";
    }

    console.log(characters);
});

$(".action").on("click", function () {
    if (game.status === "match in progress") {
        opponent.stats.health -= player.attackOpponent(); // Add limit so health cannot be < 0

        winConditions = game.win(opponent.id, opponent.stats.health);

        if (winConditions === true) {
            player.reset(characters.list[player.id]);
            game.status = "select opponent"; // State needs to be created
        }
        else {
            player.stats.health -= opponent.stats.counter; // Add limit so health cannot be < 0

            if (player.stats.health <= 0) {
                game.status = "defeated";

                console.log("Defeated");
            }
        }
        
        console.log(player.name + " HP: " + player.stats.health);
        console.log(opponent.name + " HP: " + opponent.stats.health);
        console.log(game);
    }
});