$(document).ready(function () {
var abc = 1;
    var game = {
        status: "select character",
        player: {
            id: "",
            name: "",
            stats: {
                health: 0,
                healthTotal: 0,
                attackPower: 0,
                counterAttackPower: 0,
                experience: 0
            },
            selected: false,
        },
        opponent: {
            id: "",
            name: "",
            stats: {
                health: 0,
                healthTotal: 0,
                attackPower: 0,
                counterAttackPower: 0,
                experience: 0
            },
            selected: false
        },
        defeated: 0, // Tracks characters player has defeated
        getCharacter: function (who, id, name, hp, ap, cap, xp) {
            this[who].id = id;
            this[who].name = name;
            this[who].stats.health = hp;
            this[who].stats.healthTotal = hp;
            this[who].stats.attackPower = ap;
            this[who].stats.counterAttackPower = cap;
            this[who].stats.experience = xp;
            this[who].selected = true;
        },
        determineWin: function (health, total, defeated) {
            if (health <= 0) {

                this.defeated++;

                if (this.defeated === (total - 1)) {
                    this.status = "game over";
                }
                else {
                    this.status = "select character";
                }

                return true;
            }
            else {
                return false;
            }
        },
        performAction: function (action) {
            if (action === "attack") {
                var currentAttack = this.player.stats.attackPower;
                this.player.stats.attackPower += this.player.stats.experience;

                return currentAttack;
            }
        },
        reset: function (type, health) {
            if (type === "player") {
                this.player.stats.health = health;
                this.opponent.selected = false;
            }
            else if (type === "game") {
                this.status = "select character";

                this.player.selected = false;
                this.opponent.selected = false;
                this.defeated = 0;
            }
        }
    };

    var display = {
        characterSelection: function () {
            $("#arena").addClass("hide");
            $("#character-select").removeClass("hide").addClass("animated zoomIn");
        },
        updateSelectedCharacter: function (id) { // Removes selected characters as options from the character menu
            $("#" + id).removeClass("select").addClass("remove");
        },
        arena: function () {
            $("#character-select").addClass("hide");
            $("#arena").removeClass("hide").addClass("animated zoomIn");;
        },
        updateModel: function (who, name, hp, hpt, model) { // Model is initialized once per round
            $("#" + who + "-name").html(name);
            $("#" + who + "-hp").html("HP: " + hp + " / " + hpt);
            $("#" + who + "-model").html(model);
            $("#" + who + "-combat-text").html("");
        },
        updateFrame: function (who, hp, hpt, damage) { // Health and combat text are updated
            $("#" + who + "-hp").html("HP: " + hp + " / " + hpt);
            $("#" + who + "-combat-text").html("<div class='animated fadeInUp'>" + damage + "</div>"); // creating a div resolved issue with Animate.css
        },
        removePulse: function() {
            $("#attack").removeClass("animated infinite pulse delay-3s");
        },
        gameOver: function () {
            $("#arena").addClass("hide");
            $("#game-over").removeClass("hide").addClass("animated fadeInDown");
        },
        credits: function () {
            $("#arena").addClass("hide");
            $("#credits").removeClass("hide").addClass("animated fadeInUp");
        },
        reset: function () {
            $("#game-over").addClass("hide");
            $("#credits").addClass("hide");

            $("#character-menu .col-3 div").addClass("select").removeClass("remove");

            this.characterSelection();
        }
    };

    var character = {
        ironman: {
            id: "ironman",
            name: "Iron Man",
            stats: {
                health: 50,
                attackPower: 4,
                counterAttackPower: 5,
                experience: 2
            },
            role: "",
            model: "<img src='assets/images/ironman_model.png' alt='Iron Man' />"
        },
        captainAmerica: {
            id: "captain-america",
            name: "Captain America",
            stats: {
                health: 125,
                attackPower: 2,
                counterAttackPower: 6,
                experience: 1
            },
            role: "",
            model: "<img src='assets/images/captain_america_model.png' alt='Captain America' />"
        },
        blackWidow: {
            id: "black-widow",
            name: "Black Widow",
            stats: {
                health: 50,
                attackPower: 5,
                counterAttackPower: 8,
                experience: 3
            },
            role: "",
            model: "<img src='assets/images/black_widow_model.png' alt='Black Widow' />"
        },
        hulk: {
            id: "hulk",
            name: "Hulk",
            stats: {
                health: 100,
                attackPower: 10,
                counterAttackPower: 10,
                experience: 0
            },
            role: "",
            model: "<img src='assets/images/hulk_model.png' alt='Hulk' />"
        }
    };

    $(document).on("click", ".select", function () {

        if (game.status === "select character") {

            var key = $(this).attr("data-value");

            if (game.player.selected === false) {

                // Select player character
                game.getCharacter("player", key,
                    character[key].name,
                    character[key].stats.health,
                    character[key].stats.attackPower,
                    character[key].stats.counterAttackPower,
                    character[key].stats.experience);

                // Update player model in the arena
                display.updateModel("player",
                    character[key].name,
                    character[key].stats.health,
                    character[key].stats.health,
                    character[key].model);

                message("Please select your opponent");
            }
            else {

                // Select opponent
                game.getCharacter("opponent", key,
                    character[key].name,
                    character[key].stats.health,
                    character[key].stats.attackPower,
                    character[key].stats.counterAttackPower,
                    character[key].stats.experience);

                // Update opponent model in the arena
                display.updateModel("opponent",
                    character[key].name,
                    character[key].stats.health,
                    character[key].stats.health,
                    character[key].model);

                game.status = "play match";
                display.arena();

                message(game.player.name + ", get ready to attack " + game.opponent.name);
            }

            // Removes selection from character menu
            display.updateSelectedCharacter(character[key].id);
        }
    });

    $("#attack").on("click", function () {

        if (game.status === "play match") {

            var attack = game.performAction("attack");
            var keys = Object.keys(character);

            game.opponent.stats.health -= attack;

            if (game.opponent.stats.health < 0) {
                game.opponent.stats.health = 0;
            }

            winConditions = game.determineWin(game.opponent.stats.health, keys.length);

            display.updateFrame("opponent",
                game.opponent.stats.health,
                game.opponent.stats.healthTotal,
                attack);

            if (winConditions === true) {

                if (game.status === "game over") {
                    display.credits();
                }
                else {
                    game.reset("player", character[game.player.id].stats.health);

                    display.updateFrame("player",
                        game.player.stats.health,
                        game.player.stats.healthTotal,
                        "");

                    display.characterSelection();
                }
            }
            else {
                game.player.stats.health -= game.opponent.stats.counterAttackPower;

                if (game.player.stats.health < 0) {
                    game.player.stats.health = 0;
                }

                display.updateFrame("player",
                    game.player.stats.health,
                    game.player.stats.healthTotal,
                    -game.opponent.stats.counterAttackPower);

                if (game.player.stats.health <= 0) {
                    game.status = "game over";
                    display.gameOver();
                }
                else {
                    message(game.player.name +
                        " attacked " +
                        game.opponent.name +
                        " for " +
                        attack +
                        ", and " +
                        game.opponent.name +
                        " countered for " +
                        game.opponent.stats.counterAttackPower +
                        ".");
                }
            }

            display.removePulse();
        }
    });

    $(".reset").on("click", function () {
        game.reset("game");
        display.reset();
    });

    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    })

    // This function displays a helpful message to the player
    function message(msg) {
        $("#log-message").html("<span>" + msg + "</span>");
    }
});