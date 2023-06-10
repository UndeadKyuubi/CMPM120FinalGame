const scenes = {
    mainTitle: 'mainTitle',
    credit: 'credit',
    gameplay: 'gameplay',
    menu: 'menu'
};

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: []
};

const game = new Phaser.Game(config);

//Main Menu scene
class MainMenu extends Phaser.Scene {
    constructor() {
        super(scenes.mainTitle)
    }
}