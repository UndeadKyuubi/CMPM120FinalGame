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
        this.load.image('player', './assets/playerplaceholder.png');
        this.load.image('background', './assets/Sprite-0002.png');
        let player=null;
        let cursors=null;
        let keyW=null;
        let keyA=null;
        let keyS=null;
        let keyD=null;

    }
    create(){
    this.player=this.matter.add.sprite(this.sys.game.config.width / 2,this.sys.game.config.height / 2,"player");
    this.add.image(this.sys.game.config.width / 2,this.sys.game.config.height / 2,'background');
    this.matter.world.setBounds(0,0,3000,3000);
    // Enable camera to follow the player
    this.cameras.main.startFollow(this.player, true, 0.5, 0.5);
    //keybinds
    this.cursors = this.input.keyboard.createCursorKeys();
    this.keyW = this.input.keyboard.addKey('W');
    this.keyA = this.input.keyboard.addKey('A');
    this.keyS = this.input.keyboard.addKey('S');
    this.keyD = this.input.keyboard.addKey('D');

    }
    update() {
        //controls
        this.player.setVelocity(0);
    
        
        if (this.cursors.up.isDown || this.keyW.isDown) {
            this.player.setVelocityY(-10);
        } else if (this.cursors.down.isDown || this.keyS.isDown) {
            this.player.setVelocityY(10);
        }
    
        if (this.cursors.left.isDown || this.keyA.isDown) {
            this.player.setVelocityX(-10);
        } else if (this.cursors.right.isDown || this.keyD.isDown) {
            this.player.setVelocityX(10);
        }
    }
    
    
}
// class Future extends Phaser.scene{
//     constructor()
//     {
//         super('future');
//     }
// }
const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080,
        
    },
    physics:{
        default:'matter',
        matter:{
            gravity:{
               y:0
            },
            debug:true
        }
    },
    scene: [Intro,First],
    title: "physics Game",
});