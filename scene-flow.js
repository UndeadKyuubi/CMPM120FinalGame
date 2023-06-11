let gameplayScene = 0;
let blockMoved = false;

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
            this.cameras.main.fadeOut(600, 0, 0, 0);
            this.time.delayedCall(601, () => {
                this.scene.start('gameplay');
            })
        })

        let creditButton = this.add.text((config.width / 2), (config.height / 2) - 0, "Credit");
        creditButton.setAlign("center");
        creditButton.setFontSize(70);
        creditButton.setOrigin(0.5, 0.5);

        creditButton.setInteractive();
        creditButton.on(Phaser.Input.Events.POINTER_DOWN, () => {
            this.cameras.main.fadeOut(600, 0, 0, 0);
            this.time.delayedCall(601, () => {
                this.scene.start('credit');
            })
        })
    }
}
//Credit scene
class Credit extends Phaser.Scene {
    constructor() {
        super('credit')
    }

    create() {
        this.add.text((config.width / 2), (config.height / 2)- 300, "This is the credit page")
        .setAlign("center")
        .setFontSize(70)
        .setOrigin(0.5, 0.5);

        let retrunToMainMenu = this.add.text((config.width / 2), (config.height / 2) + 90, "Return to Main Menu")
        retrunToMainMenu.setAlign("center");
        retrunToMainMenu.setFontSize(30);
        retrunToMainMenu.setOrigin(0.5, 0.5);   

        retrunToMainMenu.setInteractive();
        retrunToMainMenu.on(Phaser.Input.Events.POINTER_DOWN, () => {
            gameplayScene = 0;
            this.scene.start('mainTitle');
        })
    }
}

//Gameplay 1 & 2 scenes
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
            gameplayScene = 1;
            this.scene.start('menu');
        })

        let NextButton = this.add.text((config.width / 2), (config.height / 2) - 120, "Next Scene")
        NextButton.setAlign("center");
        NextButton.setFontSize(70);
        NextButton.setOrigin(0.5, 0.5);

        NextButton.setInteractive();
        NextButton.on(Phaser.Input.Events.POINTER_DOWN, () => {
            gameplayScene = 2;
            this.cameras.main.fadeOut(600, 0, 0, 0);
            this.time.delayedCall(601, () => {
                this.scene.start('gameplay2');
            })
        })

        let block = this.add.text((config.width / 2), (config.height / 2) - 30, "Block (Not pushed)")

        if (blockMoved == true) {
            block.setText("Block (Pushed)")
        }
        else {
            block.setText("Block (Not pushed)")
        }

        block.setAlign("center");
        block.setFontSize(50);
        block.setOrigin(0.5, 0,5);

        block.setInteractive();
        block.on(Phaser.Input.Events.POINTER_DOWN, () => {
            if (blockMoved == false) {
                blockMoved = true;
                block.setText("Block (Pushed)")
            }
            else {
                blockMoved = false;
                block.setText("Block (Not pushed)")
            }
        })
    }
}

class Gameplay2 extends Phaser.Scene {
    constructor() {
        super('gameplay2')
    }

    create() {
        this.add.text((config.width / 2), (config.height / 2)- 300, "This is the gameplay page 2")
        .setAlign("center")
        .setFontSize(70)
        .setOrigin(0.5, 0.5);

        let menuButton = this.add.text(0, 0, "Menu");
        menuButton.setOrigin(0, 0);
        menuButton.setFontSize(50);
        menuButton.setInteractive();

        menuButton.setInteractive();
        menuButton.on(Phaser.Input.Events.POINTER_DOWN, () => {
            gameplayScene = 2;
            this.scene.start('menu');
        })
        let prevScene = this.add.text((config.width / 2), (config.height / 2) - 120, "Previous Scene")
        prevScene.setAlign("center");
        prevScene.setFontSize(70);
        prevScene.setOrigin(0.5, 0.5);   

        prevScene.setInteractive();
        prevScene.on(Phaser.Input.Events.POINTER_DOWN, () => {
            gameplayScene = 1;
            this.cameras.main.fadeOut(600, 0, 0, 0);
            this.time.delayedCall(601, () => {
                this.scene.start('gameplay');
            })
        })



        let block = this.add.text((config.width / 2), (config.height / 2) - 30, "Block (Not pushed)")
        if (blockMoved == true) {
            block.setText("Block (Pushed)")
        }
        else {
            block.setText("Block (Not pushed)")
        }

        block.setAlign("center");
        block.setFontSize(50);
        block.setOrigin(0.5, 0,5);

        block.setInteractive();
        block.on(Phaser.Input.Events.POINTER_DOWN, () => {
            if (blockMoved == false) {
                blockMoved = true;
                block.setText("Block (Pushed)")
            }
            else {
                blockMoved = false;
                block.setText("Block (Not pushed)")
            }
        })

        let retrunToMainMenu = this.add.text((config.width / 2), (config.height / 2) + 90, "Return to Main Menu")
        retrunToMainMenu.setAlign("center");
        retrunToMainMenu.setFontSize(70);
        retrunToMainMenu.setOrigin(0.5, 0.5);   

        retrunToMainMenu.setInteractive();
        retrunToMainMenu.on(Phaser.Input.Events.POINTER_DOWN, () => {
            gameplayScene = 0;
            this.cameras.main.fadeOut(600, 0, 0, 0);
            this.time.delayedCall(601, () => {
                this.scene.start('mainTitle');
            })
        })
    }
}

//Menu scene
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
            if (gameplayScene == 1) {
                this.scene.start('gameplay');
            }
            if (gameplayScene == 2) {
                this.scene.start('gameplay2');
            }

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
    scene: [MainTitle, Credit, Gameplay, Gameplay2, Menu]
};

const game = new Phaser.Game(config);