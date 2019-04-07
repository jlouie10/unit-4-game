$(document).ready(function () {

    // *********************
    // * Declare variables *
    // *********************

    var game = {
        status: "select player character", // possible states: select player character, play match, game over
        round: 1,
        determineWin: function (health, numberOfCharacters) {
            if (health <= 0) {

                if (this.round === (numberOfCharacters - 1)) {
                    this.status = "game over";
                }
                else {
                    this.status = "select opponent";
                }

                this.round++;

                return true;
            }
            else {
                return false;
            }
        }
    };

    var display = {
        initialize: function () {
            $("#character-select").addClass("hide");
            $("#arena").addClass("hide");
            $("#game-over").addClass("hide");
            $("#credits").addClass("hide");
        },
        selectionScreen: {
            fill: function (obj, characterAvatar, instance) { // Method for displaying the character selection screen
                var i;

                // Initialize display
                obj.initialize(); // scope changed when function is embedded in the selectionScreen property of display

                $("#character-select").removeClass("hide");

                // Fill the character menu
                if (instance === 1) {
                    for (i = 1; i <= characterAvatar.length; i++) {
                        var startString = "pos-";
                        var endString = "#" + startString + i;

                        $("#" + startString + i).html(characterAvatar[i - 1]);
                        $("#" + startString + i + " .hero").addClass("select");
                    }
                }
            },
            grayOut: function (id) {
                $("#" + id).removeClass("select");
                $("#" + id).addClass("remove");
    
                // add border to enemies
            }
        },
        arena: {
            fill: function(obj, playerAvatar, opponentAvatar) {
                obj.initialize();

                $("#arena").removeClass("hide");
                $("#player").html(playerAvatar);
                $("#opponent").html(opponentAvatar);
            },
            update: function(who, hp) {
                $("#" + who + "-hp").remove();
                $("#" + who + " .hero").append("<div id='" + who + "-hp'>" + hp + "</div>");
            }
        },
        gameOver: function() {
            this.initialize();

            $("#game-over").removeClass("hide");
        },
        credits: function () { // Method for displaying the credits screen
            this.initialize();

            $("#credits").removeClass("hide");
        }
    };

    var characters = {
        list: { // List of playable characters
            ironman: {
                name: "Iron Man",
                id: "ironman",
                stats: {
                    health: 100,
                    attackPower: 10,
                    counterAttackPower: 15,
                    experience: 2
                },
                avatar: "<div id='ironman' class='hero' data-value='ironman'><img src='assets/images/ironman.jpg' alt='Iron Man' /></div>"
            },
            captainAmerica: {
                name: "Captain America",
                id: "captain-america",
                stats: {
                    health: 75,
                    attackPower: 15,
                    counterAttackPower: 5,
                    experience: 1,
                },
                avatar: "<div id='captain-america' class='hero' data-value='captainAmerica'><img src='assets/images/captain_america.jpg' alt='Captain America' /></div>"
            },
            spiderman: {
                name: "Spider Man",
                id: "spiderman",
                stats: {
                    health: 50,
                    attackPower: 5,
                    counterAttackPower: 15,
                    experience: 5,
                },
                avatar: "<div id='spiderman' class='hero' data-value='spiderman'><img src='assets/images/spiderman.jpg' alt='Spider Man' /></div>"
            },
            hulk: {
                name: "Hulk",
                id: "hulk",
                stats: {
                    health: 200,
                    attackPower: 20,
                    counterAttackPower: 10,
                    experience: 1,
                },
                avatar: "<div id='hulk' class='hero' data-value='hulk'><img src='assets/images/hulk.jpg' alt='Hulk' /></div>"
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
        }//,
        // assignRoles: function (input) { // Method for assigning roles to all characters
        //     var keys = Object.keys(this.list);
        //     var i;

        //     for (i = 0; i < keys.length; i++) {
        //         if (keys[i] === input) {

        //             // Assign your role as Avenger
        //             this.list[keys[i]].role = "avenger";
        //         }
        //         else {

        //             // Assign all other characters as villains
        //             this.list[keys[i]].role = "villain";
        //         }
        //     }
        // }
    };

    var player = {
        id: "",
        key: "",
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
        name: "",
        stats: {
            health: 0,
            attackPower: 0,
            counterAttackPower: 0,
            experience: 0
        },
        avatar: "",
        select: function (profile) { // Method to assign a character to opponent
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
    display.selectionScreen.fill(display, characters.getAvatar(), 1);

    // *****************
    // * Define events *
    // *****************

    // This function is run whenever player clicks a hero
    // Used event delegation to removeClass select
    // Resources:  https://stackoverflow.com/questions/28108736/jquery-click-function-still-works-after-removeclass
    $(document).on("click", ".select", function () {

        var input = $(this).attr("data-value");

        // Selects player character and opponent only once
        if (game.status === "select player character") {

            player.select(input, characters.list[input]);
            display.selectionScreen.grayOut(characters.list[input].id);
            game.status = "select opponent";

            // console.log(player);
        }
        else if (game.status === "select opponent") {
            opponent.select(characters.list[input]);
            display.selectionScreen.grayOut(characters.list[input].id);
            game.status = "play match";
            display.arena.fill(display, player.avatar, opponent.avatar);

            display.arena.update("player", player.stats.health);
            display.arena.update("opponent", opponent.stats.health);

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
    $("#action").on("click", function () {

        // Only execute contents during a match
        if (game.status === "play match") {
            opponent.stats.health -= player.attack(); // Add limit so health cannot be < 0
            display.arena.update("opponent", opponent.stats.health);
            winConditions = game.determineWin(opponent.stats.health, characters.total());

            if (winConditions === true) {
                player.reset(characters.list[player.id]);

                if (game.status === "game over") {
                    display.credits();
                }
                else {
                    game.status = "select opponent";
                    display.selectionScreen.fill(display, characters.getAvatar(), 2);
                }
            }
            else {
                player.stats.health -= opponent.stats.counterAttackPower; // Add limit so health cannot be < 0
                display.arena.update("player", player.stats.health);

                if (player.stats.health <= 0) {
                    game.status = "game over";
                    display.gameOver();
                }
            }

            console.log(player);
            console.log(opponent);

            // console.log(player.name + " HP: " + player.stats.health);
            // console.log(opponent.name + " HP: " + opponent.stats.health);
            // console.log(game);
        }
    });

    $("#reset").on("click", function () {
        initialize();
        display.selectionScreen.fill(display, characters.getAvatar(), 1);
    });

    function initialize() {
        game.status = "select player character";
        game.round = 1;
    };
});