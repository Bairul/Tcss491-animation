const gameEngine = new GameEngine();
const ASSET_MANAGER = new AssetManager();

var imageQueue = [
	"./assets/sprites/base_player.png",
	"./assets/background/backdrop.png"
];

for (let i = 0; i < imageQueue.length; i++) {
	ASSET_MANAGER.queueDownload(imageQueue[i]);
}

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");

	gameEngine.addEntity(new Player(gameEngine, -64, 200));

	gameEngine.init(ctx);
	gameEngine.start();
});
