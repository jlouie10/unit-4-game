
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
    choose: function (type, option) { // Method for choosing your character
        if (type === "player") {
            game.player.name = this.list[option].name;
            game.player.stats.health = this.list[option].stats.health;
            game.player.stats.attack = this.list[option].stats.attack;
            this.assignRoles(option);
            this.list[option].active = true;
        }
        else { // Choose opponent
            game.computer.name = this.list[option].name;
            game.computer.stats.health = this.list[option].stats.health;
            this.list[option].active = true;
        }
    },
    assignRoles: function (choice) { // Method for assigning roles to all characters
        var keys = Object.keys(this.list);

        for (i = 0; i < keys.length; i++) {
            if (keys[i] === choice) {

                // Assign your role as Avenger
                this.list[keys[i]].role = "avenger";
            }
            else {

                // Assign all other characters as villains
                this.list[keys[i]].role = "villain";
            }
        }
    },
    action: function () {
        game.computer.stats.health -= game.player.stats.attack;
        if (game.computer.stats.health <= 0) {
            game.status = "won";
            game.defeated[game.round - 1] = game.computer.id;
            game.status = "select opponent"; // State needs to be created
        }
        else {
            game.player.stats.health -= this.list[game.computer.id].stats.counter;
            if (game.player.stats.health <= 0) {
                game.status = "defeated";
            }
        }
        game.player.stats.attack += this.list[game.player.id].stats.experience;
    }
};