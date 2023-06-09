let GobalItemX=0;
let GlobalItemY=0;
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
            text.on('pointerout', function() {
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
        
        const testBlock = this.physics.add.image(this.sys.game.config.width / 4, this.sys.game.config.height / 2, 'box').setCollideWorldBounds().setInteractive();

        testBlock.setBounce(0.5);
        testBlock.setPushable(true);
        this.player.setImmovable(true);
        testBlock.setVelocity(0);

        testBlock.setDragX(1000);
        testBlock.setDragY(1000);

        this.physics.add.collider(this.player, testBlock);

        this.scene.launch('hud');
    }

    update() {
        //controls
        const tolerance = 4;

        const distance = Phaser.Math.Distance.BetweenPoints(this.player, this.target);

        if (this.player.body.speed > 0)
        {
            if (distance < tolerance)
            {
                this.player.body.reset(this.target.x, this.target.y);
            }
        }
    }
}

class Second extends Phaser.Scene {
    constructor(){
        super('second');
    }
}

class HUD extends Phaser.Scene {
    constructor(){
        super('hud');
    }

    create(){
        this.swapButton = this.add.rectangle(150, 1000, 200, 75, 0xababab, 1).setInteractive();

        this.swapButton.on('pointerdown', () =>
        {
            console.log("swapped");
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
    scene: [Intro, First, HUD, Second],
    title: "Final Game",
});