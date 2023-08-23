new Vue({
    el: "#app",
    data: {
        player_health: 100,
        monster_health: 100,
        game_is_on: false,
        attack_multiple: 10,
        special_attack_multiple: 25,
        monster_attack_multiple: 15,
        heal_up_multiple: 20,
        log_text: {
            attack: "Player Attack: ",
            special_attack: "Player Special Attack: ",
            heal_up: "Player Heal Up Point: ",
            monster_attack: "Monster Attack: ",
            give_up: "Player give Up! ",
        },
        logs: [],
        game_result: "",
    },
    methods: {
        start_game: function () {
            this.game_is_on = true;
        },
        attack: function () {
            let point = Math.ceil(Math.random() * this.attack_multiple);
            this.monster_health -= point;
            this.add_to_log({ turn: "p", text: this.log_text.attack + point, action: "attack" });
            this.monster_attack();
        },
        special_attack: function () {
            let point = Math.ceil(Math.random() * this.special_attack_multiple);
            this.monster_health -= point;
            this.add_to_log({ turn: "p", text: this.log_text.special_attack + point, action: "special-attack" });
            this.monster_attack();
        },
        heal_up: function () {
            let point = Math.ceil(Math.random() * this.heal_up_multiple);
            this.player_health += point;
            this.add_to_log({ turn: "p", text: this.log_text.heal_up + point, action: "heal" });
            this.monster_attack();
        },
        give_up: function () {
            this.player_health = 0;
            this.add_to_log({ turn: "p", text: this.log_text.give_up, action: "give-up" });
        },
        monster_attack: function () {
            let point = Math.ceil(Math.random() * this.monster_attack_multiple);
            this.player_health -= point;
            this.add_to_log({ turn: "m", text: this.log_text.monster_attack + point, action: "monster-attack" });
        },
        add_to_log: function (log) {
            this.logs.push(log);
        },
        win_game: function () {
            this.game_result = "You Win!";
            this.game_is_on = false;
        },
        lose_game: function () {
            this.player_health = 0;
            this.game_result = "You Lose!";
            this.game_is_on = false;
        },
        reset_game: function () {
            this.player_health = 100;
            this.monster_health = 100;
            this.logs = [];
            this.game_result = "";
            this.game_is_on = true;
        },
    },
    watch: {
        player_health: function (value) {
            if (value <= 0) {
                this.player_health = 0;
                this.lose_game();
            } else if (value >= 100) {
                this.player_health = 100;
            }
        },
        monster_health: function (value) {
            if (value <= 0) {
                this.monster_health = 0;
                this.win_game();
            }
        },
    },
    computed: {
        player_progress: function () {
            return {
                width: this.player_health + "%",
            };
        },
        monster_progress: function () {
            return {
                width: this.monster_health + "%",
            };
        },
    },
});
