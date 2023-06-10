let GlobalItemX=0;
let GlobalItemY=0;
let lightX=0;
let lightY=0;

let boxX = 0;
let boxY = 0;
let isMoving=false;

let swapPast = 0;
let swapFuture = 0;
let currScene = 'past';

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
            this.time.delayedCall(1000, () => this.scene.start('first'));
        });
    }
}
class First extends Phaser.Scene{
    constructor() {
        super('first')
    }

    preload()
    {
        this.load.image('background', './assets/Sprite-0002.png');
        this.load.image('player', './assets/test2.png');   
        this.load.image('box', './assets/box.png');
    }

    create(){
        if (localStorage.getItem('audioMute')) {
            const isMuted = localStorage.getItem('audioMute') === 'true';
            this.sound.mute = isMuted;
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
        
        this.testBlock = this.physics.add.image(this.sys.game.config.width / 4, this.sys.game.config.height +100, 'box').setCollideWorldBounds().setInteractive();

        this.testBlock.setBounce(0.5);
        this.testBlock.setPushable(true);
        this.player.setImmovable(true);
        this.testBlock.setVelocity(0);

        this.testBlock.setDragX(1000);
        this.testBlock.setDragY(1000);

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

        boxX = this.testBlock.x;
        boxY = this.testBlock.y;
        lightX=this.player.x;
        lightY=this.player.y;
    }
   
}

class Second extends Phaser.Scene {
    constructor(){
        super('second');
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

        this.testBlock = this.physics.add.image(boxX, boxY, 'box').setCollideWorldBounds().setInteractive();

        this.testBlock.setBounce(0.5);
        this.testBlock.setPushable(true);
        this.player.setImmovable(true);
        this.testBlock.setVelocity(0);

        this.testBlock.setDragX(1000);
        this.testBlock.setDragY(1000);

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

class HUD extends Phaser.Scene {
    constructor(){
        super('hud');
    }

    create(){
        this.swapButton = this.add.rectangle(150, 1000, 200, 75, 0xababab, 1).setInteractive();
        this.muteButton = this.add.rectangle(500, 1000, 200, 75, 0xababab, 1).setInteractive();
        this.swapButton.on('pointerdown', () =>
        {
            if (isMoving == false) {
                console.log("swapped");

                if (currScene == 'past' && swapFuture == 0) {
                    currScene = 'future';
                    swapFuture += 1;
                    this.scene.sleep('first');
                    this.scene.launch('second');
                }
                else if (currScene == 'future' && swapPast == 0){
                    currScene = 'past';
                    swapPast += 1;
                    this.scene.sleep('second');
                    this.scene.run('first');
                }
                else if (currScene == 'past' && swapFuture != 0) {
                    currScene = 'future';
                    swapFuture += 1;
                    this.scene.sleep('first');
                    this.scene.run('second');
                }
                else if (currScene == 'future' && swapPast != 0) {
                    currScene = 'past';
                    swapPast += 1;
                    this.scene.sleep('second');
                    this.scene.run('first');
                }

            }
        });
        this.muteButton.on('pointerdown', () =>
        {
            
        });
    }
}
function toggleAudio()
{
    if (localStorage.getItem('audioMute')) {
        localStorage.removeItem('audioMute');
        this.sound.mute = false;
    }
    else{
    const isMuted = localStorage.getItem('audioMute') === 'true';
    localStorage.setItem('audioMute', updatedMuteState.toString());
    this.sound.mute = updatedMuteState;
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
    scene: [Intro, First, Second, HUD],
    title: "Final Game",
});