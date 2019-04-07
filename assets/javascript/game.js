$(document).ready(function () {

    // *********************
    // * Declare variables *
    // *********************

    var game = {
        status: "select player character", // present state of the game { select character (player, opponent), play match, game over }
        round: 1,
        determineWin: function (health, charactersTotal) {
            if (health <= 0) {

                if (this.round === (charactersTotal - 1)) {
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
            fill: function (obj, characterAvatar, state) { // Fills the character menu, used to dynamically add characters to each screen
                var i;

                obj.initialize(); // Scope changed, so the display object needs to be passed to this function

                $("#character-select").removeClass("hide");

                if (state === "select player character") { // Do once to retain properties
                    for (i = 1; i <= characterAvatar.length; i++) {
                        
                        // pos describes the character menu position
                        $("#pos-" + i).html(characterAvatar[i - 1]);
                        $("#pos-" + i + " .hero").addClass("select");
                    }
                }
            },
            selected: function (id) {
                $("#" + id).removeClass("select");
                $("#" + id).addClass("remove");
            }
        },
        arena: {
            fill: function(obj, playerModel, opponentModel, playerHealth, opponentHealth) {
                obj.initialize();

                $("#arena").removeClass("hide");
                $("#player").html(playerModel);
                $("#player").prepend("<div id='player-combat-text'><span></span></div>");
                $("#player").append("<div id='player-hp'><span>HP: " + playerHealth + "</span></div>"); // Fix for deleting #player-hp
                $("#opponent").html(opponentModel);
                $("#opponent").prepend("<div id='opponent-combat-text'><span></span></div>");
                $("#opponent").append("<div id='opponent-hp'><span>HP: " + opponentHealth + "</span></div>"); // Fix for deleting #opponent-hp
            },
            update: function(who, hp, ap) {
                $("#" + who + "-combat-text").html("<span>" + ap + "</span>");
                $("#" + who + "-hp").html("<span>HP: " + hp + "</span>");
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
        list: {
            ironman: {
                name: "Iron Man",
                id: "ironman",
                stats: {
                    health: 100,
                    attackPower: 10,
                    counterAttackPower: 15,
                    experience: 2
                },
                avatar: "<div id='ironman' class='hero' data-value='ironman'><img src='assets/images/ironman_avatar.jpg' alt='Iron Man' /></div>",
                model: "<img src='assets/images/ironman_model.jpg' alt='Iron Man' /><div class='font-avengers'><span>Iron Man</span></div>"
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
                avatar: "<div id='captain-america' class='hero' data-value='captainAmerica'><img src='assets/images/captain_america_avatar.jpg' alt='Captain America' /></div>",
                model: "<img src='assets/images/captain_america_model.jpg' alt='Captain America' /><div class='font-avengers'><span>Captain America</span></div>"
            },
            blackWidow: {
                name: "Black Widow",
                id: "black-widow",
                stats: {
                    health: 50,
                    attackPower: 5,
                    counterAttackPower: 15,
                    experience: 5,
                },
                avatar: "<div id='black-widow' class='hero' data-value='blackWidow'><img src='assets/images/black_widow_avatar.jpg' alt='Black Widow' /></div>",
                model: "<img src='assets/images/black_widow_model.jpg' alt='Black Widow' /><div class='font-avengers'><span>Black Widow</span></div>"
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
                avatar: "<div id='hulk' class='hero' data-value='hulk'><img src='assets/images/hulk_avatar.jpg' alt='Hulk' /></div>",
                model: "<img src='assets/images/hulk_model.jpg' alt='Hulk' /><div class='font-avengers'><span>Hulk</span></div>"
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
        model: "",
        select: function (input, profile) {
            this.id = input;
            this.name = profile.name;
            this.stats.health = profile.stats.health;
            this.stats.attackPower = profile.stats.attackPower;
            this.stats.experience = profile.stats.experience;
            this.model = profile.model;
        },
        attack: function () {
            var currentAttack = this.stats.attackPower;
            this.stats.attackPower += this.stats.experience;

            return currentAttack;
        },
        reset: function (profile) {
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
        model: "",
        select: function (profile) {
            this.name = profile.name;
            this.stats.health = profile.stats.health;
            this.stats.counterAttackPower = profile.stats.counterAttackPower;
            this.model = profile.model;
        },
    };

    // *********************
    // * Execute Functions *
    // *********************

    // When the page loads, display and fill the selection screen
    display.selectionScreen.fill(display, characters.getAvatar(), game.status);

    // *****************
    // * Define events *
    // *****************

    // This function is run whenever player clicks a hero
    // Used event delegation to removeClass select
    // Resources:  https://stackoverflow.com/questions/28108736/jquery-click-function-still-works-after-removeclass
    $(document).on("click", ".select", function () {

        var input = $(this).attr("data-value");

        if (game.status === "select player character") {
            player.select(input, characters.list[input]);

            display.selectionScreen.selected(characters.list[input].id);

            game.status = "select opponent";
        }
        else if (game.status === "select opponent") {
            opponent.select(characters.list[input]);

            display.selectionScreen.selected(characters.list[input].id);

            game.status = "play match";

            display.arena.fill(display, player.model, opponent.model, player.stats.health, opponent.stats.health);
        }
    });

    // This function is run whenever player clicks attack
    $("#action").on("click", function () {

        // Only execute contents during a match
        if (game.status === "play match") {
            var attack = player.attack()

            opponent.stats.health -= attack; // Add limit so health cannot be < 0
            
            display.arena.update("opponent", opponent.stats.health, attack);

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
                
                display.arena.update("player", player.stats.health, -opponent.stats.counterAttackPower);

                if (player.stats.health <= 0) {
                    game.status = "game over";
                    display.gameOver();
                }
            }
        }
    });

    $(".reset").on("click", function () {
        initialize();
        display.selectionScreen.fill(display, characters.getAvatar(), game.status);
    });

    function initialize() {
        game.status = "select player character";
        game.round = 1;
    };
});