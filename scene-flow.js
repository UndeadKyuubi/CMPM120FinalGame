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
class MainTitle extends Phaser.Scene {
    constructor() {
        super(scenes.mainTitle)
    }

    create() {
        this.add.image(0, 0, 'background')

        startButton.on('pointerup', () => {
            this.scene.start(scenes.gameplay);
        });

        creditButton.on('pointerup', () => {
            this.scene.start(scenes.credit);
        });
    }
}

class Credit extends Phaser.Scene {
    constructor() {
        super(scenes.credit)
    }

    create() {

        backButton.on('pointerup', () => {
            this.scene.start(scenes.mainTitle);
        });
    }
}

class Gameplay extends Phaser.Scene {
    constructor() {
        super()
    }
}

class Menu extends Phaser.Scene {
    constructor() {
        super()
    }
}