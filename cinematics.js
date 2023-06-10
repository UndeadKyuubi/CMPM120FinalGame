let loadingConfig = {
    key: 'loading',
    pack: {
        files: [{
            type: 'plugin',
            key: 'rexwebfontloaderplugin',
            url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexwebfontloaderplugin.min.js',
            start: true
        }]
    }
};

class Loading extends Phaser.Scene {
    constructor() {
        super(loadingConfig);
    }

    preload() {
        this.plugins.get('rexwebfontloaderplugin').addToScene(this);
        let config = {
            google: {
                families: ['Press Start 2P']
            }
        };
        this.load.rexWebFont(config);
        this.load.path = './assets/';
        this.load.image('logo', 'logo.jpg');
    }

    create() {
        this.add.image(1920 *.5, 1080 *.5, 'logo').setScale(.75);
        this.time.delayedCall(2000, () =>{
            this.scene.start('menu');
        })
        
    }

}

class Menu extends Phaser.Scene {
    constructor() {
        super('menu');
    }

    create() {
        this.cameras.main.fadeIn(750, 0,0,0);
        
        // creating menu text
        let menu = this.add.container(w*0.25, h*0.25);

        let menuText = this.add.text(0, 0)
            .setOrigin(0.5)
            .setText("Time Two")
            .setStyle({ fontSize: `${60}px`, fontFamily: '"Press Start 2P"', color: '#ffffff' });

        let playOn = false;
        let playButton = this.add.text(0, 200)
            .setOrigin(0.5)
            .setText("Start")
            .setStyle({ fontSize: `${32}px`, fontFamily: '"Press Start 2P"', color: '#ffffff' })
            .setInteractive()
            .on('pointerover', () => {
                playButton.setTint(0x808080);
                playOn = true;
            })
            .on('pointerout', () => {
                if (playOn) {
                    playButton.setTint(0xffffff);
                    playOn = false;
                }
            })
            .once('pointerdown', () => {
                // only perform this action once per level restart
                this.scene.start('placeholder');
            });

        menu.add(menuText);
        menu.add(playButton);
    }
}

class Placeholder extends Phaser.Scene {
    constructor() {
        super('placeholder')
    }

    create() {
        this.add.text(centerX, centerY, "Game goes here")
        .setOrigin(0.5)
        .setStyle({ fontSize: `${60}px`, fontFamily: '"Press Start 2P"', color: '#ffffff' });

        let restartOn = false;
        let restartButton = this.add.text(centerX, centerY+200, "Restart?")
        .setOrigin(0.5)
        .setStyle({ fontSize: `${32}px`, fontFamily: '"Press Start 2P"', color: '#ffffff' })
        .setInteractive()
        .on('pointerover', () => {
            restartButton.setTint(0x808080);
            restartOn = true;
        })
        .on('pointerout', () => {
            if (restartOn) {
                restartButton.setTint(0xffffff);
                restartOn = false;
            }
        })
        .once('pointerdown', () => {
            // only perform this action once per level restart
            this.scene.start('loading');
        });
    }
}

const cinematics = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080,  
        backgroundColor: '#000000'      
    },
    scene: [Loading, Menu, Placeholder],
    title: "Cinematics Prototype",
})

let centerX = cinematics.config.width/2;
let centerY = cinematics.config.height/2;
let w = cinematics.config.width;
let h = cinematics.config.height;
