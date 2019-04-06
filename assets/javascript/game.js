$(document).ready(function () {

    // *********************
    // * Declare variables *
    // *********************

    var game = {
        status: "select player character", // character selection: [ select player character, select opponent ]
        mode: "easy",
        round: 1,
        defeated: [],
        determineWin: function (id, health, numberOfCharacters) { // Method for determining a player win
            if (health <= 0) {
                this.defeated[this.round - 1] = id;

                if (this.defeated.length === (numberOfCharacters - 1)) {
                    this.status = "game over";
                    console.log("You have won the Infinity Gauntlet")
                }
                else {
                    this.status = "select opponent";
                }

                this.round++;

                console.log("Won");
                console.log(this.status);

                return true;
            }
            else {
                return false;
            }
        }
    };

    var display = {
        status: "character selection", // [ character selection, arena, credits ]
        initialize: function () {
            $("#character-select").addClass("hide");
            $("#arena").addClass("hide");
            $("#credits").addClass("hide");
        },
        selectionScreen: function (characterAvatar, instance) { // Method for displaying the character selection screen
            var i;

            // Initialize display
            this.initialize();

            $("#character-select").removeClass("hide");

            // Fill the character menu
            if (instance === 1) {
                for (i = 1; i <= characterAvatar.length; i++) {
                    var startString = "pos-";
                    var endString = "#" + startString + i;
    
                    $(endString).html(characterAvatar[i - 1]);
                }
            }
        },
        arena: function (playerAvatar, opponentAvatar) { // Method for displaying the arena screen
            var i;
            
            this.initialize();

            $("#arena").removeClass("hide");
            $("#player").html(playerAvatar);
            $("#opponent").html(opponentAvatar);
        },
        credits: function () { // Method for displaying the credits screen
            this.initialize();

            $("#credits").removeClass("hide");
            $("#player").html("<div>Congrats, you have won the Infinity Gauntlet</div>");
        }
    };

    var characters = { // Deprecate role and active
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
                avatar: "<div id='ironman' class='hero' data-value='ironman'><span>Iron Man</span></div>"
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
                avatar: "<div id='captain-america' class='hero' data-value='captainAmerica'><span>Captain America</span></div>"
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
                avatar: "<div id='spiderman' class='hero' data-value='spiderman'><span>Spider Man</span></div>"
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
                avatar: "<div id='hulk' class='hero' data-value='hulk'><span>Hulk</span></div>"
            }
        },
        total: function () {
            var keys = Object.keys(this.list);

            return keys.length;
        },
        getAvatar: function () {
            var keys = Object.keys(this.list);
            var i;
            var characterAvatar = [];

            for (i = 0; i < keys.length; i++) {
                characterAvatar[i] = this.list[keys[i]].avatar;
            }

            return characterAvatar;
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
        avatar: "",
        select: function (input, profile) { // Method to assign a character to player
            this.id = input;
            this.name = profile.name;
            this.stats.health = profile.stats.health;
            this.stats.attackPower = profile.stats.attackPower;
            this.stats.experience = profile.stats.experience;
            this.avatar = profile.avatar;
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
        avatar: "",
        select: function (input, profile) { // Method to assign a character to opponent
            this.id = input;
            this.name = profile.name;
            this.stats.health = profile.stats.health;
            this.stats.counterAttackPower = profile.stats.counterAttackPower;
            this.avatar = profile.avatar;
        },
    };

    // *********************
    // * Execute Functions *
    // *********************

    // When the page loads, display the selection screen
    display.selectionScreen(characters.getAvatar(), 1);

    // *****************
    // * Define events *
    // *****************

    // This function is run whenever player clicks a hero
    $(".hero").on("click", function () {

        console.log("clicked");

        var input = $(this).attr("data-value");

        // Selects player character and opponent only once
        if (game.status === "select player character") {

            player.select(input, characters.list[input]);
            characters.activate(input);
            characters.assignRoles(input);
            game.status = "select opponent";

            // console.log(player);
        }
        else if (game.status === "select opponent") {
            opponent.select(input, characters.list[input]);
            characters.activate(input);
            game.status = "play match";

            display.arena(player.avatar, opponent.avatar);

            // console.log(opponent);
            console.log(player);
            console.log(opponent);
        }
        else {
            console.log("Character select failed");
        }

        // console.log(characters);
    });

    // This function is run whenever player clicks attack
    $(".action").on("click", function () {

        // Only execute contents during a match
        if (game.status === "play match") {
            opponent.stats.health -= player.attack(); // Add limit so health cannot be < 0
            winConditions = game.determineWin(opponent.id, opponent.stats.health, characters.total());

            if (winConditions === true) {
                player.reset(characters.list[player.id]);

                if (game.status === "game over") {
                    display.credits();
                }
                else {
                    game.status = "select opponent";
                    display.selectionScreen(characters.getAvatar(), 2);   
                }
            }
            else {
                player.stats.health -= opponent.stats.counterAttackPower; // Add limit so health cannot be < 0

                if (player.stats.health <= 0) {
                    game.status = "game over";

                    console.log("Defeated");
                }
            }

            console.log(player);
            console.log(opponent);

            // console.log(player.name + " HP: " + player.stats.health);
            // console.log(opponent.name + " HP: " + opponent.stats.health);
            // console.log(game);
        }
    });
});