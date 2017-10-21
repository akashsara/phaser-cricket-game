import Phaser from 'phaser'
import { centerGameObjects } from '../utils'

export default class extends Phaser.State {
  init () {}

  preload () {
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg')
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar')
    centerGameObjects([this.loaderBg, this.loaderBar])

    this.load.setPreloadSprite(this.loaderBar)
    this.load.image('menu', './assets/images/menu.png');
    this.load.image('gameOver', './assets/images/game_over.png');
    this.load.image('pitch', './assets/images/pitch.png');
    this.load.image('ball', './assets/images/ball.png');
    this.load.image('stump', './assets/images/stump.png');
    this.load.image('bat', './assets/images/bat.png');
    this.load.physics("physics", "./assets/images/physicsData.json");
  }

  create () {
    this.state.start('Menu');
  }
}
