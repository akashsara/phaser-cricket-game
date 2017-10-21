/* globals __DEV__ */
import Phaser from 'phaser'

export default class extends Phaser.State {
    init () {
        var pitch, ball, bat, stump, toggleBodyChange, updateDelay;
        var batGroup, stumpGroup, pitchGroup, ballGroup;
        var batCollisionGroup, stumpCollisionGroup, pitchCollisionGroup, ballCollisionGroup, dontCollideGroup;
    }

    preload () {}
    create () {
        // start physics and set world bounds
        game.physics.startSystem(Phaser.Physics.P2JS);
        game.physics.p2.gravity.y = 100;
        game.physics.p2.restitution = 0.8;
        game.physics.p2.setImpactEvents(true);
        game.world.setBounds(0, 0, 1000, 600);

        // create groups
        this.pitchGroup = game.add.group();
        this.batGroup = game.add.group();
        this.ballGroup = game.add.group();
        this.stumpGroup = game.add.group();

        // create collision groups
        this.pitchCollisionGroup = game.physics.p2.createCollisionGroup();
        this.batCollisionGroup = game.physics.p2.createCollisionGroup();
        this.ballCollisionGroup = game.physics.p2.createCollisionGroup();
        this.stumpCollisionGroup = game.physics.p2.createCollisionGroup();
        this.dontCollideGroup = game.physics.p2.createCollisionGroup();

        // create pitch
        this.pitch = this.pitchGroup.create(0, 550, 'pitch');
        this.pitch.scale.setTo(3, 2);
        // pitch physics
        game.physics.p2.enable(this.pitch);
        this.pitch.body.kinematic = true;
        // pitch Collision
        this.pitch.body.setCollisionGroup(this.pitchCollisionGroup);
        this.pitch.body.collides(this.ballCollisionGroup);

        // create bat
        this.bat = this.batGroup.create(150, 370, 'bat');
        // bat physics
        game.physics.p2.enable(this.bat);
        this.bat.body.kinematic = true;
        // bat shape
        this.bat.body.clearShapes();
        this.bat.body.loadPolygon("physics", "bat");
        // bat Collision - set dontCollideGroup since we dont want the bat to collide with the ball by default. When striking with the bat we change the collision group
        this.bat.body.setCollisionGroup(this.dontCollideGroup);
        this.bat.body.collides(this.ballCollisionGroup, this.collideWithBat, this);

        // Create ball
        this.createBall();

        // create stump
        this.stump = this.stumpGroup.create(70, 400, 'stump');
        // stump physics
        game.physics.p2.enable(this.stump);
        this.stump.body.kinematic = true;
        // stump polygon body
        this.stump.body.clearShapes();
        this.stump.body.loadPolygon("physics", "stump");
        // stump collision
        this.stump.body.setCollisionGroup(this.stumpCollisionGroup);
        this.stump.body.collides(this.ballCollisionGroup, this.collideWithStump, this);

        // initializing variables for checking if bat has been activated and testing amount of time between updates
        this.toggleBodyChange = 0;
        this.updateDelay = 0;

        // Updated bounds
        game.physics.p2.updateBoundsCollisionGroup();


    }

    update () {
        // if bat has been hit and sufficient time passed, reset rotation and collision group
        if(this.toggleBodyChange && this.updateDelay % 20 == 0) {
            this.bat.body.rotation = 0;
            this.toggleBodyChange = 0;
            this.bat.body.setCollisionGroup(this.dontCollideGroup);
            game.physics.p2.updateBoundsCollisionGroup();
        }
        // if mouse has been clicked and its been a while since last click, rotate bat by 45 degrees and allow the ball to strike it
        if(game.input.activePointer.isDown && this.updateDelay >= 50) {
            this.bat.body.rotation = 0.785;
            this.toggleBodyChange = 1;
            this.bat.body.setCollisionGroup(this.batCollisionGroup);
            game.physics.p2.updateBoundsCollisionGroup();
            this.updateDelay = 0;
        }
        // if spacebar is pressed, throw another ball
        if(game.input.keyboard.isDown(Phaser.KeyCode.SPACEBAR)) {
            this.ball.destroy();
            this.createBall();
        }
        this.updateDelay++;
    }

    createBall() {
        // create ball with random velocity
        let randomVelocityX = -Math.round(Math.random() * (300) + 400);
        let randomVelocityY = Math.round(Math.random() * (100) + 150);
        this.ball = this.ballGroup.create(950, 300, 'ball');
        this.ball.scale.setTo(0.3, 0.3);
        game.physics.p2.enable(this.ball);
        this.ball.body.velocity.x = randomVelocityX;
        this.ball.body.velocity.y = randomVelocityY;
        // ball collision - collides with bat, stump and pitch but not the world
        this.ball.body.collideWorldBounds = false;
        this.ball.body.setCollisionGroup(this.ballCollisionGroup);
        this.ball.body.collides([this.batCollisionGroup, this.stumpCollisionGroup, this.pitchCollisionGroup]);
    }

    gameOver() {
        // game over state
        this.state.start('GameOver');
    }

    collideWithStump() {
        // destroy the ball and call game over function
        this.ball.destroy();
        this.gameOver();
    }

    collideWithBat() {
        // adjust the ball's speed and send it in the opposite direction
        this.ball.body.velocity.x = Math.random() * 1000 + 1000;
    }

}
