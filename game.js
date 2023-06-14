//globals for light
let lightX=0;
let lightY=0;

// globals for level 1 boxes
let boxX = 0;
let boxY = 0;

// globals for level 3 boxes
let box3_1x = 0;
let box3_1y = 0;
let box3_2x = 0;
let box3_2y = 0;
let box3_3x = 0;
let box3_3y = 0;

// globals for level 4 boxes
let box4x = 0;
let box4y = 0;

// other globals
let isMoving=false;

let swapPast = 0;
let swapFuture = 0;
let currScene = 'past';

let past = 'yorelevel1';
let future = 'neolevel1';

let hudLoaded = false;
let musicPlaying = false;

let animsLoaded = false;

let hasOverlapped = false;

//Loading
class Loading extends Phaser.Scene{
    constructor(){
        super('loading')
    }
    preload(){
        // progress bar
        const progress = this.add.graphics();
        const loadText = this.add.text(920, 450, 'Loading...');
        progress.fillStyle(0x222222, 0.8);
        progress.fillRect(815, 470, 320, 50);

        this.load.on('progress', value => {
            progress.clear();
            progress.fillStyle(0xffffff, 1);
            progress.fillRect(815, 480, 300 * value, 30);
        });

        this.load.on('complete', () => {
            loadText.destroy();
            this.add.text(895, 530, 'Click to begin');
         });

        this.load.video('logo', './assets/Studio_Animation.mp4');
    }
    create(){
        this.input.on('pointerdown', ()=> this.scene.start('intro'));
    }
}

//Studio Logo
class Intro extends Phaser.Scene{
    constructor(){
        super('intro')
    }
    create(){
        // Testing logo animation
        
        this.cameras.main.fadeIn(1000, 0,0,0);

        const studio = this.add.video(1920*.5, 1080*.5, 'logo');
        
        studio.on('locked', () => {
            let message = this.add.text(1920*5, 1080*5, 'Click to play video');
            studio.on('unlocked', () => {
                message.destroy();
            });
        });
        
        this.time.delayedCall(1000, ()=> studio.play());

        this.time.delayedCall(4000, ()=> {
            this.cameras.main.fadeOut(1000, 0, 0, 0);
            this.scene.start('mainMenu');
        });
    }
}

//Main Menu
class MainMenu extends Phaser.Scene {
    constructor() {
        super('mainMenu')
    }
    preload() {
        this.load.image('titleBackground', '/assets/menuArt.png');
        this.load.image('cubePast', './assets/cubePast.png');
        this.load.image('cubeFuture', './assets/cubeFuture.png');
        this.load.audio('music',"./assets/LullabyforwerwolvesLofi_original_no_steal_mix_.mp3");
        this.load.audio('scrape',"./assets/blockSlide3.mp3");
        this.load.audio('switch',"./assets/pressurePlate2.mp3")
        this.load.spritesheet('Yore', './assets/YoreSprite.png', {
            frameWidth: 128, 
            frameHeight: 128
        });
        this.load.spritesheet('Neo', './assets/NeoSprite.png', {
            frameWidth: 128,
            frameHeight: 128
        });
        this.load.spritesheet('crystal', './assets/crystal.png', {
            frameWidth: 128, 
            frameHeight: 128,
            startFrame: 0,
            endFrame: 3
        });
        this.load.spritesheet('dust', './assets/DustSprites.png', {
            frameWidth: 384, 
            frameHeight: 384,
            startFrame: 0,
            endFrame: 4
        });
        this.load.image('enterFull', './assets/enterFull.png');
        this.load.image('exitFull', './assets/exitFull.png');
        this.load.image('mute', './assets/Muted.png');
        this.load.image('unmute', './assets/Unmuted.png');

        //Map preload
        //Map 1
        this.load.tilemapTiledJSON('yoremap1', './assets/yoremap1.json');
        this.load.tilemapTiledJSON('neomap1', './assets/neomap1.json');

        //Map 2
        this.load.tilemapTiledJSON('yoremap2', './assets/Ymaze.json');
        this.load.tilemapTiledJSON('neomap2', './assets/Nmaze.json');
        //Map 3
        this.load.tilemapTiledJSON('yoremap3', './assets/yoreMap3.json');
        this.load.tilemapTiledJSON('neomap3', './assets/neoMap3.json');

        //Map 4
        this.load.tilemapTiledJSON('yoremap4', './assets/YFinal.json');
        this.load.tilemapTiledJSON('neomap4', './assets/NFinal.json');
        //Tileset preload
        this.load.image('yore-tiles', './assets/yoreTiles.png'); 
        this.load.image('neo-tiles', './assets/neoTiles.png');

        this.load.image('pastSwitch', './assets/pastSwitch.png');
        this.load.image('futureSwitch', './assets/futureSwitch.png');
        this.load.image('reset', './assets/reset.png');
        this.load.image('clock', './assets/clock.png');
        this.load.image('clockPressed', './assets/clockPressed.png');
        this.load.image('plate1p','./assets/num1Past.png')
        this.load.image('plate1f','./assets/num1Future.png')
        this.load.image('plate2p','./assets/num2Past.png')
        this.load.image('plate2f','./assets/num2Future.png')
        this.load.image('plate3p','./assets/num3Past.png')
        this.load.image('plate3f','./assets/num3Future.png')
        this.load.audio('timer','./assets/tick.mp3');
        this.load.video('logo', './assets/Studio_Animation.mp4');
        this.load.audio('lvlComplete','./assets/levelComplete.mp3');
    }

    create() {
        this.cameras.main.fadeIn(750, 0, 0, 0);

        let background = this.add.sprite(this.sys.game.config.width / 2,this.sys.game.config.height / 2, 'titleBackground');

        //let title = this.add.image((config.width / 2) - 800, (config.height / 2) + 200, 'title');

        this.time.delayedCall(750, () => {
            this.title = this.add.text(this.sys.game.config.width / 2 - 950, this.sys.game.config.height / 2 + 300, 'Time Two')
            .setAlpha(0)
            .setFontSize(50)
            .setAngle(-25);

            this.add.tween({
                targets: this.title,
                alpha: {from: 0, to: 1},
                duration: 500
            });
        })

        this.time.delayedCall(950, () => {
            this.playButton = this.add.text((this.sys.game.config.width / 2 - 900), this.sys.game.config.height / 2 + 400, 'Play')
            .setAlpha(0)
            .setFontSize(35)
            .setAngle(-25);

            this.add.tween({
                targets: this.playButton,
                alpha: {from: 0, to: 1},
                duration: 500
            });

            this.playButton.setInteractive();
            this.playButton.on(Phaser.Input.Events.POINTER_DOWN, () => {
                this.playButton.setScale(0.9);
                this.cameras.main.fadeOut(600, 0, 0, 0);
                this.time.delayedCall(601, () => {
                    //this.scene.start('yorelevel1');
                    this.scene.start('yorelevel4');
                })
            })
            this.playButton.on(Phaser.Input.Events.POINTER_UP, () => {
                this.playButton.setScale(1);
            })
        })

        this.time.delayedCall(1100, () => {
            this.creditButton = this.add.text((this.sys.game.config.width / 2 - 880), this.sys.game.config.height / 2 + 450, 'Credits')
            .setAlpha(0)
            .setFontSize(35)
            .setAngle(-25);

            this.add.tween({
                targets: this.creditButton,
                alpha: {from: 0, to: 1},
                duration: 500
            });

            this.creditButton.setInteractive();
            this.creditButton.on(Phaser.Input.Events.POINTER_DOWN, () => {
                this.creditButton.setScale(0.9);
                this.cameras.main.fadeOut(600, 0, 0, 0);
                this.time.delayedCall(601, () => {
                    this.scene.start('credits');
                })
            })
            this.creditButton.on(Phaser.Input.Events.POINTER_UP, () => {
                this.creditButton.setScale(1);
            })
        })

        if (animsLoaded == false) {
            animsLoaded = true;

                //Yore Sprites
                this.anims.create({
                    key: 'idleYore',
                    frames: this.anims.generateFrameNumbers('Yore', {frames: [0, 1, 2, 3, 4]}),
                    frameRate: 5,
                    repeat: -1
                });
        
                this.anims.create({
                    key: 'walkLYore',
                    frames: this.anims.generateFrameNumbers('Yore', {frames: [30, 31, 32, 33, 34, 35, 36, 37, 38, 39]}),
                    frameRate: 10,
                    repeat: -1
                });
        
                this.anims.create({
                    key: 'walkRYore',
                    frames: this.anims.generateFrameNumbers('Yore', {frames: [40, 41, 42, 43, 44, 45, 46, 47, 48, 49]}),
                    frameRate: 10,
                    repeat: -1
                })
        
                this.anims.create({
                    key: 'walkDYore',
                    frames: this.anims.generateFrameNumbers('Yore', {frames: [20, 21, 22, 23, 24, 25]}),
                    frameRate: 6,
                    repeat: -1
                })
        
                this.anims.create({
                    key: 'walkUYore',
                    frames: this.anims.generateFrameNumbers('Yore', {frames: [10, 11, 12, 13, 14, 15]}),
                    frameRate: 6,
                    repeat: -1
                })
        
                // Neo sprites
                this.anims.create({
                    key: 'idleNeo',
                    frames: this.anims.generateFrameNumbers('Neo', {frames: [0, 1, 2, 3, 4]}),
                    frameRate: 5,
                    repeat: -1
                });
        
                this.anims.create({
                    key: 'walkDNeo',
                    frames: this.anims.generateFrameNumbers('Neo', {frames: [10, 11, 12, 13, 14, 15]}),
                    frameRate: 6,
                    repeat: -1
                });
        
                this.anims.create({
                    key: 'walkUNeo',
                    frames: this.anims.generateFrameNumbers('Neo', {frames: [20, 21, 22, 23, 24, 25]}),
                    frameRate: 6, 
                    repeat: -1
                });
        
                this.anims.create({
                    key: 'walkLNeo',
                    frames: this.anims.generateFrameNumbers('Neo', {frames: [30, 31, 32, 33, 34, 35, 36, 37]}),
                    frameRate: 8,
                    repeat: -1
                })
        
                this.anims.create({
                    key: 'walkRNeo',
                    frames: this.anims.generateFrameNumbers('Neo', {frames: [40, 41, 42, 43, 44, 45, 46, 47]}),
                    frameRate: 8,
                    repeat: -1
                });

                // Crystal animations
                this.anims.create({
                    key: 'goal',
                    frames: 'crystal',
                    frameRate: 4,
                    repeat: -1
                });

                // Dust animations
                this.anims.create({
                    key: 'trigger',
                    frames: 'dust',
                    frameRate: 5,
                    repeat: 0
                });
            }
    }
}

class Credits extends Phaser.Scene {
    constructor() {
        super('credits')
    }

    preload() {
        //this.load.image('titleBackground', '/assets/testTitleBackground.jpg');
    }

    create() {
        //let background = this.add.sprite(this.sys.game.config.width / 2,this.sys.game.config.height / 2, 'titleBackground');
        
        this.cameras.main.fadeIn(750, 0, 0, 0);

        this.add.text((this.sys.game.config.width / 2), (this.sys.game.config.height / 2 - 350), "Credits")
        .setAlign("center")
        .setFontSize(70)
        .setOrigin(0.5, 0.5);

        this.add.text((this.sys.game.config.width / 2), (this.sys.game.config.height / 2 - 200), "Keven Paw - Production Lead, Animation")
        .setAlign("center")
        .setFontSize(50)
        .setOrigin(0.5, 0.5);

        this.add.text((this.sys.game.config.width / 2), (this.sys.game.config.height / 2 - 150), "Josey Verespey - Executive Vice Producer")
        .setAlign("center")
        .setFontSize(50)
        .setOrigin(0.5, 0.5);

        this.add.text((this.sys.game.config.width / 2), (this.sys.game.config.height / 2 - 100), "Madison Li - Art")
        .setAlign("center")
        .setFontSize(50)
        .setOrigin(0.5, 0.5);

        this.add.text((this.sys.game.config.width / 2), (this.sys.game.config.height / 2 - 50), "Brandon Jacobson - Technology Lead")
        .setAlign("center")
        .setFontSize(50)
        .setOrigin(0.5, 0.5);

        this.add.text((this.sys.game.config.width / 2), (this.sys.game.config.height / 2), "Jimmy Nguyen - Testing Lead, SFX Audio")
        .setAlign("center")
        .setFontSize(50)
        .setOrigin(0.5, 0.5);

        this.retrunToMainMenu = this.add.text((this.sys.game.config.width / 2), (this.sys.game.config.height / 2 + 120), "Return to Main Menu")
        .setAlign("center")
        .setFontSize(30)
        .setOrigin(0.5, 0.5);   

        this.retrunToMainMenu.setInteractive();
        this.retrunToMainMenu.on(Phaser.Input.Events.POINTER_DOWN, () => {
            this.retrunToMainMenu.setScale(0.9);
            this.cameras.main.fadeOut(600, 0, 0, 0);
            this.time.delayedCall(601, () => {
                this.scene.start('mainMenu');
            })
        })
        this.retrunToMainMenu.on(Phaser.Input.Events.POINTER_UP, () => {
            this.retrunToMainMenu.setScale(1);
        })
    }

}

class Box extends Phaser.Physics.Arcade.Image {
    constructor(scene, x=0, y=0, texture='cubePast'){
        super(scene, x, y, texture)

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setInteractive()
        this.setBounce(0)
        this.setPushable(true)
        this.setVelocity(0)
        this.setDragX(1000)
        this.setDragY(1000)
        this.setScale(0.5)
    }
}

class YoreLevel1 extends Phaser.Scene{
    constructor() {
        super('yorelevel1')
    }

    create(){
        //this.timer=this.sound.add('timer');
        this.boxSound = this.sound.add('scrape');
        //this.timer.loop=true;

        const map = this.make.tilemap({key: 'yoremap1'});

        const tileset = map.addTilesetImage('yoreTiles', 'yore-tiles');

        this.groundLayer = map.createLayer('Ground', tileset);
        this.platformLayer = map.createLayer('Platforms', tileset);
        this.boxLayer = map.createLayer('BoxOnly', tileset).setVisible(false);
        this.fakePlats = map.createLayer('FalsePlatforms', tileset);
        this.yoreLayer = map.createLayer('YoreOnly', tileset);
        this.treeLayer = map.createLayer('Trees', tileset).setDepth(1);

        this.groundLayer.setCollisionByProperty({collides: true});
        this.platformLayer.setCollisionByProperty({collides: true});
        this.boxLayer.setCollisionByProperty({collides: true});
        this.yoreLayer.setCollisionByProperty({collides: true});
        this.treeLayer.setCollisionByProperty({collides: true});

        this.player=this.physics.add.sprite(this.sys.game.config.width / 2 + 1300,this.sys.game.config.height / 2 + 2200,"Yore");
        this.player.play('idleYore'); //play idle
        this.player.body.setSize(75, 128);
        this.player.setInteractive();
        this.player.setImmovable(true);

        this.physics.add.collider(this.player, this.groundLayer);
        this.physics.add.collider(this.player, this.platformLayer);
        this.physics.add.collider(this.player, this.boxLayer);
        this.physics.add.collider(this.player, this.yoreLayer);
        this.physics.add.collider(this.player, this.treeLayer);
        this.switch=this.physics.add.sprite(this.sys.game.config.width / 2 + 760,this.sys.game.config.height / 2 + 900,"pastSwitch").setScale(0.5);

        //crystal
        const timeSprite = this.physics.add.sprite(this.sys.game.config.width / 2 + 760,this.sys.game.config.height / 2 + 50, 'crystal').play('goal');
        this.complete=this.sound.add('lvlComplete');
        this.physics.add.collider(this.player, timeSprite, () => {
            let futureScene = this.scene.get(future);
            futureScene.scene.remove();
            this.complete.play();
            this.scene.start('yorelevel2');
        });
         
        this.target = new Phaser.Math.Vector2();
        
        // Enable camera to follow the player
        this.cameras.main.startFollow(this.player);

        //Point and click movement
        this.input.on('pointerdown', (pointer) =>
        {
            this.target = this.cameras.main.getWorldPoint(pointer.x, pointer.y);

            //Move at 200 px/s:
            this.playerAngle = this.physics.moveToObject(this.player, this.target, 200);
        });

        //Block push       
        this.testBlock = new Box(this, this.sys.game.config.width / 2 + 760,this.sys.game.config.height / 2 + 2500);
        this.testBlock.body.setSize(250, 370);

        this.physics.add.collider(this.player, this.testBlock);
        this.physics.add.collider(this.testBlock, this.groundLayer);
        this.physics.add.collider(this.testBlock, this.platformLayer);
        this.physics.add.collider(this.testBlock, this.boxLayer);
        this.physics.add.collider(this.testBlock, this.yoreLayer);
        this.physics.add.collider(this.testBlock, this.treeLayer);

        // launch heads-up-display
        if (hudLoaded == false) {
            this.scene.launch('hud');
            hudLoaded = true;
        }

        // call wake() when awoken
        this.events.on(Phaser.Scenes.Events.WAKE, function () {
            this.wake();
        }, this);
       
    
        
    }

    update() {
        //controls
        const tolerance = 4;

        const distance = Phaser.Math.Distance.BetweenPoints(this.player, this.target);

        let angle = this.playerAngle * (180/Math.PI);

        if (this.player.body.speed > 0)
        {
            isMoving = true;

            if (distance < tolerance)
            {
                this.player.body.reset(this.target.x, this.target.y);
            }

            if (this.player.anims.isPlaying && this.player.anims.currentAnim.key != 'walkLYore' && ((angle < -135 && angle >= -180) || (angle > 135 && angle <= 180))) {
                this.player.play('walkLYore');
            }
            else if (this.player.anims.isPlaying && this.player.anims.currentAnim.key != 'walkRYore' && ((angle > -45 && angle <= 0) || (angle < 45 && angle >= 0))){
                this.player.play('walkRYore');
            }
            else if (this.player.anims.isPlaying && this.player.anims.currentAnim.key != 'walkUYore' && ((angle <= 135 && angle >= 90) || (angle >= 45 && angle <= 90))){
                this.player.play('walkUYore');
            }
            else if (this.player.anims.isPlaying && this.player.anims.currentAnim.key != 'walkDYore' && ((angle >= -135 && angle <= -90) || (angle <= -45 && angle >= -90))){
                this.player.play('walkDYore');
            }
        }
        else{
            isMoving = false;

            if (this.player.anims.isPlaying && this.player.anims.currentAnim.key != 'idleYore') {
                this.player.play('idleYore');
            }
        }

        if (this.testBlock.body.speed > 0) {
            if(!this.boxSound.isPlaying)
            {
            this.boxSound.play();    
            }  
        }

        boxX = this.testBlock.x;
        boxY = this.testBlock.y;
        
        
        
    }
   

    wake() {
    }


    

   
}




class NeoLevel1 extends Phaser.Scene {
    constructor(){
        super('neolevel1');
    }

    create(){
        this.tempx=0;
        this.tempy=0;
        this.boxSound=this.sound.add('scrape');

        const map = this.make.tilemap({key: 'neomap1'});

        const tileset = map.addTilesetImage('neoTiles', 'neo-tiles');

        this.groundLayer = map.createLayer('NeoGround', tileset);
        this.falsePlatforms = map.createLayer('neoFalsePlatforms', tileset);
        this.platformLayer = map.createLayer('neoPlatforms', tileset);
        this.neoLayer = map.createLayer('neoOnly', tileset);
        this.boxLayer = map.createLayer('neoBoxOnly', tileset).setVisible(false);
        this.genLayer = map.createLayer('neoGenPlat', tileset).setVisible(false);
        this.treeLayer = map.createLayer('neoTrees', tileset);

        this.groundLayer.setCollisionByProperty({collides: true});
        this.platformLayer.setCollisionByProperty({collides: true});
        this.neoLayer.setCollisionByProperty({collides: true});
        this.boxLayer.setCollisionByProperty({collides: true});
        this.treeLayer.setCollisionByProperty({collides: true});
        //this.solidLayer.renderDebug(this.add.graphics());

        this.player=this.physics.add.sprite(this.sys.game.config.width / 2 + 1300,this.sys.game.config.height / 2 + 2500,"Neo").setDepth(1);
        this.player.play('idleNeo');
        this.player.body.setSize(80, 128);
        this.player.setInteractive();
        this.player.setImmovable(true);

        this.switch=this.physics.add.sprite(this.sys.game.config.width / 2 + 760,this.sys.game.config.height / 2 + 900,"futureSwitch").setScale(0.5);
        this.switch.body.setSize(250, 50);
        this.switch.body.setOffset(0, 0);
        
        const timeSprite = this.physics.add.sprite(this.sys.game.config.width / 2 + 760,this.sys.game.config.height / 2 + 50, 'crystal').play('goal');

        this.physics.add.collider(this.player, timeSprite, () => {
            let pastScene = this.scene.get(past);
            pastScene.scene.remove();
            this.scene.start('yorelevel2');
        })
        
        this.physics.add.collider(this.player, this.groundLayer);
        this.physics.add.collider(this.player, this.platformLayer);
        this.physics.add.collider(this.player, this.neoLayer);
        let invisCollide = this.physics.add.collider(this.player, this.boxLayer);
        this.physics.add.collider(this.player, this.treeLayer);
        
        this.target = new Phaser.Math.Vector2();
        
        // Enable camera to follow the player
        this.cameras.main.startFollow(this.player);

        //Point and click movement
        this.input.on('pointerdown', (pointer) =>
        {
            this.target = this.cameras.main.getWorldPoint(pointer.x, pointer.y);

            //Move at 200 px/s:
            this.playerAngle = this.physics.moveToObject(this.player, this.target, 200);
        });

        //Block push
        this.testBlock = new Box(this, boxX, boxY);
        this.testBlock.setTexture('cubeFuture');
        this.testBlock.setDepth(2);
        this.testBlock.body.setSize(250, 185);
        this.testBlock.body.setOffset(0, 190);
        this.physics.add.collider(this.testBlock, this.groundLayer);
        this.physics.add.collider(this.testBlock, this.platformLayer);
        this.physics.add.collider(this.testBlock, this.neoLayer);
        this.physics.add.collider(this.testBlock, this.boxLayer);
        this.physics.add.collider(this.testBlock, this.treeLayer);

        this.physics.add.collider(this.player, this.testBlock);

        this.physics.add.overlap(this.testBlock, this.switch, () => {
            if (hasOverlapped == false) {
                hasOverlapped = true;
                
                const triggered = this.add.sprite(this.sys.game.config.width / 2 + 760,this.sys.game.config.height / 2 + 900, 'dust').setDepth(2).setScale(0.75).play('trigger');
                
                this.cameras.main.shake(500,.005);
                this.sound.play('switch');
                invisCollide.active = false;
                this.genLayer.setVisible(true);
                this.genLayer.setCollisionByProperty({collides: true});
                this.physics.add.collider(this.player, this.genLayer);
            }
        });

        // launch heads-up-display
        if (hudLoaded == false) {
            this.scene.launch('hud');
            hudLoaded = true;
        }

        // call wake() when awoken
        this.events.on(Phaser.Scenes.Events.WAKE, function () {
            this.wake();
        }, this);
       
    }

    update() {
        //controls
        const tolerance = 4;

        const distance = Phaser.Math.Distance.BetweenPoints(this.player, this.target);

        let angle = this.playerAngle * (180/Math.PI);

        if (this.player.body.speed > 0)
        {
            isMoving = true;

            if (distance < tolerance)
            {
                this.player.body.reset(this.target.x, this.target.y);
            }

            if (this.player.anims.isPlaying && this.player.anims.currentAnim.key != 'walkLNeo' && ((angle < -135 && angle >= -180) || (angle > 135 && angle <= 180))) {
                this.player.play('walkLNeo');
            }
            else if (this.player.anims.isPlaying && this.player.anims.currentAnim.key != 'walkRNeo' && ((angle > -45 && angle <= 0) || (angle < 45 && angle >= 0))){
                this.player.play('walkRNeo');
            }
            else if (this.player.anims.isPlaying && this.player.anims.currentAnim.key != 'walkDNeo' && ((angle <= 135 && angle >= 90) || (angle >= 45 && angle <= 90))){
                this.player.play('walkDNeo');
            }
            else if (this.player.anims.isPlaying && this.player.anims.currentAnim.key != 'walkUNeo' && ((angle >= -135 && angle <= -90) || (angle <= -45 && angle >= -90))){
                this.player.play('walkUNeo');
            }
        }
        else{
            isMoving = false;

            if (this.player.anims.isPlaying && this.player.anims.currentAnim.key != 'idleNeo') {
                this.player.play('idleNeo');
            }
        }

        lightX=this.player.x;
        lightY=this.player.y;
        
        if (this.testBlock.body.speed > 0) {
            if(!this.boxSound.isPlaying)
            {
            this.boxSound.play();    
            }  
        }
    }
       

    wake() 
    {
        if(this.tempx!=boxX || boxY!=this.tempy)
        {
            this.testBlock.x = boxX;
            this.testBlock.y = boxY;

            this.tempx=boxX;
            this.tempy=boxY;
        }
    }
}




class YoreLevel2 extends Phaser.Scene {
    constructor(){
        super('yorelevel2');
    }

    create() {
        past = 'yorelevel2';
        future = 'neolevel2';
        currScene = 'past';
        swapPast = 0;
        swapFuture = 0;
        const map = this.make.tilemap({key: 'yoremap2'});

        const tileset = map.addTilesetImage('PASTTILES', 'yore-tiles');
        
        this.groundLayer=map.createLayer('floor', tileset);
        this.wallLayer=map.createLayer('Walls', tileset);
        this.treeLayer=map.createLayer('treeoverlay', tileset);
        this.groundLayer.setCollisionByProperty({collides: true});
        this.wallLayer.setCollisionByProperty({collides: true});
        this.treeLayer.setCollisionByProperty({collides: true});
        this.lights.enable().setAmbientColor(0x000000);
        this.light = this.lights.addLight(this.sys.game.config.width / 2 + 650,this.sys.game.config.height / 2 + 2300, 128*4).setColor(0x00FFFF).setIntensity(1);

        this.groundLayer.setPipeline("Light2D");
        this.wallLayer.setPipeline("Light2D");
        this.treeLayer.setPipeline("Light2D");

        this.neoImage = this.add.sprite(this.sys.game.config.width / 2 + 650,this.sys.game.config.height / 2 + 2300,"Neo").setAlpha(0.5);
        this.neoImage.play('idleNeo');

        this.player=this.physics.add.sprite(this.sys.game.config.width / 2 + 650,this.sys.game.config.height / 2 + 2300,"Yore");
        this.player.play('idleYore'); //play idle
        this.player.body.setSize(75, 128);
        this.player.setInteractive();
        this.player.setImmovable(true);
        
        this.physics.add.collider(this.player, this.groundLayer);
        this.physics.add.collider(this.player, this.wallLayer);
        this.physics.add.collider(this.player, this.treeLayer);

        const timeSprite = this.physics.add.sprite(this.sys.game.config.width / 2 + 650,this.sys.game.config.height / 2 + 900, 'crystal').play('goal');

        this.physics.add.collider(this.player, timeSprite, () => {
            let futureScene = this.scene.get(future);
            futureScene.scene.remove();
            this.scene.start('endscene');
        });
        
        this.target = new Phaser.Math.Vector2();
        
        // Enable camera to follow the player
        this.cameras.main.startFollow(this.player);

        //Point and click movement
        this.input.on('pointerdown', (pointer) =>
        {
            this.target = this.cameras.main.getWorldPoint(pointer.x, pointer.y);

            //Move at 200 px/s:
            this.playerAngle = this.physics.moveToObject(this.player, this.target, 200);
        });

        // launch heads-up-display
        if (hudLoaded == false) {
            this.scene.launch('hud');
            hudLoaded = true;
        }

        // call wake() when awoken
        this.events.on(Phaser.Scenes.Events.WAKE, function () {
            this.wake();
        }, this);
    }

    update() {
        //controls
        const tolerance = 4;

        const distance = Phaser.Math.Distance.BetweenPoints(this.player, this.target);

        let angle = this.playerAngle * (180/Math.PI);

        if (this.player.body.speed > 0)
        {
            isMoving = true;

            if (distance < tolerance)
            {
                this.player.body.reset(this.target.x, this.target.y);
            }

            if (this.player.anims.isPlaying && this.player.anims.currentAnim.key != 'walkLYore' && ((angle < -135 && angle >= -180) || (angle > 135 && angle <= 180))) {
                this.player.play('walkLYore');
            }
            else if (this.player.anims.isPlaying && this.player.anims.currentAnim.key != 'walkRYore' && ((angle > -45 && angle <= 0) || (angle < 45 && angle >= 0))){
                this.player.play('walkRYore');
            }
            else if (this.player.anims.isPlaying && this.player.anims.currentAnim.key != 'walkUYore' && ((angle <= 135 && angle >= 90) || (angle >= 45 && angle <= 90))){
                this.player.play('walkUYore');
            }
            else if (this.player.anims.isPlaying && this.player.anims.currentAnim.key != 'walkDYore' && ((angle >= -135 && angle <= -90) || (angle <= -45 && angle >= -90))){
                this.player.play('walkDYore');
            }
        }
        else{
            isMoving = false;

            if (this.player.anims.isPlaying && this.player.anims.currentAnim.key != 'idleYore') {
                this.player.play('idleYore');
            }
        }
    }

    wake() {
        this.light.x=lightX;
        this.light.y=lightY;

        this.neoImage.x = lightX;
        this.neoImage.y = lightY;
    }
}

class NeoLevel2 extends Phaser.Scene {
    constructor(){
        super('neolevel2');
    }

    create() {
        const map = this.make.tilemap({key: 'neomap2'});

        const tileset = map.addTilesetImage('FUTURETILES', 'neo-tiles');

        this.groundLayer=map.createLayer('Floor', tileset);
        this.wallLayer=map.createLayer('Wall', tileset);
        this.treeLayer=map.createLayer('tree overlay', tileset);

        this.groundLayer.setCollisionByProperty({collides: true});
        this.wallLayer.setCollisionByProperty({collides: true});
        this.treeLayer.setCollisionByProperty({collides: true});

        this.player=this.physics.add.sprite(this.sys.game.config.width / 2 + 650,this.sys.game.config.height / 2 + 2300,"Neo");
        this.player.play('idleNeo');
        this.player.body.setSize(80, 128);
        this.player.setInteractive();
        this.player.setImmovable(true);
        
        this.physics.add.collider(this.player, this.groundLayer);
        this.physics.add.collider(this.player, this.wallLayer);
        this.physics.add.collider(this.player, this.treeLayer);
        
        const timeSprite = this.physics.add.sprite(this.sys.game.config.width / 2 + 650,this.sys.game.config.height / 2 + 900, 'crystal').play('goal');

        this.physics.add.collider(this.player, timeSprite, () => {
            let pastScene = this.scene.get(past);
            pastScene.scene.remove();
            this.scene.start('endscene');
        })
        
        this.target = new Phaser.Math.Vector2();
        
        // Enable camera to follow the player
        this.cameras.main.startFollow(this.player);

        //Point and click movement
        this.input.on('pointerdown', (pointer) =>
        {
            this.target = this.cameras.main.getWorldPoint(pointer.x, pointer.y);

            //Move at 200 px/s:
            this.playerAngle = this.physics.moveToObject(this.player, this.target, 200);
        });

        // launch heads-up-display
        if (hudLoaded == false) {
            this.scene.launch('hud');
            hudLoaded = true;
        }

        // call wake() when awoken
        this.events.on(Phaser.Scenes.Events.WAKE, function () {
            this.wake();
        }, this);
    }

    update() {
        //controls
        const tolerance = 4;

        const distance = Phaser.Math.Distance.BetweenPoints(this.player, this.target);

        let angle = this.playerAngle * (180/Math.PI);

        if (this.player.body.speed > 0)
        {
            isMoving = true;

            if (distance < tolerance)
            {
                this.player.body.reset(this.target.x, this.target.y);
            }

            if (this.player.anims.isPlaying && this.player.anims.currentAnim.key != 'walkLNeo' && ((angle < -135 && angle >= -180) || (angle > 135 && angle <= 180))) {
                this.player.play('walkLNeo');
            }
            else if (this.player.anims.isPlaying && this.player.anims.currentAnim.key != 'walkRNeo' && ((angle > -45 && angle <= 0) || (angle < 45 && angle >= 0))){
                this.player.play('walkRNeo');
            }
            else if (this.player.anims.isPlaying && this.player.anims.currentAnim.key != 'walkDNeo' && ((angle <= 135 && angle >= 90) || (angle >= 45 && angle <= 90))){
                this.player.play('walkDNeo');
            }
            else if (this.player.anims.isPlaying && this.player.anims.currentAnim.key != 'walkUNeo' && ((angle >= -135 && angle <= -90) || (angle <= -45 && angle >= -90))){
                this.player.play('walkUNeo');
            }
        }
        else{
            isMoving = false;

            if (this.player.anims.isPlaying && this.player.anims.currentAnim.key != 'idleNeo') {
                this.player.play('idleNeo');
            }
        }

        lightX = this.player.x;
        lightY = this.player.y;
    }

    wake() {
        
    }
}

class YoreLevel3 extends Phaser.Scene {
    constructor(){
        super('yorelevel3');
    }

    create() {
        past = 'yorelevel3';
        future = 'neolevel3';
        currScene = 'past';
        swapPast = 0;
        swapFuture = 0;

        this.boxSound = this.sound.add('scrape');

        const map = this.make.tilemap({key: 'yoremap3'});

        const tileset = map.addTilesetImage('yoreTilesets', 'yore-tiles');

        this.groundLayer = map.createLayer('Yore floor', tileset);
        this.platformLayer = map.createLayer('Yore walll & top', tileset);
        this.treeLayer = map.createLayer('Yore tree', tileset);

        this.groundLayer.setCollisionByProperty({collides: true});
        this.platformLayer.setCollisionByProperty({collides: true});
        this.treeLayer.setCollisionByProperty({collides: true});

        this.player=this.physics.add.sprite(this.sys.game.config.width / 2 + 800,this.sys.game.config.height / 2 + 2500,"Yore");
        this.player.play('idleYore'); //play idle
        this.player.body.setSize(75, 128);
        this.player.setInteractive();
        this.player.setImmovable(true);

        //crystal
        const timeSprite = this.physics.add.sprite(this.sys.game.config.width / 2 + 800,this.sys.game.config.height / 2 - 150, 'crystal').play('goal');

        this.physics.add.collider(this.player, timeSprite, () => {
            let futureScene = this.scene.get(future);
            futureScene.scene.remove();
            this.scene.start('endscene');
        });

        this.physics.add.collider(this.player, this.groundLayer);
        this.physics.add.collider(this.player, this.platformLayer);
        this.physics.add.collider(this.player, this.treeLayer);
        
        this.target = new Phaser.Math.Vector2();
        
        // Enable camera to follow the player
        this.cameras.main.startFollow(this.player);

        //Point and click movement
        this.input.on('pointerdown', (pointer) =>
        {
            this.target = this.cameras.main.getWorldPoint(pointer.x, pointer.y);

            //Move at 200 px/s:
            this.playerAngle = this.physics.moveToObject(this.player, this.target, 200);
        });

            //Block push
            // Block 1       
            this.Block = new Box(this, this.sys.game.config.width / 2 - 250,this.sys.game.config.height / 2 + 1800);
            this.Block.body.setSize(250, 370);
        
            this.physics.add.collider(this.player, this.Block);
            this.physics.add.collider(this.Block, this.groundLayer);
            this.physics.add.collider(this.Block, this.platformLayer);

            this.Block = new Box(this, this.sys.game.config.width / 2 - 250, this.sys.game.config.height / 2 + 1800);
            this.Block.body.setSize(250, 370);

            // Block 2
            this.Block2 = new Box(this, this.sys.game.config.width / 2 + 1300, this.sys.game.config.height / 2 + 1200);
            this.Block2.body.setSize(250, 370);

            this.physics.add.collider(this.player, this.Block2);
            this.physics.add.collider(this.Block2, this.groundLayer);
            this.physics.add.collider(this.Block2, this.platformLayer);

            // Block 3
            this.Block3 = new Box(this, this.sys.game.config.width / 2 - 200,this.sys.game.config.height / 2 + 300);
            this.Block3.body.setSize(250, 370);
        
            this.physics.add.collider(this.player, this.Block3);
            this.physics.add.collider(this.Block3, this.groundLayer);
            this.physics.add.collider(this.Block3, this.platformLayer);

        // launch heads-up-display
        if (hudLoaded == false) {
            this.scene.launch('hud');
            hudLoaded = true;
        }

        // call wake() when awoken
        this.events.on(Phaser.Scenes.Events.WAKE, function () {
            this.wake();
        }, this);
    }

    update() {
        //controls
        const tolerance = 4;

        const distance = Phaser.Math.Distance.BetweenPoints(this.player, this.target);

        let angle = this.playerAngle * (180/Math.PI);

        if (this.player.body.speed > 0)
        {
            isMoving = true;

            if (distance < tolerance)
            {
                this.player.body.reset(this.target.x, this.target.y);
            }

            if (this.player.anims.isPlaying && this.player.anims.currentAnim.key != 'walkLYore' && ((angle < -135 && angle >= -180) || (angle > 135 && angle <= 180))) {
                this.player.play('walkLYore');
            }
            else if (this.player.anims.isPlaying && this.player.anims.currentAnim.key != 'walkRYore' && ((angle > -45 && angle <= 0) || (angle < 45 && angle >= 0))){
                this.player.play('walkRYore');
            }
            else if (this.player.anims.isPlaying && this.player.anims.currentAnim.key != 'walkUYore' && ((angle <= 135 && angle >= 90) || (angle >= 45 && angle <= 90))){
                this.player.play('walkUYore');
            }
            else if (this.player.anims.isPlaying && this.player.anims.currentAnim.key != 'walkDYore' && ((angle >= -135 && angle <= -90) || (angle <= -45 && angle >= -90))){
                this.player.play('walkDYore');
            }
        }
        else{
            isMoving = false;

            if (this.player.anims.isPlaying && this.player.anims.currentAnim.key != 'idleYore') {
                this.player.play('idleYore');
            }
        }

        if (this.testBlock.body.speed > 0) {
            if(!this.boxSound.isPlaying)
            {
            this.boxSound.play();    
            }  
        }

        if (this.testBlock.body.speed > 0) {
            if(!this.boxSound.isPlaying)
            {
            this.boxSound.play();    
            }  
        }
    

        /*box3_1x = this.box1.x;
        box3_1y = this.box1.y;
        box3_2x = this.box2.x;
        box3_2y = this.box2.y;
        box3_3x = this.box3.x;
        box3_3y = this.box3.y;*/
    }

    wake() {
        
    }
}

class NeoLevel3 extends Phaser.Scene {
    constructor(){
        super('neolevel3');
    }

    create() {
        this.temp1x=0;
        this.temp1y=0;
        this.temp2x=0;
        this.temp2y=0;
        this.temp3x=0;
        this.temp3y=0;

        const map = this.make.tilemap({key: 'neomap3'});

        const tileset = map.addTilesetImage('NeoTilesets', 'neo-tiles');

        this.groundLayer = map.createLayer('Neo floor', tileset);
        this.platformLayer = map.createLayer('Neo wall & top', tileset);
        this.treeLayer = map.createLayer('Neo tree', tileset);

        this.groundLayer.setCollisionByProperty({collides: true});
        this.platformLayer.setCollisionByProperty({collides: true});
        this.treeLayer.setCollisionByProperty({collides: true});

        this.player=this.physics.add.sprite(this.sys.game.config.width / 2 + 800,this.sys.game.config.height / 2 + 2500,"Neo");
        this.player.play('idleNeo');
        this.player.body.setSize(80, 128);
        this.player.setInteractive();
        this.player.setImmovable(true);

        const timeSprite = this.physics.add.sprite(this.sys.game.config.width / 2,this.sys.game.config.height / 2 + 250, 'crystal').play('goal');

        this.physics.add.collider(this.player, timeSprite, () => {
            let pastScene = this.scene.get(past);
            pastScene.scene.remove();
            this.scene.start('endscene');
        })
        
        this.target = new Phaser.Math.Vector2();
        
        // Enable camera to follow the player
        this.cameras.main.startFollow(this.player);

        //Point and click movement
        this.input.on('pointerdown', (pointer) =>
        {
            this.target = this.cameras.main.getWorldPoint(pointer.x, pointer.y);

            //Move at 200 px/s:
            this.playerAngle = this.physics.moveToObject(this.player, this.target, 200);
        });

        // launch heads-up-display
        if (hudLoaded == false) {
            this.scene.launch('hud');
            hudLoaded = true;
        }

        // call wake() when awoken
        this.events.on(Phaser.Scenes.Events.WAKE, function () {
            this.wake();
        }, this);
    }

    update() {
        //controls
        const tolerance = 4;

        const distance = Phaser.Math.Distance.BetweenPoints(this.player, this.target);

        let angle = this.playerAngle * (180/Math.PI);

        if (this.player.body.speed > 0)
        {
            isMoving = true;

            if (distance < tolerance)
            {
                this.player.body.reset(this.target.x, this.target.y);
            }

            if (this.player.anims.isPlaying && this.player.anims.currentAnim.key != 'walkLNeo' && ((angle < -135 && angle >= -180) || (angle > 135 && angle <= 180))) {
                this.player.play('walkLNeo');
            }
            else if (this.player.anims.isPlaying && this.player.anims.currentAnim.key != 'walkRNeo' && ((angle > -45 && angle <= 0) || (angle < 45 && angle >= 0))){
                this.player.play('walkRNeo');
            }
            else if (this.player.anims.isPlaying && this.player.anims.currentAnim.key != 'walkDNeo' && ((angle <= 135 && angle >= 90) || (angle >= 45 && angle <= 90))){
                this.player.play('walkDNeo');
            }
            else if (this.player.anims.isPlaying && this.player.anims.currentAnim.key != 'walkUNeo' && ((angle >= -135 && angle <= -90) || (angle <= -45 && angle >= -90))){
                this.player.play('walkUNeo');
            }
        }
        else{
            isMoving = false;

            if (this.player.anims.isPlaying && this.player.anims.currentAnim.key != 'idleNeo') {
                this.player.play('idleNeo');
            }
        }

        if (this.Block.body.speed > 0) {
            if(!this.boxSound.isPlaying)
            {
            this.boxSound.play();    
            }  
        }
        if (this.Block2.body.speed > 0) {
            if(!this.boxSound.isPlaying)
            {
            this.boxSound.play();    
            }  
        }
        if (this.Block3.body.speed > 0) {
            if(!this.boxSound.isPlaying)
            {
            this.boxSound.play();    
            }  
        }
    }

    wake() {
        /*if(this.temp1x!=box3_1x || box3_1y!=this.temp1y)
        {
            this.box1.x = box3_1x;
            this.box1.y = box3_1y;

            this.temp1x=box3_1x;
            this.temp1y=box3_1y;
        }

        if(this.temp2x!=box3_2x || box3_2y!=this.temp2y)
        {
            this.box2.x = box3_2x;
            this.box2.y = box3_2y;

            this.temp2x=box3_2x;
            this.temp2y=box3_2y;
        }

        if(this.temp3x!=box3_3x || box3_3y!=this.temp3y)
        {
            this.box3.x = box3_3x;
            this.box3.y = box3_3y;

            this.temp3x=box3_3x;
            this.temp3y=box3_3y;
        }*/
    }
}

class YoreLevel4 extends Phaser.Scene {
    constructor(){
        super('yorelevel4');
    }

    create() {
        past = 'yorelevel4';
        future = 'neolevel4';
        currScene = 'past';
        swapPast = 0;
        swapFuture = 0;

        let platebool=false;
       
        const map = this.make.tilemap({key: 'yoremap4'});
        
        
        
        const tileset = map.addTilesetImage('PASTTILES', 'yore-tiles');
        
        this.groundLayer=map.createLayer('floor', tileset);
        this.wallLayer=map.createLayer('Walls', tileset);
        this.treeLayer=map.createLayer('treeoverlay', tileset);
        this.groundLayer.setCollisionByProperty({collides: true});
        this.wallLayer.setCollisionByProperty({collides: true});
        this.treeLayer.setCollisionByProperty({collides: true});
        this.player=this.physics.add.sprite(this.sys.game.config.width / 2+925,this.sys.game.config.height / 2+1100,"Yore");
        this.player.play('idleYore'); //play idle
        this.player.body.setSize(75, 128);
        this.player.setInteractive();
        this.player.setImmovable(true);
        this.wallcube=this.physics.add.sprite(this.sys.game.config.width / 2+675,this.sys.game.config.height*.5+550,'cubePast');
        this.wallcube.body.setImmovable(true);
        this.physics.add.collider(this.player,this.wallcube);
        this.physics.add.collider(this.player,this.groundLayer);
        this.physics.add.collider(this.player,this.wallLayer);
        this.physics.add.collider(this.player,this.treeLayer);
        this.plate1=this.physics.add.sprite(this.sys.game.config.width*.24,this.sys.game.config.height / 2+1000,'plate1p').setScale(.5);
        this.plate2=this.physics.add.sprite(this.sys.game.config.width/2+800,this.sys.game.config.height/2+900,'plate2p').setScale(.5);
        this.plate3=this.physics.add.sprite(this.sys.game.config.width*.46,this.sys.game.config.height*.7+300,'plate3p').setScale(.5);

        const timeSprite = this.physics.add.sprite(this.sys.game.config.width / 2+600,this.sys.game.config.height / 2-100, 'crystal').play('goal');

        this.physics.add.collider(this.player, timeSprite, () => {
            let hudScene = this.scene.get('hud');
            hudScene.scene.remove();
            let futureScene = this.scene.get(future);
            futureScene.scene.remove();
            this.scene.start('endscene');
        });
        this.testBlock = new Box(this, this.sys.game.config.width / 2 + 760,this.sys.game.config.height / 2 + 2500);
        this.testBlock.body.setSize(250, 370);

        this.physics.add.collider(this.player, this.testBlock);
        this.physics.add.collider(this.testBlock, this.groundLayer);
        this.physics.add.collider(this.testBlock, this.wallLayer);
        this.physics.add.collider(this.testBlock, this.treeLayer);
        
        this.target = new Phaser.Math.Vector2();
        
        // Enable camera to follow the player
        this.cameras.main.startFollow(this.player);

        //Point and click movement
        this.input.on('pointerdown', (pointer) =>
        {
            this.target = this.cameras.main.getWorldPoint(pointer.x, pointer.y);

            //Move at 200 px/s:
            this.playerAngle = this.physics.moveToObject(this.player, this.target, 200);
        });

        // launch heads-up-display
        if (hudLoaded == false) {
            this.scene.launch('hud');
            hudLoaded = true;
        }
        if(!platebool)
        {
            platebool=true;
            this.physics.add.overlap(this.testBlock, this.plate2, () => {
                if (hasOverlapped == false) {
                    hasOverlapped = true;
                    
                    const triggered = this.add.sprite(this.sys.game.config.width / 2 + 760,this.sys.game.config.height / 2 + 900, 'dust').setScale(0.5).play('trigger');
                    this.events.emit('plate2');
                }
            });
        }
        

        // call wake() when awoken
        this.events.on(Phaser.Scenes.Events.WAKE, function () {
            this.wake();
        }, this);
        const sscene=this.scene.get('hud');
        this.sound.add('switch');
        // sscene.events.on('solved',function(){
        //    this.sound.play('switch');
        //    this.wallcube.destroy();
            
        // },this);
        sscene.events.on('notsolved',function(){
            platebool=false;
             
         },this);
    }

    update() {
        //controls
        const tolerance = 4;

        const distance = Phaser.Math.Distance.BetweenPoints(this.player, this.target);

        let angle = this.playerAngle * (180/Math.PI);

        if (this.player.body.speed > 0)
        {
            isMoving = true;

            if (distance < tolerance)
            {
                this.player.body.reset(this.target.x, this.target.y);
            }

            if (this.player.anims.isPlaying && this.player.anims.currentAnim.key != 'walkLYore' && ((angle < -135 && angle >= -180) || (angle > 135 && angle <= 180))) {
                this.player.play('walkLYore');
            }
            else if (this.player.anims.isPlaying && this.player.anims.currentAnim.key != 'walkRYore' && ((angle > -45 && angle <= 0) || (angle < 45 && angle >= 0))){
                this.player.play('walkRYore');
            }
            else if (this.player.anims.isPlaying && this.player.anims.currentAnim.key != 'walkUYore' && ((angle <= 135 && angle >= 90) || (angle >= 45 && angle <= 90))){
                this.player.play('walkUYore');
            }
            else if (this.player.anims.isPlaying && this.player.anims.currentAnim.key != 'walkDYore' && ((angle >= -135 && angle <= -90) || (angle <= -45 && angle >= -90))){
                this.player.play('walkDYore');
            }
        }
        else{
            isMoving = false;

            if (this.player.anims.isPlaying && this.player.anims.currentAnim.key != 'idleYore') {
                this.player.play('idleYore');
            }
        }

        box4x = this.testBlock.x;
        box4y = this.testBlock.y;
    }

    wake() {
        
    }
}

class NeoLevel4 extends Phaser.Scene {
    constructor(){
        super('neolevel4');
    }

    create() {
        this.temp1x=0;
        this.temp1y=0;
        let sceneref=this.scene.get('yorelevel4');
        let sscene=this.scene.get('hud');
        
        const map = this.make.tilemap({key: 'neomap4'});
        let platebool=false;
        let platebool2=false;
        let platebool3=false;
        let platebool4=false;
        //let completeBool=true;

        const tileset = map.addTilesetImage('FUTURETILES', 'neo-tiles');
        this.groundLayer=map.createLayer('Floor', tileset);
        this.wallLayer=map.createLayer('Wall', tileset);
        this.treeLayer=map.createLayer('tree overlay', tileset);
        this.groundLayer.setCollisionByProperty({collides: true});
        this.wallLayer.setCollisionByProperty({collides: true});
        this.treeLayer.setCollisionByProperty({collides: true});
        this.player=this.physics.add.sprite(this.sys.game.config.width / 2,this.sys.game.config.height / 2,"Neo");
        this.player.play('idleNeo');
        this.player.body.setSize(80, 128);
        this.player.setInteractive();
        this.player.setImmovable(true);
        this.wallcube=this.physics.add.sprite(this.sys.game.config.width / 2+675,this.sys.game.config.height*.5+550,'cubeFuture');
        this.wallcube.setImmovable(true);
        
        this.physics.add.collider(this.player,this.wallcube);

        this.plate1=this.physics.add.sprite(this.sys.game.config.width*.24,this.sys.game.config.height / 2+1000,'plate1f').setScale(.5);
        //this.plate2=this.physics.add.sprite(this.sys.game.config.width*.6,this.sys.game.config.height*.6,'plate2f').setScale(.5);
        this.plate3=this.physics.add.sprite(this.sys.game.config.width*.46,this.sys.game.config.height*.7+300,'plate3f').setScale(.5);
        this.plate4=this.physics.add.sprite(this.sys.game.config.width*.7+2000,this.sys.game.config.height *.6+600,'plate3f').setScale(.5);
        const timeSprite = this.physics.add.sprite(this.sys.game.config.width / 2,this.sys.game.config.height / 2 + 250, 'crystal').play('goal');

        this.physics.add.collider(this.player, timeSprite, () => {
            let hudScene = this.scene.get('hud');
            hudScene.scene.remove();
            let pastScene = this.scene.get(past);
            pastScene.scene.remove();
            this.scene.start('endscene');
        })
        this.testBlock = new Box(this, box4x, box4y);
        this.testBlock.setTexture('cubeFuture');
        this.testBlock.setDepth(2);
        this.testBlock.body.setSize(250, 185);
        this.testBlock.body.setOffset(0, 190);
        this.physics.add.collider(this.player, this.testBlock);
        this.physics.add.collider(this.testBlock, this.groundLayer);
        this.physics.add.collider(this.testBlock, this.wallLayer);
        this.physics.add.collider(this.testBlock, this.treeLayer);

        if(!platebool)
        {
            platebool=true;
            this.physics.add.overlap(this.testBlock, this.plate1, () => {
                if (hasOverlapped == false) {
                    hasOverlapped = true;
                    
                    const triggered = this.add.sprite(this.sys.game.config.width / 2 + 760,this.sys.game.config.height / 2 + 900, 'dust').setScale(0.5).play('trigger');
                    this.events.emit('starttime');
                }
            });
        }
        sceneref.events.on('plate2',function(){
            platebool2=true;
        },this)
        hasOverlapped=false;
        if(!platebool3)
        {
            platebool3=true;
            this.physics.add.overlap(this.testBlock, this.plate3, () => {
                if (hasOverlapped == false&&platebool==true&&platebool2==true) {
                    hasOverlapped = true;
                    
                    const triggered = this.add.sprite(this.sys.game.config.width / 2 + 760,this.sys.game.config.height / 2 + 900, 'dust').setScale(0.5).play('trigger');
                }
            });
        }
        hasOverlapped=false;
        if(!platebool4)
        {
            platebool4=true;
            this.physics.add.overlap(this.testBlock, this.plate2, () => {
                if (hasOverlapped == false&&platebool==true&&platebool2==true&&platebool3==true) {
                    hasOverlapped = true;
                    
                    const triggered = this.add.sprite(this.sys.game.config.width / 2 + 760,this.sys.game.config.height / 2 + 900, 'dust').setScale(0.5).play('trigger');
                    this.scene.emit('complete');
                }
            });
        }
        this.sound.add('switch');
        sscene.events.on('solved',function(){
           this.sound.play('switch');
           this.wallcube.destroy();
            
        },this);
        sscene.events.on('notsolved',function(){
            platebool1=false;
            platebool2=false;
            platebool3=false;
            platebool4=false;
             
         },this);


        
        this.target = new Phaser.Math.Vector2();
        
        // Enable camera to follow the player
        this.cameras.main.startFollow(this.player);

        //Point and click movement
        this.input.on('pointerdown', (pointer) =>
        {
            this.target = this.cameras.main.getWorldPoint(pointer.x, pointer.y);

            //Move at 200 px/s:
            this.playerAngle = this.physics.moveToObject(this.player, this.target, 200);
        });

        // launch heads-up-display
        if (hudLoaded == false) {
            this.scene.launch('hud');
            hudLoaded = true;
        }

        // call wake() when awoken
        this.events.on(Phaser.Scenes.Events.WAKE, function () {
            this.wake();
        }, this);
    }

    update() {
        //controls
        const tolerance = 4;

        const distance = Phaser.Math.Distance.BetweenPoints(this.player, this.target);

        let angle = this.playerAngle * (180/Math.PI);

        if (this.player.body.speed > 0)
        {
            isMoving = true;

            if (distance < tolerance)
            {
                this.player.body.reset(this.target.x, this.target.y);
            }

            if (this.player.anims.isPlaying && this.player.anims.currentAnim.key != 'walkLNeo' && ((angle < -135 && angle >= -180) || (angle > 135 && angle <= 180))) {
                this.player.play('walkLNeo');
            }
            else if (this.player.anims.isPlaying && this.player.anims.currentAnim.key != 'walkRNeo' && ((angle > -45 && angle <= 0) || (angle < 45 && angle >= 0))){
                this.player.play('walkRNeo');
            }
            else if (this.player.anims.isPlaying && this.player.anims.currentAnim.key != 'walkDNeo' && ((angle <= 135 && angle >= 90) || (angle >= 45 && angle <= 90))){
                this.player.play('walkDNeo');
            }
            else if (this.player.anims.isPlaying && this.player.anims.currentAnim.key != 'walkUNeo' && ((angle >= -135 && angle <= -90) || (angle <= -45 && angle >= -90))){
                this.player.play('walkUNeo');
            }
        }
        else{
            isMoving = false;

            if (this.player.anims.isPlaying && this.player.anims.currentAnim.key != 'idleNeo') {
                this.player.play('idleNeo');
            }
        }
    }

    wake() {
        if(this.temp1x!=box4x || box4y!=this.temp1y)
        {
            this.testBlock.x = box4x;
            this.testBlock.y = box4y;

            this.temp1x=box4x;
            this.temp1y=box4y;
        }
    }
}

class HUD extends Phaser.Scene {
    constructor(){
        super('hud');
    }

    create(){
        this.sound.add('switch');
        this.timer=this.sound.add('timer');
        const sscene=this.scene.get('neolevel4');
        this.timer.loop=true;
        this.completion=false;
        sscene.events.on('starttime',function(){
            this.timedEvent=this.time.delayedCall(20000, this.onEvent, [], this);
            this.timer.play();
        });
        //this.mapButton = this.add.rectangle(550, 1000, 200, 75, 0xababab, 1).setInteractive();
        
        
       
        //this.mapButton.on('pointerdown', () =>
        //{ 
            //this.groundLayer.setVisible(false);
            //this.groundLayer.setCollisionByProperty({collides: false});
            //this.cameras.main.shake(500,.005);
            //this.sound.play('switch');
            //this.timedEvent = this.time.addEvent({ delay: 20000, this.onEvent, callbackScope: this });
            
            //this.timer.loop=true;
            
            
            
        //});
        this.swapButton = this.add.image(100, 1000, 'clock').setInteractive().setScale(0.8);
        this.muteButton = this.add.image(1750,1000,'mute').setInteractive().setScale(0.8);
        this.fullButton = this.add.image(1850, 1005
            , 'enterFull').setInteractive().setScale(0.5);
        this.resetButton = this.add.image(1650, 1000, 'reset').setInteractive().setScale(0.8);

        let theMusic=this.sound.add('music');
        theMusic.loop=true;

        if (musicPlaying == false) {
            theMusic.play();
            musicPlaying = true;
        }

        if ((localStorage.getItem('audioMute'))) {
            theMusic.setMute(!theMusic.mute);
        }

        if (!(localStorage.getItem('audioMute'))) {
            this.muteButton.setTexture('unmute')
            musicPlaying = true;

        }
        else{
            this.muteButton.setTexture('mute');
            musicPlaying = false;
        }

        this.swapButton.on('pointerdown', () =>
        {
            this.swapButton.setTexture('clockPressed')

            if (isMoving == false) {
                console.log("swapped");

                if (currScene == 'past' && swapFuture == 0) {
                    currScene = 'future';
                    swapFuture += 1;
                    this.scene.sleep(past);
                    this.scene.run(future);
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

        this.swapButton.on('pointerup', () => {
            this.swapButton.setTexture('clock')
        });

        this.muteButton.on('pointerdown', () =>
        {
            this.muteButton.setTint(0x2c2c2c)

            if ((localStorage.getItem('audioMute'))) {
                this.muteButton.setTexture('unmute')
                localStorage.removeItem('audioMute');
                theMusic.setMute(!theMusic.mute);
            }
            else{
                localStorage.setItem('audioMute','mute');
                this.muteButton.setTexture('mute');
                theMusic.setMute(!theMusic.mute);
            }
            console.log('hello');
            
        });

        this.muteButton.on('pointerup', () => {
            this.muteButton.clearTint()
        });

        this.fullButton.on('pointerdown', () => {
            if (this.scale.isFullscreen) {
                this.scale.stopFullscreen();
                this.fullButton.setTexture('enterFull').setScale(0.5);
            } else {
                this.scale.startFullscreen();
                this.fullButton.setTexture('exitFull').setScale(0.8);
            }
        });

        this.resetButton.on('pointerdown', () =>
        {
            this.resetButton.setTint(0x2c2c2c)

            let pastScene = this.scene.get(past);
            let futScene = this.scene.get(future);
 
            futScene.scene.start(pastScene);

            currScene = 'past';
            swapPast = 0;
            swapFuture = 0;
        });

        this.resetButton.on('pointerup', () => {
            this.resetButton.clearTint()
        });
        
        sscene.events.on('complete',function(){
            this.completion=true;
        },this);
    }
    update()
    {
        if(this.timer.isPlaying)
        {
        this.timer.rate=1+this.timedEvent.getProgress()*2;
        } 
    }
    
    onEvent()
    {
    console.log('heehee')
    
    this.timer.stop();
    if(this.completion)
    {
    this.events.emit('solved');
    }
    else{
        this.events.emit('notsolved')
    }
    }
}

class EndScene extends Phaser.Scene {
    constructor() {
        super('endscene')
    }
    preload(){
        this.load.video('ending', './assets/ending.mp4');
    }

    create() {
        const end = this.add.video(1920*.5, 1080*.5, 'ending').setScale(2);
        
        end.on('locked', () => {
            let message = this.add.text(1920*5, 1080*5, 'Click to play video');
            end.on('unlocked', () => {
                message.destroy();
            });
        });
        
        this.time.delayedCall(1000, ()=> end.play());

        this.time.delayedCall(6000, ()=> {
            this.cameras.main.fadeOut(1000, 0, 0, 0);
            this.scene.start('credits');
        });
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
    scene: [Loading, Intro, MainMenu,, Credits, YoreLevel1, NeoLevel1,YoreLevel2, NeoLevel2, YoreLevel3, NeoLevel3, YoreLevel4, NeoLevel4, HUD, EndScene],
    title: "Final Game",
});