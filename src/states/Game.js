/* globals __DEV__ */
import Phaser from 'phaser'

export default class extends Phaser.State {
    init () {
        var batter, bowler, ball, stump, cursors, updateDelay, hitPlayer
    }
    preload () {}

    create () {
        //Initialize Physics
        game.physics.startSystem(Phaser.Physics.ARCADE);

        game.add.sprite(0, 0, 'pitch');

        this.batter = game.add.sprite(375, 335, 'batter');
        this.batter.scale.setTo(0.5, 0.5);
        game.physics.arcade.enable(this.batter);

        this.bowler = game.add.sprite(375, 0, 'bowler');
        this.bowler.scale.setTo(0.5, 0.5);
        game.physics.arcade.enable(this.bowler);

        this.stump = game.add.sprite(365, 375, 'stump');
        game.physics.arcade.enable(this.stump);

        this.cursors = game.input.keyboard.createCursorKeys();

        this.updateDelay = 0;
        this.hitPlayer = 0;
        this.moveBowler();
    }

    update () {
        this.batter.body.velocity.x = 0;
        if (this.cursors.left.isDown && this.batter.x >= 320) {
            this.batter.body.velocity.x = -150;
        }
        else if (this.cursors.right.isDown && this.batter.x <= 445) {
            this.batter.body.velocity.x = 150;
        }
        if(this.updateDelay % 100 == 0) {
            //this.moveBowler();
        }
        this.updateDelay++;
    }

    resetBowlerPosition() {
        this.bowler.x = 375;
        this.bowler.y = 0;
    }

    moveBowler() {
        this.resetBowlerPosition();
        this.bowler.body.moveTo(1000, 20 , 90)

        setTimeout(() => {this.throwBall()}, 1200);
    }

    throwBall() {
        let x = this.bowler.x + 15;
        let y = this.bowler.y;
        this.ball = game.add.sprite(x, y, 'ball');
        game.physics.arcade.enable(this.ball);
        this.ball.scale.setTo(0.1, 0.1);
        this.ball.body.velocity.y = Math.floor(Math.random() * 200);
        this.hitPlayer = game.physics.arcade.collide(this.ball, this.batter);
        if(this.hitPlayer) {
            console.log("HI")
        }
    }
}
