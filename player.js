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
        // gravity
        this.applyVertiForce(0.1);

        // jump force
        if (this.animations.currentFrame() == 8) {
            if (!this.applied) {
                this.applyVertiForce(-5);
                this.x -= 5;
                this.y += 4;
                this.applied = true;
            }
        } else {
            this.applied = false;
        }

        this.x += 2.25;
        // euler integration for y
        this.vely += this.accy;
        this.y += this.vely;

        // touching ground
        if (this.y > 200) {
            this.y = 200;
            this.vely = 0;
        }

        // loop
        if (this.x > this.game.ctx.canvas.width + 128) {
            this.x = -64;
        }

        this.accy = 0;
    };

    draw(ctx) {
	    ctx.drawImage(this.back, 0, 0);
        this.animations.drawFrame(this.game.clockTick, ctx, this.x, this.y, 1);
    };
};