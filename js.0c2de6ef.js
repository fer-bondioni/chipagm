// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function(modules, cache, entry, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject.parcelRequire === 'function' &&
    globalObject.parcelRequire;
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function(id, exports) {
    modules[id] = [
      function(require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  globalObject.parcelRequire = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function() {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"b8dcfe8630a76380e8047954456aec0a":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = 1234;
var HMR_ENV_HASH = "d751713988987e9331980363e24189ce";
module.bundle.HMR_BUNDLE_ID = "0c2de6ef72b7d87b8c2e4ce3c7d09662";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH */

var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept, acceptedAssets; // eslint-disable-next-line no-redeclare

var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
  var port = HMR_PORT || location.port;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    acceptedAssets = {};
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      // Remove error overlay if there is one
      removeErrorOverlay();
      let assets = data.assets.filter(asset => asset.envHash === HMR_ENV_HASH); // Handle HMR Update

      var handled = false;
      assets.forEach(asset => {
        var didAccept = asset.type === 'css' || hmrAcceptCheck(global.parcelRequire, asset.id);

        if (didAccept) {
          handled = true;
        }
      });

      if (handled) {
        console.clear();
        assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });

        for (var i = 0; i < assetsToAccept.length; i++) {
          var id = assetsToAccept[i][1];

          if (!acceptedAssets[id]) {
            hmrAcceptRun(assetsToAccept[i][0], id);
          }
        }
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'error') {
      // Log parcel errors to console
      for (let ansiDiagnostic of data.diagnostics.ansi) {
        let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
        console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
      } // Render the fancy html overlay


      removeErrorOverlay();
      var overlay = createErrorOverlay(data.diagnostics.html);
      document.body.appendChild(overlay);
    }
  };

  ws.onerror = function (e) {
    console.error(e.message);
  };

  ws.onclose = function (e) {
    console.warn('[parcel] 🚨 Connection to the HMR server was lost');
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
    console.log('[parcel] ✨ Error resolved');
  }
}

function createErrorOverlay(diagnostics) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;
  let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';

  for (let diagnostic of diagnostics) {
    let stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
    errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>
          ${stack}
        </pre>
        <div>
          ${diagnostic.hints.map(hint => '<div>' + hint + '</div>').join('')}
        </div>
      </div>
    `;
  }

  errorHTML += '</div>';
  overlay.innerHTML = errorHTML;
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push([bundle, k]);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    if (link.parentNode !== null) {
      link.parentNode.removeChild(link);
    }
  };

  newLink.setAttribute('href', link.getAttribute('href').split('?')[0] + '?' + Date.now());
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      var absolute = /^https?:\/\//i.test(links[i].getAttribute('href'));

      if (!absolute) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    if (asset.type === 'css') {
      reloadCSS();
    } else {
      var fn = new Function('require', 'module', 'exports', asset.output);
      modules[asset.id] = [fn, asset.depsByBundle[bundle.HMR_BUNDLE_ID]];
    }
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (v) {
    return hmrAcceptCheck(v[0], v[1]);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached && cached.hot) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      var assetsToAlsoAccept = cb(function () {
        return getParents(global.parcelRequire, id);
      });

      if (assetsToAlsoAccept && assetsToAccept.length) {
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
      }
    });
  }

  acceptedAssets[id] = true;
}
},{}],"e1dc355820af71709720f63f441ab41c":[function(require,module,exports) {
const config = {
  type: Phaser.AUTO,
  pixelArt: true,
  width: window.innerWidth,
  height: window.innerHeight,
  parent: "game-container",
  physics: {
    default: "arcade",
    arcade: {
      gravity: {
        y: 0
      }
    }
  },
  textPadding: {
    left: "10px",
    right: "10px",
    top: "10px",
    bottom: "10px"
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  },
  scale: {
    mode: Phaser.Scale.ScaleModes.FIT,
    autoCenter: Phaser.Scale.Center.CENTER_BOTH
  }
};
const game = new Phaser.Game(config);
let cursors;
let player;
let stars;
let speed = 800;
let gift = 0;
let giftText;
let chipas;
let chipasos;
let score = 0;
let id = gift;
let scoreText;
let gameOver = false;
var timedEvent;
let bombs;
let timeText; //let showDebug = false;

function preload() {
  this.load.plugin("rexglowfilterpipelineplugin", "https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexglowfilterpipelineplugin.min.js", true);
  this.load.image("tiles", "../assets/tilesets/tuxmon-sample-32px-extruded.png");
  this.load.image("button", "../assets/images/button.png");
  this.load.spritesheet("star", "../assets/images/star.png", {
    frameWidth: 16,
    frameHeight: 16
  });
  this.load.image("chipa", "../assets/chipa2.png");
  this.load.image("bomb", "assets/images/bomb.png");
  this.load.image("gift-box", "../assets/images/gift-box.png");
  this.load.image("gift-card", "../assets/images/gift-icon.png");
  this.load.image("camera", "../assets/images/camera.png");
  this.load.image("photo", "../assets/images/photo.png");
  this.load.tilemapTiledJSON("map", "../assets/tilemaps/hay-chipa.json");
  this.load.audio("ding", "../assets/audio/ding.ogg");
  this.load.audio("eat", "../assets/audio/eat.mp3");
  this.load.audio("lose", "../assets/audio/lose.mp3");
  this.load.audio("win", "../assets/audio/win.wav");
  this.load.audio("monster", "../assets/audio/monster.wav");
  this.load.audio("shiny", "../assets/audio/star.wav");
  this.load.audio("mario", "../assets/audio/mario.ogg");
  this.load.audio("shot", "../assets/audio/shot.wav"); // An atlas is a way to pack multiple images together into one texture. I'm using it to load all
  // the player animations (walking left, walking right, etc.) in one image. For more info see:
  //  https://labs.phaser.io/view.html?src=src/animation/texture%20atlas%20animation.js
  // If you don't use an atlas, you can do the same thing with a spritesheet, see:
  //  https://labs.phaser.io/view.html?src=src/animation/single%20sprite%20sheet.js

  this.load.atlas("atlas", "../assets/atlas/atlas.png", "../assets/atlas/atlas.json");
}

function create() {
  graphics = this.add.graphics();
  postFxPlugin = this.plugins.get("rexglowfilterpipelineplugin");
  var canvas;
  snap = this.add.image(730, 430, "camera").setScale(0.3).setScrollFactor(0).setDepth(30).setInteractive({
    useHandCursor: true
  });

  function exportCanvasAsPNG(id, fileName, dataUrl) {
    var canvasElement = document.getElementById(id);
    var MIME_TYPE = "image/png";
    var imgURL = dataUrl;
    var dlLink = document.createElement("a");
    dlLink.download = fileName;
    dlLink.href = imgURL;
    dlLink.dataset.downloadurl = [MIME_TYPE, dlLink.download, dlLink.href].join();
    ":";
    document.body.appendChild(dlLink);
    document.body.removeChild(dlLink);

    if (gift === 3) {
      dlLink.click();
      shot.play();
    }

    snap.on("pointerdown", () => {
      dlLink.click();
      shot.play();
    });
  }

  snap.on("pointerover", () => {
    photo = this.add.image(700, 350, "photo").setScale(0.5).setScrollFactor(0).setDepth(30);
    setTimeout(() => {
      photo.destroy();
    }, 2500);
  });
  game.renderer.snapshotArea(690, 450, 80, 50, function (image) {
    exportCanvasAsPNG(gift, "mona-score", image.src);
  });
  const map = this.make.tilemap({
    key: "map"
  });
  ding = this.sound.add("ding", {
    loop: true,
    volume: 0.6
  });
  monster = this.sound.add("monster", {
    loop: true,
    volume: 0.1
  });
  shiny = this.sound.add("shiny", {
    loop: false,
    volume: 0.8
  });
  mario = this.sound.add("mario", {
    loop: true,
    volume: 0.3
  });
  shot = this.sound.add("shot", {
    loop: false,
    volume: 0.4
  });
  ding.play();
  eat = this.sound.add("eat", {
    loop: false,
    volume: 0.5
  });
  lose = this.sound.add("lose", {
    loop: false,
    volume: 0.3
  });
  win = this.sound.add("win", {
    loop: false,
    volume: 0.8
  });
  timedEvent = this.time.delayedCall(30000, onEvent, [], this);
  timeText = this.add.text(650, 0, "Time", {
    fontSize: "28px",
    fontFamily: "Arial",
    fill: "#000",
    backgroundColor: "red",
    padding: {
      x: 10,
      y: 5
    }
  }).setScrollFactor(0).setDepth(30); // this.joyStick = this.plugins
  //   .get("rexvirtualjoystickplugin")
  //   .add(this, {
  //     x: 55,
  //     y: 200,
  //     radius: 100,
  //     base: this.add.circle(0, 0, 50, 0x888888),
  //     thumb: this.add.circle(0, 0, 25, 0xcccccc),
  //     dir: "8dir",
  //     forceMin: 16,
  //     fixed: true,
  //     enable: true,
  //   })
  //   .setScrollFactor(0);
  // this.joystickCursors = this.joyStick.createCursorKeys();
  // var visible = this.joyStick.visible;
  // var enable = this.joyStick.enable;

  bombs = this.physics.add.group({
    repeat: 1
  }); // Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
  // Phaser's cache (i.e. the name you used in preload)

  const tileset = map.addTilesetImage("tuxmon-sample-32px-extruded", "tiles"); // Parameters: layer name (or index) from Tiled, tileset, x, y

  const belowLayer = map.createLayer("Below Player", tileset, 0, 0);
  const worldLayer = map.createLayer("World", tileset, 0, 0);
  const aboveLayer = map.createLayer("Above Player", tileset, 0, 0);
  worldLayer.setCollisionByProperty({
    collides: true
  }); // By default, everything gets depth sorted on the screen in the order we created things. Here, we
  // want the "Above Player" layer to sit on top of the player, so we explicitly give it a depth.
  // Higher depths will sit on top of lower depth objects.

  aboveLayer.setDepth(10); // Object layers in Tiled let you embed extra info into a map - like a spawn point or custom
  // collision shapes. In the tmx file, there's an object layer with a point named "Spawn Point"

  const spawnPoint = map.findObject("Objects", obj => obj.name === "Spawn Point");
  const cartel = map.findObject("Objects", obj => obj.name === "Cartel"); // Create a sprite with physics enabled via the physics system. The image used for the sprite has
  // a bit of whitespace, so I'm using setSize & setOffset to control the size of the player's body.

  player = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, "atlas", "misa-front").setSize(30, 40).setOffset(0, 24); // stars = this.physics.add
  //   .sprite(100, 200, "stars", 1)
  //   .setSize(30, 30)
  //   .setOffset(0, 24)
  //   .setScrollFactor(0)
  //   .setDepth(30);

  const anims = this.anims; //stars movement

  anims.create({
    key: "star_spin",
    frames: anims.generateFrameNames("star", {
      frames: [1, 5, 9, 13, 17, 21]
    }),
    frameRate: 10,
    repeat: -1
  }); // var fakeStar = this.add.sprite(155, 12, "star", 1);
  // fakeStar.setScrollFactor(0, 0).setDepth(20);

  this.starGroup = this.physics.add.group().setDepth(30); //make 2 arrays with x and y  of stars and then loop through + create stars

  var starCoord = [[200, 340]];

  for (let i = 0; i < starCoord.length; i++) {
    var stars = this.starGroup.create(starCoord[i][0], starCoord[i][1], "star").setScale(2);
    stars.anims.play("star_spin");
  }

  chipas = this.physics.add.group({
    key: "chipa",
    repeat: 5,
    setXY: {
      x: 120,
      y: 900,
      stepX: 100
    }
  });
  chipas.children.iterate(function (child) {
    child.setBounceY(Phaser.Math.Between(0.4, 0.8));
  });
  scoreText = this.add.text(354, 0, "Score: 0", {
    font: "26px Arial",
    padding: {
      x: 20,
      y: 10
    },
    fill: "#000000",
    backgroundColor: "#ffffff"
  }).setScrollFactor(0).setDepth(40); // Watch the player and worldLayer for collisions, for the duration of the scene:

  this.physics.add.collider(player, worldLayer);
  this.physics.add.collider(chipas, worldLayer);
  this.physics.add.collider(stars, worldLayer);
  this.physics.add.collider(bombs, worldLayer);
  this.physics.add.collider(player, bombs, onEvent, null, this);
  this.physics.add.overlap(player, chipas, hitChipa, null, this);
  this.physics.add.overlap(player, bombs, hitBomb, null, this);
  this.physics.add.overlap(player, stars, hitStar, null, this); // Create the player's walking animations from the texture atlas. These are stored in the global
  // animation manager so any sprite can access them.
  //misa movement

  anims.create({
    key: "misa-left-walk",
    frames: anims.generateFrameNames("atlas", {
      prefix: "misa-left-walk.",
      start: 0,
      end: 3,
      zeroPad: 3
    }),
    frameRate: 10,
    repeat: -1
  });
  anims.create({
    key: "misa-right-walk",
    frames: anims.generateFrameNames("atlas", {
      prefix: "misa-right-walk.",
      start: 0,
      end: 3,
      zeroPad: 3
    }),
    frameRate: 10,
    repeat: -1
  });
  anims.create({
    key: "misa-front-walk",
    frames: anims.generateFrameNames("atlas", {
      prefix: "misa-front-walk.",
      start: 0,
      end: 3,
      zeroPad: 3
    }),
    frameRate: 10,
    repeat: -1
  });
  anims.create({
    key: "misa-back-walk",
    frames: anims.generateFrameNames("atlas", {
      prefix: "misa-back-walk.",
      start: 0,
      end: 3,
      zeroPad: 3
    }),
    frameRate: 10,
    repeat: -1
  });
  const camera = this.cameras.main;
  camera.startFollow(player);
  camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
  cursors = this.input.keyboard.createCursorKeys(); //gift box

  graphics.fillStyle(0x00a300, 0.8);
  graphics.fillRoundedRect(695, 463, 30, 30, 12).setDepth(30).setScrollFactor(0);
  giftText = this.add.text(705, 468, gift, {
    font: "18px Arial",
    fill: "white",
    backgroundColor: "transparent"
  }).setScrollFactor(0).setDepth(40); // this.add
  //   .image(752, 476, "gift-box")
  //   .setScrollFactor(0)
  //   .setDepth(30)
  //   .setScale(0.07);
  // this.add
  //   .image(752, 476, "gift-box")
  //   .setScrollFactor(0)
  //   .setDepth(30)
  //   .setScale(0.09);
  //box version

  this.add.image(747, 476, "gift-box").setScrollFactor(0).setDepth(30).setScale(0.029); //gift-card
  //Help text that has a "fixed" position on the screen

  this.add.text(0, 0, "Arrow keys to move and eat\n900 or more = 1 Chipa Card\n3 Chipa Cards = Real chipas\nThe Monsters are due on Chipa Street", {
    font: "18px Arial",
    fill: "white",
    padding: {
      left: 6,
      right: 10,
      top: 10,
      bottom: 10
    },
    align: "left",
    backgroundColor: "rgba(0,0,0,0.5)"
  }).setScrollFactor(0).setDepth(40);
  this.add.text(100, 550, "Run mona!", {
    font: "18px courier",
    fill: "#000000",
    padding: {
      x: 20,
      y: 10
    },
    backgroundColor: "rgba(255,0,0,0.2)"
  }).setScrollFactor(1).setDepth(0);
  const image2 = this.add.image(730, 530, "button").setInteractive({
    useHandCursor: true
  }).setScrollFactor(0).setDepth(30).setScale(0.1);
  setTimeout(() => {
    image2.on("pointerdown", () => {
      score = 0;
      speed = 800;
      ding.stop();
      this.scene.restart();
      player.setVelocity(800);
      monster.stop();
      mario.stop();
      win.stop();
      lose.stop();
    });
  }, 1000);
}

function update(time, delta) {
  timeText.setText("Time: " + timedEvent.getElapsedSeconds().toString().substr(0, 4)); // if (gameOver) {
  //   return;
  // }

  const prevVelocity = player.body.velocity.clone();

  if (score > 300 && score < 500) {
    bombs.setVelocity(0, 0);
    monster.stop();
  }

  if (score > 600) {
    speed = 800;
    mario.stop();
    postFxPlugin.remove(player);
    player.glowTask.stop();
  }

  let moveleft = false;
  let moveright = false;
  let moveup = false;
  let movedown = false;
  let pointer = this.input.activePointer;

  if (pointer.primaryDown) {
    let pointerPosition = this.cameras.main.getWorldPoint(pointer.x, pointer.y); // Horizontal movement

    if (Math.abs(pointerPosition.x - player.x) > 15) {
      // To avoid glitching when the player hits the cursor
      if (pointerPosition.x > player.x) {
        moveright = true;
      } else if (pointerPosition.x < player.x) {
        moveleft = true;
      }
    } // Vertical movement


    if (Math.abs(pointerPosition.y - player.y) > 15) {
      // To avoid glitching when the player hits the cursor
      if (pointerPosition.y > player.y) {
        movedown = true;
      } else if (pointerPosition.y < player.y) {
        moveup = true;
      }
    }
  } // Stop any previous movement from the last frame


  player.body.setVelocity(0); // Horizontal movement

  if (cursors.left.isDown || // this.joystickCursors.left.isDown
  moveleft) {
    player.body.setVelocityX(-speed);
  } else if (cursors.right.isDown || // this.joystickCursors.right.isDown
  moveright // pointer.primaryDown
  ) {
      player.body.setVelocityX(speed);
    } // Vertical movement


  if (cursors.up.isDown || // this.joystickCursors.up.isDown
  moveup // pointer.primaryDown
  ) {
      player.body.setVelocityY(-speed);
    } else if (cursors.down.isDown || // this.joystickCursors.down.isDown
  movedown // pointer.primaryDown
  ) {
      player.body.setVelocityY(speed);
    } // Normalize and scale the velocity so that player can't move faster along a diagonal


  player.body.velocity.normalize().scale(speed); // Update the animation last and give left/right animations precedence over up/down animations

  if (cursors.left.isDown || // this.joystickCursors.left.isDown ||
  pointer.primaryDown) {
    player.anims.play("misa-left-walk", true);
  } else if (cursors.right.isDown || // this.joystickCursors.right.isDown ||
  pointer.primaryDown) {
    player.anims.play("misa-right-walk", true);
  } else if (cursors.up.isDown || // this.joystickCursors.up.isDown ||
  pointer.up.isDown) {
    player.anims.play("misa-back-walk", true);
  } else if (cursors.down.isDown || // this.joystickCursors.down.isDown ||
  pointer.primaryDown) {
    player.anims.play("misa-front-walk", true);
  } else {
    player.anims.stop(); // If we were moving, pick and idle frame to use

    if (prevVelocity.x < 0) player.setTexture("atlas", "misa-left");else if (prevVelocity.x > 0) player.setTexture("atlas", "misa-right");else if (prevVelocity.y < 0) player.setTexture("atlas", "misa-back");else if (prevVelocity.y > 0) player.setTexture("atlas", "misa-front");
  }
}

function hitStar(player, star) {
  star.disableBody(true, true);
  var pipeline = postFxPlugin.add(player);
  player.glowTask = player.scene.tweens.add({
    targets: pipeline,
    intensity: 0.02,
    ease: "Linear",
    duration: Phaser.Math.Between(500, 1000),
    repeat: -1,
    yoyo: true
  });
  shiny.play();
  mario.play();
  ding.stop();
  speed = 1200;
}

function hitChipa(player, chipa) {
  chipa.disableBody(true, true);
  eat.play();

  if (score === 10 || score === 20 || score === 30 || score === 200 || score === 350 || score === 500 || score === 750 || score === 800 || score === 900) {
    player.scale *= 1.1;
  }

  score += 10;
  scoreText.setText("Score: " + score);

  if (score > 90 && score < 250) {
    scoreText.setBackgroundColor("rgba(255, 0, 0, 0.9)");
    scoreText.setText("Please, help\nsomeone is eating my chipas!"); //scoreText.setPadding(40, 10, 70, 10);

    scoreText.setAlign("center");
  }

  const createBombs = () => {
    var x = player.x < 200 ? Phaser.Math.Between(200, 500) : Phaser.Math.Between(0, 200);
    var y = player.y < 200 ? Phaser.Math.Between(100, 420) : Phaser.Math.Between(560, 700);

    if (score === 100 || score === 200 || score === 300 || score === 500 || score === 700 || score === 900) {
      let bomb = bombs.create(x, y, "bomb");
      bomb.setBounce(1);
      bomb.setDepth(30);
      bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
      bomb.setCollideWorldBounds(true);
      bomb.allowGravity = false; //console.log(bomb);
      //bomb.setScale(2);

      monster.play();
    }
  };

  createBombs();
  var z = Phaser.Math.Between(100, 450);
  let j = [Phaser.Math.Between(100, 420), Phaser.Math.Between(560, 700)];
  var f = j.sort(function (a, b) {
    return 0.5 - Math.random();
  }).pop();

  if (chipas.countActive(true) === 0) {
    chipas.children.iterate(function (child) {
      child.enableBody(true, z, f, true, true);
    });
  }
} //hitBomb


function hitBomb() {}

function onEvent() {
  timedEvent.paused = true;
  gameOver = true;
  ding.stop();
  player.anims.stop();
  player.body.setVelocity(0);
  this.physics.pause();

  if (score === 0) {
    lose.play();
    player.setTint(0xff0000);
    scoreText.setText(`Meh...`);
    scoreText.setPadding(40, 10, 100, 10);
  }

  if (score < 900 && score !== 0) {
    lose.play();
    player.setTint(0xff0000);
    scoreText.setText(`Game Over\nIrreversible destruction: ${score} chipas\nMona terrible!`);
    scoreText.setPadding(40, 10, 100, 10);
  } else if (score > 900) {
    win.play();
    scoreText.setText(`${score} chipas destroyed\nPoor little monsters\nCongratulations, Mona (terrible!)`);
    scoreText.setBackgroundColor("#FFAB32");
    scoreText.setPadding(70, 10, 100, 10);
    this.add.image(709, 312, "gift-card").setScrollFactor(0).setDepth(30).setScale(0.2);
    gift += 1;
    giftText.setText(gift);
  }

  const restart = this.add.text(252, 145, "Press button to restart 🐵", {
    font: "26px Arial",
    padding: {
      x: 20,
      y: 10
    },
    fill: "#ffffff",
    backgroundColor: "rgba(2,0,0,0.6)"
  }).setScrollFactor(0).setDepth(20);
  const image = this.add.image(410, 300, "button").setInteractive({
    useHandCursor: true
  }).setScrollFactor(0).setDepth(30).setScale(0.2);
  image.on("pointerover", () => image.setScale(0.3));
  scoreText.setFontSize(scoreText.fontSize = "22px");
  scoreText.setAlign("center");
  scoreText.setFill("black"); //scoreText.setBackgroundColor("rgba(255, 0, 0, 0.9)");
  // function saveScore() {
  //   firebaseConfig.db.collection("scores").add({
  //     score: score,
  //   });
  //   console.log("score saved");
  // }
  // saveScore();

  score = 0;
  speed = 800;
  monster.stop();
  mario.stop();
  setTimeout(() => {
    image.on("pointerdown", () => {
      this.scene.restart();
      win.stop();
      lose.stop();
      mario.stop();
    });
  }, 1000);
}

window.onresize = function () {
  if (window.innerWidth > window.innerHeight) {
    window.innerWidth = 1200;
    window.innerHeight = 800;
  } else {
    window.innerWidth = 800;
    window.innerHeight = 600;
  }

  console.log(window.innerWidth);
};
},{}]},{},["b8dcfe8630a76380e8047954456aec0a","e1dc355820af71709720f63f441ab41c"], null)

//# sourceMappingURL=js.0c2de6ef.js.map
