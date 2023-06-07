class coreGameplay extends Phaser.Scene {
    constructor(){
        super('coregameplay');
    }

    preload(){
        this.load.image('player', 'test2.png');
    }

    create(){
        this.player = this.physics.add.sprite(this.sys.game.config.width / 2, this.sys.game.config.height / 2, 'player');
        const block=this.physics.add.image(this.sys.game.config.width *.3, this.sys.game.config.height * .2, 'box.png')
        this.cameras.main.startFollow(this.player);

        this.target = new Phaser.Math.Vector2();

        this.input.on('pointerdown', (pointer) => {
            this.target.x = pointer.x;
            this.target.y = pointer.y;

            this.physics.moveToObject(this.player, this.target, 200);
        });
    }

    update(){
        const tolerance = 4;

        const distance = Phaser.Math.Distance.BetweenPoints(this.player, this.target);

        if (this.player.body.speed > 0) {
            if (distance < tolerance) {
                this.player.body.reset(this.target.x, this.target.y);
            }
        }
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
    scene: [coreGameplay],
    title: "Core Gameplay Prototype",
});