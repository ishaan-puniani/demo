// create a Pixi application
let app = new PIXI.Application({ width: 1280, height: 720 });
let animationSpeed = 0.167; //0.167;// 6 fps
// add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);

let runnerAnimation,
  spritesheetname = "small/dog_1_splitted-0.json";

// load sprite sheet image + data file, call setup() if completed
PIXI.loader.add(spritesheetname).load(setup);

function setup() {
  const referencedSpriteSheet = PIXI.loader.resources[spritesheetname];
  const multiPack = referencedSpriteSheet.data.meta.related_multi_packs;
  let multiPackTexttureMap = { ...referencedSpriteSheet.spritesheet.textures };
  if (multiPack && multiPack.length > 0) {
    multiPack.forEach((mpack) => {
      const textureName = mpack.replace(".json", "");
      const _mpackSheet = PIXI.loader.resources[textureName].spritesheet;
      if (_mpackSheet.textures) {
        multiPackTexttureMap = Object.assign(
          multiPackTexttureMap,
          _mpackSheet.textures
        );
      }
    });
  }

  const animationSeq = referencedSpriteSheet.data.animations["run"];
  const animationSeqTextures = animationSeq.map(
    (frame) => multiPackTexttureMap[frame]
  );
  app.stage.scale.x = 3;
  app.stage.scale.y = 3;

  // create an animated sprite
  createRunAnimation(animationSeqTextures);

  runnerAnimation.play();

  // add it to the stage and render!
  app.ticker.add((delta) => gameLoop(delta));
}

function createRunAnimation(animationArray) {
  runnerAnimation = new PIXI.AnimatedSprite(animationArray);
  runnerAnimation.animationSpeed = animationSpeed;
  runnerAnimation.position.set(0, 0); // almost bottom-left corner of the canvas
  runnerAnimation.loop = true;
  app.stage.addChild(runnerAnimation);
}

function gameLoop(delta) {}
