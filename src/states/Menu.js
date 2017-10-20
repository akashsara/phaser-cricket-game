import Phaser from 'phaser'
import { centerGameObjects } from '../utils'

export default class extends Phaser.State {
  init () {}

  preload () {
    game.load.image('menu', './assets/images/menu.png');
  }

  create () {
    this.add.button(0, 0, 'menu', this.startGame, this);
  }

  startGame () {
      this.state.start('Game');
  }
}
