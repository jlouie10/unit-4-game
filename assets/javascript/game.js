// Declare variables
var game = {
    status: "start",
    difficulty: "easy",
    round: 1,
    player: {
        id: "",
        name: "",
        stats: {
            health: 0,
            attack: 0
        }
    },
    computer: {
        id: "",
        name: "",
        stats: {
            health: 0
        }
    },
    defeated: [],
    new: function () {

    }
}

game.status = "select hero";

// This function is run whenever user clicks a hero
$(".hero").on("click", function () {

    if (game.status === "select hero") {
        game.player.id = $(this).attr("data-value");
        character.choose("player", game.player.id);
        game.status = "select opponent";
    }
    else if (game.status === "select opponent") {

        // Make sure a different hero is chosen as the opponent
        if (game.player.id !== $(this).attr("data-value")) {
            game.computer.id = $(this).attr("data-value");
            character.choose("opponent", game.computer.id);
            game.status = "match in progress";
        }
    }
});

$(".action").on("click", function () {
    if (game.status === "match in progress") {
        character.action();
    }

    console.log(game);
    // console.log(you);
    // console.log(opponent);
});