import Phaser from 'phaser'
import { centerGameObjects } from '../utils'

export default class extends Phaser.State {
  init () {}

  preload () {}

  create () {
    this.add.button(0, 0, 'gameOver', this.startGame, this);
  }

  startGame () {
      this.state.start('Game');
  }
}
