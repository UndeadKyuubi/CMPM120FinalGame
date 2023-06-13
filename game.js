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

let hudLoaded = false;
let musicPlaying = false;

let animsLoaded = false;

//Main Menu
class MainMenu extends Phaser.Scene {
    constructor() {
        super('mainMenu')
    }
    preload() {
        this.load.image('titleBackground', '/assets/testTitleBackground.jpg');
        //this.load.image('title', './assets/testTitle.jpg');
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
        this.load.image('enterFull', './assets/enterFull.png');
        this.load.image('exitFull', './assets/exitFull.png');
        this.load.image('mute', './assets/Muted.png');
        this.load.image('unmute', './assets/Unmuted.png');
        this.load.tilemapTiledJSON('yoremap1', './assets/yoremap1.json');
        this.load.tilemapTiledJSON('neomap1', './assets/neomap1.json');
        this.load.image('yore-tiles', './assets/yoreTiles.png'); 
        this.load.image('neo-tiles', './assets/neoTiles.png');
        this.load.image('reset', './assets/reset.png');
        this.load.image('clock', './assets/clock.png');
        this.load.image('clockPressed', './assets/clockPressed.png');
        this.load.audio('timer','./assets/tick.mp3');
        this.load.video('logo', './assets/Studio_Animation.mp4');
    }

    create() {
        // Testing logo animation
        
        // this.cameras.main.fadeIn(1000, 0,0,0);

        // const studio = this.add.video(1920*.5, 1080*.5, 'logo');
        
        // studio.on('locked', () => {
        //     let message = this.add.text(1920*5, 1080*5, 'Click to play video');
        //     studio.on('unlocked', () => {
        //         message.destroy();
        //     });
        // });
        
        // studio.play();

        // this.time.delayedCall(10000, ()=> {
        //     this.cameras.main.fadeOut(1000, 0, 0, 0);
        // });
        
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
        //Bounce effect
        /*
        var scaleTween = this.tweens.add({
            targets: title,
            scaleX: 1.2,
            scaleY: 1.2,
            duration: 1000,
            yoyo: true,
            repeat: -1
        });
        */

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
                    this.scene.start('yorelevel1');
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

        this.add.text((this.sys.game.config.width / 2), (this.sys.game.config.height / 2 - 200), "Keven Paw - Production Lead")
        .setAlign("center")
        .setFontSize(50)
        .setOrigin(0.5, 0.5);

        this.add.text((this.sys.game.config.width / 2), (this.sys.game.config.height / 2 - 150), "Josey Verespey - Executive Vice Producer, Narrative Lead")
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

        const sscene=this.scene.get('hud');
        sscene.events.on('solved',function(){
            console.log('pongis');
        },this);

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

        //crystal
        const timeSprite = this.physics.add.sprite(this.sys.game.config.width / 2 + 760,this.sys.game.config.height / 2 + 50, 'crystal').play('goal');

        this.physics.add.collider(this.player, timeSprite, () => {
            let futureScene = this.scene.get(future);
            futureScene.scene.remove();
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
        this.boxLayer = map.createLayer('neoBoxOnly', tileset);
        this.treeLayer = map.createLayer('neoTrees', tileset);

        this.groundLayer.setCollisionByProperty({collides: true});
        this.platformLayer.setCollisionByProperty({collides: true});
        this.neoLayer.setCollisionByProperty({collides: true});
        this.boxLayer.setCollisionByProperty({collides: true});
        this.treeLayer.setCollisionByProperty({collides: true});
        //this.solidLayer.renderDebug(this.add.graphics());

        this.player=this.physics.add.sprite(this.sys.game.config.width / 2 + 1300,this.sys.game.config.height / 2 + 2500,"Neo");
        this.player.play('idleNeo');
        this.player.body.setSize(80, 128);
        this.player.setInteractive();
        this.player.setImmovable(true);

        const timeSprite = this.physics.add.sprite(this.sys.game.config.width / 2 + 760,this.sys.game.config.height / 2 + 50, 'crystal').play('goal');

        this.physics.add.collider(this.player, timeSprite, () => {
            let pastScene = this.scene.get(past);
            pastScene.scene.remove();
            this.scene.start('yorelevel2');
        })
        
        this.physics.add.collider(this.player, this.groundLayer);
        this.physics.add.collider(this.player, this.platformLayer);
        this.physics.add.collider(this.player, this.neoLayer);
        this.physics.add.collider(this.player, this.boxLayer);
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
        this.physics.add.collider(this.testBlock, this.groundLayer);
        this.physics.add.collider(this.testBlock, this.platformLayer);
        this.physics.add.collider(this.testBlock, this.neoLayer);
        this.physics.add.collider(this.testBlock, this.boxLayer);
        this.physics.add.collider(this.testBlock, this.treeLayer);

        this.physics.add.collider(this.player, this.testBlock);

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
        console.log('bruh')

        past = 'yorelevel2';
        future = 'neolevel2';
        currScene = 'past';
        swapPast = 0;
        swapFuture = 0;

        this.lights.enable().setAmbientColor(0x000000);
        this.light = this.lights.addLight(this.sys.game.config.width / 2,this.sys.game.config.height / 2, 128*4).setColor(0x00FFFF).setIntensity(1);

        this.groundLayer.setPipeline("Light2D");
        this.platformLayer.setPipeline("Light2D");
        this.yoreLayer.setPipeline("Light2D");
        this.treeLayer.setPipeline("Light2D");

        this.neoImage = this.add.sprite(this.sys.game.config.width / 2,this.sys.game.config.height / 2,"Neo").setAlpha(0.5);
        this.neoImage.play('idleNeo');

        this.player=this.physics.add.sprite(this.sys.game.config.width / 2,this.sys.game.config.height / 2,"Yore");
        this.player.play('idleYore'); //play idle
        this.player.body.setSize(75, 128);
        this.player.setInteractive();
        this.player.setImmovable(true);

        const timeSprite = this.physics.add.sprite(this.sys.game.config.width / 2,this.sys.game.config.height / 2 + 250, 'crystal').play('goal');

        this.physics.add.collider(this.player, timeSprite, () => {
            let futureScene = this.scene.get(future);
            futureScene.scene.remove();
            this.scene.start('yorelevel3');
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
        console.log('moment')

        this.player=this.physics.add.sprite(this.sys.game.config.width / 2 + 50,this.sys.game.config.height / 2,"Neo");
        this.player.play('idleNeo');
        this.player.body.setSize(80, 128);
        this.player.setInteractive();
        this.player.setImmovable(true);

        const timeSprite = this.physics.add.sprite(this.sys.game.config.width / 2,this.sys.game.config.height / 2 + 250, 'crystal').play('goal');

        this.physics.add.collider(this.player, timeSprite, () => {
            let pastScene = this.scene.get(past);
            pastScene.scene.remove();
            this.scene.start('yorelevel3');
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

        this.player=this.physics.add.sprite(this.sys.game.config.width / 2,this.sys.game.config.height / 2,"Yore");
        this.player.play('idleYore'); //play idle
        this.player.body.setSize(75, 128);
        this.player.setInteractive();
        this.player.setImmovable(true);

        const timeSprite = this.physics.add.sprite(this.sys.game.config.width / 2,this.sys.game.config.height / 2 + 250, 'crystal').play('goal');

        this.physics.add.collider(this.player, timeSprite, () => {
            let futureScene = this.scene.get(future);
            futureScene.scene.remove();
            this.scene.start('yorelevel4');
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
        
    }
}

class NeoLevel3 extends Phaser.Scene {
    constructor(){
        super('neolevel3');
    }

    create() {
        this.player=this.physics.add.sprite(this.sys.game.config.width / 2 + 50,this.sys.game.config.height / 2,"Neo");
        this.player.play('idleNeo');
        this.player.body.setSize(80, 128);
        this.player.setInteractive();
        this.player.setImmovable(true);

        const timeSprite = this.physics.add.sprite(this.sys.game.config.width / 2,this.sys.game.config.height / 2 + 250, 'crystal').play('goal');

        this.physics.add.collider(this.player, timeSprite, () => {
            let pastScene = this.scene.get(past);
            pastScene.scene.remove();
            this.scene.start('yorelevel4');
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
    }

    wake() {
        
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

        this.player=this.physics.add.sprite(this.sys.game.config.width / 2,this.sys.game.config.height / 2,"Yore");
        this.player.play('idleYore'); //play idle
        this.player.body.setSize(75, 128);
        this.player.setInteractive();
        this.player.setImmovable(true);

        const timeSprite = this.physics.add.sprite(this.sys.game.config.width / 2,this.sys.game.config.height / 2 + 250, 'crystal').play('goal');

        this.physics.add.collider(this.player, timeSprite, () => {
            let hudScene = this.scene.get('hud');
            hudScene.scene.remove();
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
        
    }
}

class NeoLevel4 extends Phaser.Scene {
    constructor(){
        super('neolevel4');
    }

    create() {
        this.player=this.physics.add.sprite(this.sys.game.config.width / 2 + 50,this.sys.game.config.height / 2,"Neo");
        this.player.play('idleNeo');
        this.player.body.setSize(80, 128);
        this.player.setInteractive();
        this.player.setImmovable(true);

        const timeSprite = this.physics.add.sprite(this.sys.game.config.width / 2,this.sys.game.config.height / 2 + 250, 'crystal').play('goal');

        this.physics.add.collider(this.player, timeSprite, () => {
            let hudScene = this.scene.get('hud');
            hudScene.scene.remove();
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
    }

    wake() {
        
    }
}

class HUD extends Phaser.Scene {
    constructor(){
        super('hud');
    }

    create(){
        this.mapButton = this.add.rectangle(550, 1000, 200, 75, 0xababab, 1).setInteractive();
        this.sound.add('switch');
        this.timer=this.sound.add('timer');
        this.timer.loop=true;
        this.mapButton.on('pointerdown', () =>
        { 
            //this.groundLayer.setVisible(false);
            //this.groundLayer.setCollisionByProperty({collides: false});
            this.cameras.main.shake(500,.005);
            this.sound.play('switch');
            //this.timedEvent = this.time.addEvent({ delay: 20000, this.onEvent, callbackScope: this });
            this.timedEvent=this.time.delayedCall(10000, this.onEvent, [], this);
            //this.timer.loop=true;
            this.timer.play();
            
            
        });
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
    this.events.emit('solved');
    }
}

class EndScene extends Phaser.Scene {
    constructor() {
        super('endscene')
    }

    create() {
        console.log('this is the end scene')
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
    scene: [MainMenu, Credits, YoreLevel1, NeoLevel1, YoreLevel2, NeoLevel2, YoreLevel3, NeoLevel3, YoreLevel4, NeoLevel4, HUD, EndScene],
    title: "Final Game",
});