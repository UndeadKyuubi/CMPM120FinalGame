//Main Menu scene
class MainTitle extends Phaser.Scene {
    constructor() {
        super('mainTitle');
    }

    create() {
        let title = this.add.text((config.width / 2), (config.height / 2) - 300, "Main Menu");
        title.setAlign("center");
        title.setFontSize(120);
        title.setOrigin(0.5, 0.5);

        let playButton = this.add.text((config.width / 2), (config.height / 2) - 90, "Play");
        playButton.setAlign("center");
        playButton.setFontSize(70);
        playButton.setOrigin(0.5, 0.5);

        playButton.setInteractive();
        playButton.on(Phaser.Input.Events.POINTER_DOWN, () => {
            this.scene.start('gameplay');
        })

        let creditButton = this.add.text((config.width / 2), (config.height / 2) - 0, "Credit");
        creditButton.setAlign("center");
        creditButton.setFontSize(70);
        creditButton.setOrigin(0.5, 0.5);

        creditButton.setInteractive();
        creditButton.on(Phaser.Input.Events.POINTER_DOWN, () => {
            this.scene.start('credit');
        })
    }
}

class Credit extends Phaser.Scene {
    constructor() {
        super('credit')
    }

    create() {
        this.add.text((config.width / 2), (config.height / 2)- 300, "This is the credit page")
        .setAlign("center")
        .setFontSize(70)
        .setOrigin(0.5, 0.5);
    }
}

class Gameplay extends Phaser.Scene {
    constructor() {
        super('gameplay')
    }

    create() {
        this.add.text((config.width / 2), (config.height / 2)- 300, "This is the gameplay page")
        .setAlign("center")
        .setFontSize(70)
        .setOrigin(0.5, 0.5);

        let menuButton = this.add.text(0, 0, "Menu");
        menuButton.setOrigin(0, 0);
        menuButton.setFontSize(50);
        menuButton.setInteractive();

        menuButton.setInteractive();
        menuButton.on(Phaser.Input.Events.POINTER_DOWN, () => {
            this.scene.start('menu');
        })
    }
}

class Menu extends Phaser.Scene {
    constructor() {
        super('menu')
    }

    create() {
        this.add.text((config.width / 2), (config.height / 2) - 300, "Menu")
        .setAlign("center")
        .setFontSize(70)
        .setOrigin(0.5, 0.5);

        let backButton = this.add.text((config.width / 2), (config.height / 2) - 120, "Back")
        backButton.setAlign("center");
        backButton.setFontSize(30);
        backButton.setOrigin(0.5, 0.5);

        backButton.setInteractive();
        backButton.on(Phaser.Input.Events.POINTER_DOWN, () => {
            this.scene.start('gameplay');
        })

        let quitButton = this.add.text((config.width / 2), (config.height / 2) - 90, "Quit game")
        quitButton.setAlign("center");
        quitButton.setFontSize(30);
        quitButton.setOrigin(0.5, 0.5);

        quitButton.setInteractive();
        quitButton.on(Phaser.Input.Events.POINTER_DOWN, () => {
            this.scene.start('mainTitle');
        })
    }
}


const config = {
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
    //scene: [Gameplay]
    scene: [MainTitle, Credit, Gameplay, Menu]
};

const game = new Phaser.Game(config);