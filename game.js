let lightX=0;
let lightY=0;

let boxX = 0;
let boxY = 0;
let isMoving=false;

let swapPast = 0;
let swapFuture = 0;
let currScene = 'past';

let past = 'yorelevel1';
let future = 'neolevel1';

class Intro extends Phaser.Scene {
    constructor() {
        super('intro')
    }
    create() {
        let text=this.add.text(1920/2-250,540, "Click to start").setFontSize(60).setInteractive();
        //var text = this.add.bitMaptext(400, 300, 'Hover over me!').setOrigin(0.5);
    
            text.on('pointerover', ()=> {
                // Tween the text to a smaller size
                this.tweens.add({
                    targets: text,
                    scaleX: 0.8,
                    scaleY: 0.6,
                    duration: 100,
                    yoyo: true,
                    ease: 'Sine.easeInOut'
                });
            });
            
            // Add event listener for mouseout event
            text.on('pointerout', () => {
                // Tween the text back to its original size
                this.tweens.add({
                    targets: text,
                    scaleX: 1,
                    scaleY: 1,
                    duration: 100,
                    yoyo: true,
                    ease: 'Sine.easeInOut'
                });
            });
        
        this.input.on('pointerdown', () => {
                // Tween the text to a smaller size
                this.tweens.add({
                    targets: text,
                    scaleX: 0.8,
                    scaleY: 0.6,
                    duration: 50,
                    yoyo: true,
                    ease: 'Sine.easeInOut'
                });
            
            this.cameras.main.fade(1000, 0,0,0);
            this.time.delayedCall(1000, () => this.scene.start('yorelevel1'));
        });
    }
}

class Box extends Phaser.Physics.Arcade.Image {
    constructor(scene, x=0, y=0, texture='box'){
        super(scene, x, y, texture)

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setCollideWorldBounds()
        this.setInteractive()
        this.setBounce(0.5)
        this.setPushable(true)
        this.setVelocity(0)
        this.setDragX(1000)
        this.setDragY(1000)
    }
}

class YoreLevel1 extends Phaser.Scene{
    constructor() {
        super('yorelevel1')
    }

    preload()
    {
        this.load.image('background', './assets/Sprite-0002.png');
        this.load.image('player', './assets/test2.png');   
        this.load.image('box', './assets/box.png');
        this.load.audio('music',"./assets/Radwimps_-_Date.mp3")
        this.load.audio('scrape',"./assets/80092__ayliffe__scrape-3.wav")
    }

    create(){
   
        this.sound.add('music');
        this.boxSound = this.sound.add('scrape');
        this.sound.play('music');
        if ((localStorage.getItem('audioMute'))) {
            game.sound.setMute(true);
        }
        
        let background= this.physics.add.image(this.sys.game.config.width / 2,this.sys.game.config.height / 2,'background');
        this.physics.world.setBounds(0,0,3000,3000);

        this.player=this.physics.add.sprite(this.sys.game.config.width / 2,this.sys.game.config.height / 2,"player").setScale(.1);
        this.player.setCollideWorldBounds(true, 0, 0);
        
        this.target = new Phaser.Math.Vector2();
        
        // Enable camera to follow the player
        this.cameras.main.startFollow(this.player);

        //Point and click movement
        this.input.on('pointerdown', (pointer) =>
        {
            this.target = this.cameras.main.getWorldPoint(pointer.x, pointer.y);

            //Move at 200 px/s:
            this.physics.moveToObject(this.player, this.target, 200);
        });

        //Block push
        this.player.setInteractive();
        
        this.testBlock = new Box(this, this.sys.game.config.width / 4, this.sys.game.config.height +100);

        this.player.setImmovable(true);

        this.physics.add.collider(this.player, this.testBlock);

        this.scene.launch('hud');
    }

    update() {
        //controls
        const tolerance = 4;

        const distance = Phaser.Math.Distance.BetweenPoints(this.player, this.target);

        if (this.player.body.speed > 0)
        {
            isMoving = true;
            if (distance < tolerance)
            {
                this.player.body.reset(this.target.x, this.target.y);
            }
        }
        else{
            isMoving = false;
        }

        if (this.testBlock.body.speed > 0) {
            if(!this.boxSound.isPlaying)
            {
            this.boxSound.play();    
            }  
        }

        boxX = this.testBlock.x;
        boxY = this.testBlock.y;
        lightX=this.player.x;
        lightY=this.player.y;
    }
   
}

class NeoLevel1 extends Phaser.Scene {
    constructor(){
        super('neolevel1');
    }

    preload()
    {
        this.load.image('player', './assets/test2.png');
        this.load.image('base_tiles', './assets/base_tiles.png');  
        
        this.load.tilemapTiledJSON('tilemap', './assets/testMap.json')
    }

    create(){
        this.tempx=0;
        this.tempy=0;

        this.lights.enable().setAmbientColor(0x000000);
        const map = this.make.tilemap({key: 'tilemap'});

        const tileset = map.addTilesetImage('testTileset', 'base_tiles');
        
        this.light = this.lights.addLight(180, 80, 200).setColor(0x00FFFF).setIntensity(1);

         /*this.input.on('pointermove', pointer =>
         {

            this.light.x=pointer.x;
            this.light.y=pointer.y;

         });*/

        this.groundLayer = map.createLayer('Tile Layer 1', tileset);

        this.solidLayer = map.createLayer('Tile Layer 2', tileset);
        this.solidLayer.setCollisionByProperty({collides: true});
        //this.solidLayer.renderDebug(this.add.graphics());

        this.groundLayer.setPipeline("Light2D");
        this.solidLayer.setPipeline("Light2D");

        this.physics.world.setBounds(0,0,3000,3000);

        this.player=this.physics.add.sprite(this.sys.game.config.width / 2 + 50,this.sys.game.config.height / 2,"player").setScale(.1);
        this.player.setCollideWorldBounds(true, 0, 0);

        this.physics.add.collider(this.player, this.solidLayer);
        
        this.target = new Phaser.Math.Vector2();
        
        // Enable camera to follow the player
        this.cameras.main.startFollow(this.player);

        //Point and click movement
        this.input.on('pointerdown', (pointer) =>
        {
            this.target = this.cameras.main.getWorldPoint(pointer.x, pointer.y);

            //Move at 200 px/s:
            this.physics.moveToObject(this.player, this.target, 200);
        });

        //Block push
        this.player.setInteractive();

        this.testBlock = new Box(this, boxX, boxY);

        this.player.setImmovable(true);

        this.physics.add.collider(this.player, this.testBlock);

        this.scene.launch('hud');

        this.events.on(Phaser.Scenes.Events.WAKE, function () {
            this.wake();
        }, this);
       
    }

    update() {
        //controls
        const tolerance = 4;

        const distance = Phaser.Math.Distance.BetweenPoints(this.player, this.target);

        if (this.player.body.speed > 0)
        {
            isMoving = true;

            if (distance < tolerance)
            {
                this.player.body.reset(this.target.x, this.target.y);
            }
        }
        else{
            isMoving = false;
        }
    }

    wake() {
        if(this.tempx!=boxX || boxY!=this.tempy)
        {
            this.testBlock.x = boxX;
            this.testBlock.y = boxY;
            this.tempx=boxX;
            this.tempy=boxY;
        }

        this.light.x=lightX;
        this.light.y=lightY;
    }
}

class YoreLevel2 extends Phaser.Scene {
    constructor(){
        super('yorelevel2');
    }
}

class NeoLevel2 extends Phaser.Scene {
    constructor(){
        super('neolevel2');
    }
}

class YoreLevel3 extends Phaser.Scene {
    constructor(){
        super('yorelevel3');
    }
}

class NeoLevel3 extends Phaser.Scene {
    constructor(){
        super('neolevel3');
    }
}

class YoreLevel4 extends Phaser.Scene {
    constructor(){
        super('yorelevel4');
    }
}

class NeoLevel4 extends Phaser.Scene {
    constructor(){
        super('neolevel4');
    }
}

class HUD extends Phaser.Scene {
    constructor(){
        super('hud');
    }

    create(){
        this.swapButton = this.add.rectangle(150, 1000, 200, 75, 0xababab, 1).setInteractive();
        this.muteButton = this.add.rectangle(500, 1000, 200, 75, 0xababab, 1).setInteractive();
        this.fullButton = this.add.rectangle(1600, 1000, 200, 75, 0xababab, 1).setInteractive();
        this.swapButton.on('pointerdown', () =>
        {
            if (isMoving == false) {
                console.log("swapped");

                if (currScene == 'past' && swapFuture == 0) {
                    currScene = 'future';
                    swapFuture += 1;
                    this.scene.sleep(past);
                    this.scene.launch(future);
                }
                else if (currScene == 'future' && swapPast == 0){
                    currScene = 'past';
                    swapPast += 1;
                    this.scene.sleep(future);
                    this.scene.run(past);
                }
                else if (currScene == 'past' && swapFuture != 0) {
                    currScene = 'future';
                    swapFuture += 1;
                    this.scene.sleep(past);
                    this.scene.run(future);
                }
                else if (currScene == 'future' && swapPast != 0) {
                    currScene = 'past';
                    swapPast += 1;
                    this.scene.sleep(future);
                    this.scene.run(past);
                }

            }
        });
        this.muteButton.on('pointerdown', () =>
        {
            console.log('hello');
            toggleAudio();
        });
        this.fullButton.on('pointerdown', () => {
            if (this.scale.isFullscreen) {
                this.scale.stopFullscreen();
            } else {
                this.scale.startFullscreen();
            }
        });
    }
}

function toggleAudio()
{
    if (localStorage.getItem('audioMute')) {
        localStorage.removeItem('audioMute');
        game.sound.setMute(!game.sound.mute);
    }
    else{
    localStorage.setItem('audioMute','mute');
    game.sound.setMute(!game.sound.mute);
    }

}

const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080        
    },
    physics: {
        default:'arcade',
        arcade: {
            debug: true,
            gravity: { y: 0}
        }
    },
    scene: [Intro, YoreLevel1, NeoLevel1, YoreLevel2, NeoLevel2, YoreLevel3, NeoLevel3, YoreLevel4, NeoLevel4, HUD],
    title: "Final Game",
});