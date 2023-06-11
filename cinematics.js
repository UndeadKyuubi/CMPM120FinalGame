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
        //this.load.image('logo', 'logo.jpg');
        this.load.image('dot', 'dot_logo.jpg');
        this.load.image('logo', 'edit_logo.jpg');
     }

    create() {
        this.cameras.main.fadeIn(1000, 0,0,0);

        let logo = this.add.image(w *.5, h *.5, 'logo')
        .setScale(.75)
        .setAlpha(0);

        let dot_logo = this.add.image(w*.5, h*.5, 'dot')
        .setScale(.75)
        .setAlpha(0);

        this.time.delayedCall(1001, () => {
            this.add.tween({
                targets: logo,
                alpha: {from: 0, to: 1},
                duration: 1000
            });
        })

        this.time.delayedCall(1001, () => {
            const chain = this.tweens.chain({
                targets: dot_logo,
                tweens: [
                    {
                        alpha: {from: 0, to: 1},
                        duration: 1000
                    },
                    {
                        alpha: {from: 1, to: 0},
                        delay: 500,
                        duration: 0
                    },
                    {
                        alpha: {from: 0, to: 1},
                        delay: 500,
                        duration: 0
                    },
                    {
                        alpha: {from: 1, to: 0},
                        delay: 500,
                        duration: 0
                    },
                    {
                        alpha: {from: 0, to: 1},
                        delay: 500,
                        duration: 0
                    },
                ]
            });
        })

        let blackbox = this.add.rectangle(0, 0, 1920, 1080, 0x000000).setOrigin(0,0).setAlpha(0);
        this.time.delayedCall(4000, () =>{
            let transition = this.add.tween({
                targets: blackbox,
                alpha: {from: 0, to: 1},
                duration: 2000
            });
            transition.on('complete', () =>{
                this.scene.start('menu');
            })
        })     
    }
}

class Menu extends Phaser.Scene {
    constructor() {
        super('menu');
    }

    create() {
        this.cameras.main.fadeIn(750, 0,0,0);

        let menuText = this.add.text(w*0.25, h*0.25)
            .setOrigin(0.5)
            .setText("Times Two")
            .setStyle({ fontSize: `${72}px`, fontFamily: '"Press Start 2P"', color: '#ffffff' });

        const chain = this.tweens.chain({
            targets: menuText,
            tweens: [
                {
                    x: 400,
                    ease: 'power3',
                    duration: 750
                },
                {
                    alpha: {from: 1, to: 0.25},
                    yoyo: true,
                    repeat: -1,
                    duration: 2000
                },
            ]
        });

        let playOn = false;
        let playButton = this.add.text(w*0.35, h*0.25+200)
            .setOrigin(0)
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
            })
            .setAlpha(0);
        
        let optOn = false;
        let optButton = this.add.text(w*0.35, h*0.25+300)
            .setOrigin(0)
            .setText("Options")
            .setStyle({ fontSize: `${32}px`, fontFamily: '"Press Start 2P"', color: '#ffffff' })
            .setInteractive()
            .on('pointerover', () => {
                optButton.setTint(0x808080);
                optOn = true;
            })
            .on('pointerout', () => {
                if (optOn) {
                    optButton.setTint(0xffffff);
                    optOn = false;
                }
            })
            .once('pointerdown', () => {
                // only perform this action once per level restart
                this.scene.start('options');
            })
            .setAlpha(0);
        
        let credOn = false;
        let credButton = this.add.text(w*0.35, h*0.25+400)
            .setOrigin(0)
            .setText("Credits")
            .setStyle({ fontSize: `${32}px`, fontFamily: '"Press Start 2P"', color: '#ffffff' })
            .setInteractive()
            .on('pointerover', () => {
                credButton.setTint(0x808080);
                credOn = true;
            })
            .on('pointerout', () => {
                if (credOn) {
                    credButton.setTint(0xffffff);
                    credOn = false;
                }
            })
            .once('pointerdown', () => {
                // only perform this action once per level restart
                this.scene.start('credits');
            })
            .setAlpha(0);
            
        this.time.delayedCall(1001, () => {
            this.add.tween({
                targets: playButton,
                x: 250,
                alpha: {from: 0, to: 1},
                ease: 'power3',
                duration: 750
            });
        })

        this.time.delayedCall(1500, () => {
            this.add.tween({
                targets: optButton,
                x: 250,
                alpha: {from: 0, to: 1},
                ease: 'power3',
                duration: 750
            });
        })

        this.time.delayedCall(2000, () => {
            this.add.tween({
                targets: credButton,
                x: 250,
                alpha: {from: 0, to: 1},
                ease: 'power3',
                duration: 750
            });
        })
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

class Credits extends Phaser.Scene {
    constructor() {
        super('credits');
    }

    create() {
        this.add.text(centerX*.5, centerY*.5, "Credits")
        .setOrigin(0.5)
        .setStyle({ fontSize: `${60}px`, fontFamily: '"Press Start 2P"', color: '#ffffff' });

        this.add.text(centerX*.15, centerY*.75, "Brandon Jacobson - Technology Lead\n\nJimmy Nguyen - Testing Lead, SFX Audio\n\nMadison Li - Art\n\nKeven Paw - Production Lead\n\nJosey Verespey - Executive Vice Producer, Narrative Lead")
        .setOrigin(0,0)
        .setStyle({ fontSize: `${30}px`, fontFamily: '"Press Start 2P"', color: '#ffffff' });

        let restartOn = false;
        let restartButton = this.add.text(w*0.10, h*0.75, "Back")
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
            this.scene.start('menu');
        });
    }
}

class Options extends Phaser.Scene {
    constructor() {
        super('options');
    }

    create() {
        this.add.text(centerX*.5, centerY*.5, "Options")
        .setOrigin(0.5)
        .setStyle({ fontSize: `${60}px`, fontFamily: '"Press Start 2P"', color: '#ffffff' });

        let restartOn = false;
        let restartButton = this.add.text(w*0.10, h*0.75, "Back")
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
            this.scene.start('menu');
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
    scene: [Loading, Menu, Placeholder, Options, Credits],
    title: "Cinematics Prototype",
})

let centerX = cinematics.config.width/2;
let centerY = cinematics.config.height/2;
let w = cinematics.config.width;
let h = cinematics.config.height;
