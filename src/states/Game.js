/* globals __DEV__ */
import Phaser from 'phaser'

export default class extends Phaser.State {
    init () {
        var pitch, ball, bat, cursors, stump, toggleBodyChange;
        var batGroup, stumpGroup, pitchGroup, ballGroup;
        var batCollisionGroup, stumpCollisionGroup, pitchCollisionGroup, ballCollisionGroup;
    }

    preload () {}
    create () {
        //Start Physics
        game.physics.startSystem(Phaser.Physics.P2JS);
        game.physics.p2.gravity.y = 100;
        game.physics.p2.restitution = 0.8;
        game.physics.p2.setImpactEvents(true);
        game.world.setBounds(0, 0, 1000, 600);

        //create groups
        this.pitchGroup = game.add.group();
        this.batGroup = game.add.group();
        this.ballGroup = game.add.group();
        this.stumpGroup = game.add.group();

        //create collision groups
        this.pitchCollisionGroup = game.physics.p2.createCollisionGroup();
        this.batCollisionGroup = game.physics.p2.createCollisionGroup();
        this.ballCollisionGroup = game.physics.p2.createCollisionGroup();
        this.stumpCollisionGroup = game.physics.p2.createCollisionGroup();

        //create pitch
        this.pitch = this.pitchGroup.create(0, 550, 'pitch');
        this.pitch.scale.setTo(3, 2);
        //pitch physics
        game.physics.p2.enable(this.pitch);
        this.pitch.body.kinematic = true;
        //pitch Collision
        this.pitch.body.setCollisionGroup(this.pitchCollisionGroup);
        this.pitch.body.collides(this.ballCollisionGroup);

        //create bat
        this.bat = this.batGroup.create(150, 370, 'bat', 'bat00.png');
        //bat physics
        game.physics.p2.enable(this.bat, true);
        this.bat.body.kinematic = true;
        //vat animations & polygon body
        //this.bat.body.clearShapes();
        this.bat.animations.add('hit');
        //bat Collision
        this.bat.body.setCollisionGroup(this.batCollisionGroup);
        this.bat.body.collides(this.ballCollisionGroup, this.collideWithBat, this);

        //Create ball
        this.createBall();

        //create stump
        this.stump = this.stumpGroup.create(70, 400, 'stump');
        //stump physics
        game.physics.p2.enable(this.stump);
        this.stump.body.kinematic = true;
        //stump polygon body
        this.stump.body.clearShapes();
        this.stump.body.loadPolygon("physics", "stump");
        //stump collision
        this.stump.body.setCollisionGroup(this.stumpCollisionGroup);
        this.stump.body.collides(this.ballCollisionGroup, this.collideWithStump, this);

        //initialize cursors, variable to test if frame change required
        this.cursors = game.input.keyboard.createCursorKeys();
        this.toggleBodyChange = 0;

        //Updated bounds
        game.physics.p2.updateBoundsCollisionGroup();

    }

    update () {
        if(this.toggleBodyChange) {
            this.bat.body.clearShapes();
            this.toggleBodyChange = 0;
        }
        if(game.input.keyboard.isDown(Phaser.KeyCode.SPACEBAR)) {
            this.ball.destroy();
            this.createBall();
        }
        if(game.input.activePointer.isDown) {
            this.bat.body.clearShapes();
            this.bat.body.loadPolygon("physics", "bat01");
            this.bat.animations.play('hit', 30);
            this.bat.animations.currentAnim.speed = 5;
            this.toggleBodyChange = 1;
        }
    }

    createBall() {
        //create ball
        let randomVelocityX = -Math.round(Math.random() * (200) + 400);
        let randomVelocityY = Math.round(Math.random() * (100) + 150);
        console.log(randomVelocityX, randomVelocityY);
        this.ball = this.ballGroup.create(950, 300, 'ball');
        this.ball.scale.setTo(0.3, 0.3);
        game.physics.p2.enable(this.ball);
        this.ball.body.velocity.x = randomVelocityX;
        this.ball.body.velocity.y = randomVelocityY;
        //ball Collision
        this.ball.body.collideWorldBounds = false;
        this.ball.body.setCollisionGroup(this.ballCollisionGroup);
        this.ball.body.collides([this.batCollisionGroup, this.stumpCollisionGroup, this.pitchCollisionGroup]);
    }

    gameOver() {
        console.log("Game Over")
    }

    collideWithStump() {
        this.ball.destroy();
        this.gameOver();
    }

    collideWithBat() {
        let returnSpeed = Math.round(Math.random() * (1000 - 500) + 500);
        this.ball.body.reverse(1000);
    }

}
