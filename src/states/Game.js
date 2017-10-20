/* globals __DEV__ */
import Phaser from 'phaser'

export default class extends Phaser.State {
    init () {
        var pitch, ball, bat, cursors, stump, toggleBodyChange;
        /*var batGroup, stumpGroup, pitchGroup
        var batCollision, stumpCollision, pitchCollision;*/
    }

    preload () {}
    create () {
        //Start Physics
        game.physics.startSystem(Phaser.Physics.P2JS);
        game.physics.p2.gravity.y = 100;
        game.physics.p2.restitution = 0.8;
        game.physics.p2.setImpactEvents(true);

        //Create pitch
        this.pitch = game.add.sprite(0, 550, 'pitch');
        this.pitch.scale.setTo(3, 2);
        //pitch physics
        game.physics.p2.enable(this.pitch);
        this.pitch.body.kinematic = true;

        //Create bat
        this.bat = game.add.sprite(150, 370, 'bat', 'bat00.png');
        //bat physics
        game.physics.p2.enable(this.bat, true);
        this.bat.body.clearShapes();
        this.bat.body.kinematic = true;
        this.bat.body.collideWorldBounds = true;
        this.bat.animations.add('hit');

        //Create stump
        this.stump = game.add.sprite(70, 400, 'stump');
        //stump physics
        game.physics.p2.enable(this.stump);
        this.stump.body.kinematic = true;
        this.stump.body.clearShapes();
        this.stump.body.loadPolygon("physics", "stump");

        //Create ball
        this.createBall();

        //initialize cursors, variable to test if frame change required
        this.cursors = game.input.keyboard.createCursorKeys();
        this.toggleBodyChange = 0;

        /*//Collision groups
        this.batCollision = game.physics.p2.createCollisionGroup();
        this.stumpCollision = game.physics.p2.createCollisionGroup();
        this.pitchCollision = game.physics.p2.createCollisionGroup();
        game.physics.p2.updateBoundsCollisionGroup();
        this.batGroup.body.setCollisionGroup(this.batCollision);
        this.pitchGroup.body.setCollisionGroup(this.pitchCollision);
        this.stumpGroup.body.setCollisionGroup(this.stumpCollision);*/
    }

    update () {
        /*
        let ballHitGround = game.physics.p2.collide(this.ball, this.pitch);
        let ballHitBat = game.physics.p2.collide(this.ball, this.bat);
        let batHitGround = game.physics.p2.collide(this.bat, this.pitch);
        */

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
        }/*

        if(ballHitBat) {
        this.ball.body.velocity.x = 500;
        this.ball.body.velocity.y = -500;
        ballHitBat = 0;
    }*/

}

createBall() {
    //Create ball
    let randomVelocity = -Math.floor(Math.random() * (700 - 400) + 400);
    this.ball = game.add.sprite(1050, 300, 'ball');
    this.ball.scale.setTo(0.3, 0.3);
    game.physics.p2.enable(this.ball);
    this.ball.body.collideWorldBounds = true;
    //this.ball.body.collides(this.stumpCollision, this.gameOver);
    this.ball.body.velocity.x = randomVelocity;
    this.ball.body.velocity.y = 200;
}

gameOver() {
    console.log("Game Over")
}

}
