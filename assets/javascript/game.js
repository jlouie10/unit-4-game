$(document).ready(function () {
    // *********************
    // * Declare variables *
    // *********************

    var game = {
        status: "select player character", // character selection: [ select player character, select opponent ]
        mode: "easy", // Use for expansion
        round: 1, // Tracks place in gauntlet
        defeated: [], // List of defeated opponents
        initialize: function () {
        },
        determineWin: function (id, health) { // Method for determining a player win
            if (health <= 0) {
                this.defeated[this.round - 1] = id;

                if (this.defeated.length === 3) { // This should be a calculated value
                    this.status = "game over";
                    console.log("You have won the Infinity Gauntlet")
                }

                this.round++;

                console.log("Won");

                return true;
            }
            else {
                return false;
            }
        }
    };

    var display = {
        status: "character selection", // [ character selection, arena, credits ]
        selectionScreen: function (total, html1, html2, html3, html4) { // Method for displaying the character selection screen
            var title = "<div class='row'><div class='col-12'><span class='label'>Character Select Area</span></div></div>";
            var characterMenu = "<div class='row'><div id='pos-1' class='col-3'></div><div id='pos-2' class='col-3'></div><div id='pos-3' class='col-3'></div><div id='pos-4' class='col-3'></div></div>";
            var html = [html1, html2, html3, html4];
            var i;

            $("#arena").empty();

            $("#character-select").append(title);
            $("#character-select").append(characterMenu);

            for (i = 1; i <= total; i++) {
                var startString = "pos-";
                var endString = "#" + startString + i;

                $(endString).append(html[i-1]);
            }
        },
        arena: function () { // Method for displaying the arena screen
            $("#character-select").empty();
        },
        credits: function () { // Method for displaying the credits screen
            
        }
    };

    var characters = {
        list: { // List of playable characters
            ironman: {
                name: "Iron Man",
                stats: {
                    health: 100,
                    attackPower: 10,
                    counterAttackPower: 15,
                    experience: 2
                },
                role: "none", // { none, avenger, villain }
                active: false,
                html: function () {
                    var frame = "<div id='ironman' class='hero' data-value='ironman'><span>Iron Man</span></div>";

                    return frame;
                }
            },
            captainAmerica: {
                name: "Captain America",
                stats: {
                    health: 75,
                    attackPower: 15,
                    counterAttackPower: 5,
                    experience: 1,
                },
                role: "none",
                active: false,
                html: function () {
                    var frame = "<div id='captain-america' class='hero' data-value='captainAmerica'><span>Captain America</span></div>";

                    return frame;
                }
            },
            spiderman: {
                name: "Spider Man",
                stats: {
                    health: 50,
                    attackPower: 5,
                    counterAttackPower: 15,
                    experience: 5,
                },
                role: "none",
                active: false,
                html: function () {
                    var frame = "<div id='spiderman' class='hero' data-value='spiderman'><span>Spider Man</span></div>";

                    return frame;
                }
            },
            hulk: {
                name: "Hulk",
                stats: {
                    health: 200,
                    attackPower: 20,
                    counterAttackPower: 10,
                    experience: 1,
                },
                role: "none",
                active: false,
                html: function () {
                    var frame = "<div id='hulk' class='hero' data-value='hulk'><span>Hulk</span></div>";

                    return frame;
                }
            }
        },
        getTotal: function () { // Method for calculating total characters 
            var keys = Object.keys(this.list);

            return keys.length;
        },
        activate: function (input) { // Method for activating a character, activated characters appear in the arena
            this.list[input].active = true;
        },
        assignRoles: function (input) { // Method for assigning roles to all characters
            var keys = Object.keys(this.list);
            var i;

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
            attackPower: 0,
            counterAttackPower: 0,
            experience: 0
        },
        select: function (input, profile) { // Method to assign a character to player
            this.id = input;
            this.name = profile.name;
            this.stats.health = profile.stats.health;
            this.stats.attackPower = profile.stats.attackPower;
        },
        attack: function () { // Method to attack opponent
            var currentAttack = this.stats.attackPower;
            this.stats.attackPower += this.stats.experience;

            return currentAttack;
        },
        reset: function (profile) { // Method to restore health when a round is won
            this.stats.health = profile.stats.health;
        }
    };

    var opponent = {
        id: "",
        name: "",
        stats: {
            health: 0,
            attackPower: 0,
            counterAttackPower: 0,
            experience: 0
        },
        select: function (input, profile) { // Method to assign a character to opponent
            this.id = input;
            this.name = profile.name;
            this.statshealth = profile.stats.health;
            this.stats.counterAttackPower = profile.stats.counterAttackPower;
        },
    };

    // *********************
    // * Execute Functions *
    // *********************

    display.selectionScreen(characters.getTotal(), characters.list.ironman.html, characters.list.captainAmerica.html, characters.list.spiderman.html, characters.list.hulk.html); // Need to abstract inputs

    // *****************
    // * Define events *
    // *****************

    // This function is run whenever player clicks a hero
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
            game.status = "play match";

            console.log(opponent);
        }
        else {
            console.log("Character select failed");
        }

        console.log(characters);
    });

    // This function is run whenever player clicks attack
    $(".action").on("click", function () {

        // Only execute contents during a match, probably redundant with display.arena()
        if (game.status === "play match") {
            opponent.stats.health -= player.attack(); // Add limit so health cannot be < 0
            winConditions = game.determineWin(opponent.id, opponent.stats.health);

            if (winConditions === true) {
                player.reset(characters.list[player.id]);
                game.status = "select opponent";
            }
            else {
                player.stats.health -= opponent.stats.counterAttackPower; // Add limit so health cannot be < 0

                if (player.stats.health <= 0) {
                    game.status = "game over";

                    console.log("Defeated");
                }
            }

            console.log(player.name + " HP: " + player.stats.health);
            console.log(opponent.name + " HP: " + opponent.stats.health);
            console.log(game);
        }
    });
});