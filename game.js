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

// Main Menu

class Intro extends Phaser.Scene {
    constructor() {
        super('intro')
    }

    preload() {
        this.load.image('box', './assets/box.png');
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
        this.load.image('enterFull', './assets/enterFull.png');
        this.load.image('exitFull', './assets/exitFull.png');
        this.load.image('mute', './assets/Muted.png');
        this.load.image('unmute', './assets/Unmuted.png');
        this.load.tilemapTiledJSON('testLevel1', './assets/testLevel1.json');
        this.load.image('proto_tiles', './assets/protoTiles.png');
        this.load.tilemapTiledJSON('testLevel3', './assets/testLevel3.tmj')  
        this.load.image('reset', './assets/reset.png');
        this.load.image('clock', './assets/clock.png');
    }

    create() {
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

        let text=this.add.text(1920/2-250,540, "Click to start").setFontSize(60).setInteractive();
    
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
        this.setBounce(0)
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

    create(){
        this.boxSound = this.sound.add('scrape');

        this.lights.enable().setAmbientColor(0x000000);
        this.light = this.lights.addLight(this.sys.game.config.width / 2,this.sys.game.config.height / 2, 128*4).setColor(0x00FFFF).setIntensity(1);

        const map = this.make.tilemap({key: 'testLevel1'});

        const tileset = map.addTilesetImage('protoTiles', 'proto_tiles');

        this.groundLayer = map.createLayer('Ground', tileset);
        this.platformLayer = map.createLayer('Platforms', tileset);
        this.yoreLayer = map.createLayer('YoreOnly', tileset);
        this.switchesLayer = map.createLayer('Switches', tileset);
        this.goalLayer = map.createLayer('Goal', tileset);

        this.groundLayer.setCollisionByProperty({collides: true});

        this.groundLayer.setPipeline("Light2D");
        this.platformLayer.setPipeline("Light2D");
        this.yoreLayer.setPipeline("Light2D");
        this.switchesLayer.setPipeline("Light2D");
        this.goalLayer.setPipeline("Light2D");

        this.mapButton = this.add.rectangle(550, 1000, 200, 75, 0xababab, 1).setInteractive();
        this.sound.add('switch');
        this.mapButton.on('pointerdown', () =>
        { 
            this.groundLayer.setVisible(false);
            this.groundLayer.setCollisionByProperty({collides: false});
            this.cameras.main.shake(500,.005);
            this.sound.play('switch');
            
        });

        this.player=this.physics.add.sprite(this.sys.game.config.width / 2,this.sys.game.config.height / 2,"Yore");
        this.player.play('idleYore'); //play idle
        this.player.body.setSize(75, 128);
        this.player.setInteractive();
        this.player.setImmovable(true);

        this.physics.add.collider(this.player, this.groundLayer);
        
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
        this.testBlock = new Box(this, this.sys.game.config.width / 4, this.sys.game.config.height +100);

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
        this.light.x=lightX;
        this.light.y=lightY;
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

        const map = this.make.tilemap({key: 'testLevel1'});

        const tileset = map.addTilesetImage('protoTiles', 'proto_tiles');

        this.groundLayer = map.createLayer('Ground', tileset);
        this.platformLayer = map.createLayer('Platforms', tileset);
        this.neoLayer = map.createLayer('NeoOnly', tileset);
        this.switchesLayer = map.createLayer('Switches', tileset);
        this.goalLayer = map.createLayer('Goal', tileset);

        this.groundLayer.setCollisionByProperty({collides: true});
        //this.solidLayer.renderDebug(this.add.graphics());

        this.player=this.physics.add.sprite(this.sys.game.config.width / 2 + 50,this.sys.game.config.height / 2,"Neo");
        this.player.play('idleNeo');
        this.player.body.setSize(80, 128);
        this.player.setInteractive();
        this.player.setImmovable(true);

        this.physics.add.collider(this.player, this.groundLayer);
        
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

    wake() {
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

        this.player=this.physics.add.sprite(this.sys.game.config.width / 2,this.sys.game.config.height / 2,"Yore");
        this.player.play('idleYore'); //play idle
        this.player.body.setSize(75, 128);
        this.player.setInteractive();
        this.player.setImmovable(true);
        
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

class NeoLevel2 extends Phaser.Scene {
    constructor(){
        super('neolevel2');
    }

    create() {
        this.player=this.physics.add.sprite(this.sys.game.config.width / 2 + 50,this.sys.game.config.height / 2,"Neo");
        this.player.play('idleNeo');
        this.player.body.setSize(80, 128);
        this.player.setInteractive();
        this.player.setImmovable(true);
        
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
        this.swapButton = this.add.image(100, 1000, 'clock').setInteractive().setScale(0.8);
        this.muteButton = this.add.image(1750,1000,'mute').setInteractive().setScale(0.8);
        this.fullButton = this.add.image(1850, 1000, 'enterFull').setInteractive();
        this.resetButton = this.add.image(1650, 1000, 'reset').setInteractive().setScale(0.8);

        let theMusic=this.sound.add('music');

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

        this.muteButton.on('pointerdown', () =>
        {
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

        this.fullButton.on('pointerdown', () => {
            if (this.scale.isFullscreen) {
                this.scale.stopFullscreen();
                this.fullButton.setTexture('enterFull');
            } else {
                this.scale.startFullscreen();
                this.fullButton.setTexture('exitFull');
            }
        });

        this.resetButton.on('pointerdown', () =>
        {
            let pastScene = this.scene.get(past);
            let futScene = this.scene.get(future);
 
            futScene.scene.start(pastScene);

            currScene = 'past';
            swapPast = 0;
            swapFuture = 0;
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
    scene: [Intro, YoreLevel1, NeoLevel1, YoreLevel2, NeoLevel2, YoreLevel3, NeoLevel3, YoreLevel4, NeoLevel4, HUD],
    title: "Final Game",
});