class Player {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });
        // spritesheet
        this.spritesheet = ASSET_MANAGER.getAsset("./assets/sprites/base_player.png");
        this.back = ASSET_MANAGER.getAsset("./assets/background/backdrop.png");
        this.vely = 0;
        this.accy = 0;
        this.applied = false;

        // animations
        this.animations;
        this.loadAnimations();
    };

    loadAnimations() {
        this.animations = new Animator(this.spritesheet, 0, 0, 32 * 4, 64 * 4, 23, this.game.frame_duration, 0, false, true);
    };
    

    applyVertiForce(accel) {
        this.accy += accel;
    }

    update() {
        this.applyVertiForce(0.1);

        if (this.animations.currentFrame() == 8) {
            if (!this.applied) {
                this.applyVertiForce(-5);
                this.applied = true;
            }
        } else {
            this.applied = false;
        }

        this.x += 2.25;
        this.vely += this.accy;
        this.y += this.vely;

        if (this.y > 200) {
            this.y = 200;
            this.vely = 0;
        }

        // I used this page to approximate my constants
        // https://web.archive.org/web/20130807122227/http://i276.photobucket.com/albums/kk21/jdaster64/smb_playerphysics.png
        // I converted these values from hex and into units of pixels and seconds.
      

        this.accy = 0;
    };

    draw(ctx) {
	    ctx.drawImage(this.back, 0, 0);
        this.animations.drawFrame(this.game.clockTick, ctx, this.x, this.y, 1);
    };
};