/* globals __DEV__ */
import Phaser from 'phaser'

export default class extends Phaser.State {
    init () {
        var pitch, ball, bat, cursors, stump
    }

    preload () {}

    create () {
        //Start Physics
        game.physics.startSystem(Phaser.Physics.ARCADE);

        //Create pitch
        this.pitch = game.add.sprite(0, 500, 'pitch');
        this.pitch.scale.setTo(2, 2);
        game.physics.arcade.enable(this.pitch);
        this.pitch.body.immovable = true;
        this.pitch.allowGravity = false;

        //Create bat
        this.bat = game.add.sprite(150, 300, 'bat', 'bat00');
        this.bat.scale.setTo(0.9, 0.9);
        game.physics.arcade.enable(this.bat);
        this.bat.body.immovable = true;
        this.bat.allowGravity = false;
        this.bat.body.collideWorldBounds = true;
        this.bat.animations.add('hit');


        //Create stump
        this.stump = game.add.sprite(0, 340, 'stump');
        this.stump.scale.setTo(0.1, 0.1);

        //Create ball
        this.createBall();

        this.cursors = game.input.keyboard.createCursorKeys();

    }

    update () {
        let ballHitGround = game.physics.arcade.collide(this.ball, this.pitch);
        let ballHitBat = game.physics.arcade.collide(this.ball, this.bat);
        let batHitGround = game.physics.arcade.collide(this.bat, this.pitch);

        if(game.input.keyboard.isDown(Phaser.KeyCode.SPACEBAR)) {
            this.ball.destroy();
            this.createBall();
        }
        if(game.input.activePointer.isDown) {
            this.bat.animations.play('hit', 10);
        }

        //Bat movement
        this.bat.body.velocity.y = 0;
        if (this.cursors.up.isDown || game.input.keyboard.isDown(Phaser.KeyCode.W)) {
            this.bat.body.velocity.y = -150;
    	}
    	else if (this.cursors.down.isDown || game.input.keyboard.isDown(Phaser.KeyCode.S) ) {
    		this.bat.body.velocity.y = 150;
    	}
        //Stop bat from going below the ground
        if(batHitGround && this.cursors.down.isDown) {
            this.bat.body.velocity.y = 0;
        }

        if(ballHitBat) {
            this.ball.body.velocity.x = 500;
            this.ball.body.velocity.y = -500;
            ballHitBat = 0;
        }

    }

    createBall() {
        //Create ball
        let randomVelocity = -Math.floor(Math.random() * (700 - 400) + 400);
        this.ball = game.add.sprite(1050, 300, 'ball');
        this.ball.scale.setTo(0.3, 0.3);
        game.physics.arcade.enable(this.ball);
        this.ball.body.bounce.set(1);
        this.ball.body.gravity.y = 300;
        this.ball.body.velocity.setTo(randomVelocity, 30);
    }

}
