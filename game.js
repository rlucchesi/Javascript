/* jslint */
/*global prompt*/

//CPSC 1045 Project - Due to July 28th, 2016
//Author: Rafael Lucchesi
//Special thanks to Jamie and Nick.


//Global variables
var backCanvas = document.getElementById('backCanvas'),
    ct0 = backCanvas.getContext('2d'),
    frontCanvas = document.getElementById('frontCanvas'),
    ct1 = frontCanvas.getContext('2d'),
    frontCanvas2 = document.getElementById('frontCanvas2'),
    ct2 = frontCanvas2.getContext('2d'),
    tableResults = document.getElementById('tableResults'),
    timerId,
    speed = 240;


// Constructor Functions
function OpponentCreator(ctx, xPar, yPar, distanceController) {
    'use strict';
    this.x = xPar;
    this.y = yPar;
    this.speedX = Math.floor((Math.random() * 10) + 5);
    this.speedY = Math.floor((Math.random() * 15) + 130);
    this.speedResultant = -(this.speedY - (260 - speed));
    this.distanceToPlayerY = 0;
    this.distanceController = distanceController;
    this.image = new Image();
    this.image.src = 'images/opponentsSprites.png';
    this.image.spriteW = [];
    this.image.spriteH = [];
    this.image.spriteH[0] = 21; // sprite Height
    this.image.spriteH[1] = 25; // next sprite
    this.image.spriteW[0] = 41; // left
    this.image.spriteW[1] = 41; // right
    this.image.spriteW[2] = 36; // front
    
	this.drawFar = function () {
        ctx.drawImage(this.image, 0, 0, this.image.spriteW[0], this.image.spriteH[0], this.x, this.y, this.image.spriteW[2] * 4 / this.distanceController, this.image.spriteH[0] * 4 / this.distanceController);
    };
    this.drawNearLeft = function () {
        ctx.drawImage(this.image, 0, 2 * this.image.spriteH[1], this.image.spriteW[0], this.image.spriteH[0], this.x, this.y, this.image.spriteW[0] * 4 / this.distanceController, this.image.spriteH[0] * 4 / this.distanceController);
    };
    this.drawNearRight = function () {
        ctx.drawImage(this.image, 0, this.image.spriteH[1], this.image.spriteW[1], this.image.spriteH[0], this.x, this.y, this.image.spriteW[1] * 4 / this.distanceController, this.image.spriteH[0] * 4 / this.distanceController);
    };
}

function ScoreConstructor(driver, time) {
    'use strict';
    this.driver = driver;
    this.time = time;
}


// Objects
var player = {
    x: 327,
    y: 415,
    speed: (260 - speed),
    cycle: 0,
    isLeft: false,
    isRight: false,
    wasLeft: false,
    wasRight: false,
    keyLeft: false,
    keyRight: false,
    curvePhysics: 0,
    
    // Player Methods
    draw: function (ctx, xPar) {
        'use strict';
        if (this.isLeft) {
            ctx.drawImage(this.image[0], 0, this.cycle * player.image[0].spriteH[1], player.image[0].spriteW[this.cycle], player.image[0].spriteH[0], xPar, player.y, this.image[0].spriteW[this.cycle] * 3, this.image[0].spriteH[0] * 3);
        } else if (this.isRight) {
            ctx.drawImage(this.image[1], 0, this.cycle * player.image[1].spriteH[1], player.image[1].spriteW[this.cycle], player.image[1].spriteH[0], xPar, player.y, this.image[1].spriteW[this.cycle] * 3, this.image[1].spriteH[0] * 3);
        } else {
            ctx.drawImage(this.image[0], 0, 0, this.image[0].spriteW[0], this.image[0].spriteH[0], this.x, this.y, this.image[0].spriteW[0] * 3, this.image[0].spriteH[0] * 3);
        }
        
    },
    
    leftKeyDown: function (ctx, xPar) {
        'use strict';
        this.keyLeft = true;
        if (this.cycle < 2) {
            this.cycle++;
        }
        ctx.clearRect(0, 385, backCanvas.width, 115);
        ctx.drawImage(this.image[0], 0, this.cycle * player.image[0].spriteH[1], player.image[0].spriteW[this.cycle], player.image[0].spriteH[0], xPar, player.y, this.image[0].spriteW[this.cycle] * 3, this.image[0].spriteH[0] * 3);
        this.x = xPar;
    },
    
    leftKeyUp: function (ctx, xPar) {
        'use strict';
        this.keyLeft = false;
        if (this.isLeft) {
            this.cycle = 1;
        } else {
            this.cycle = 0;
        }
    },
    
    rightKeyDown: function (ctx, xPar) {
        'use strict';
        this.keyRight = true;
        if (this.cycle < 2) {
            this.cycle++;
        }
        ctx.clearRect(0, 385, backCanvas.width, 115);
        ctx.drawImage(this.image[1], 0, this.cycle * player.image[1].spriteH[1], player.image[1].spriteW[this.cycle], player.image[1].spriteH[0], xPar, player.y, this.image[1].spriteW[this.cycle] * 3, this.image[1].spriteH[0] * 3);
        this.x = xPar;
    },
    
    rightKeyUp: function (ctx, xPar) {
        'use strict';
        this.keyRight = false;
        if (this.isLeft) {
            this.cycle = 1;
        } else {
            this.cycle = 0;
        }
    },
    
    displaycementY: function (speed) {
        'use strict';
        if (speed < 80) {
            player.y = 415;
        } else if (speed < 120) {
            player.y = 410;
        } else if (speed < 130) {
            player.y = 405;
        } else if (speed < 140) {
            player.y = 400;
        } else if (speed < 150) {
            player.y = 395;
        } else if (speed < 155) {
            player.y = 390;
        } else {
            player.y = 385;
        }
    }
};

// Player Sprites
player.image = [];
player.image[0] = new Image();
player.image[0].src = 'images/player0SpriteLeft.png';
player.image[0].spriteH = [];
player.image[0].spriteH[0] = 28; // sprite Height
player.image[0].spriteH[1] = 30; // next sprite
player.image[0].spriteW = [];
player.image[0].spriteW[0] = 48; // front
player.image[0].spriteW[1] = 54; // middle
player.image[0].spriteW[2] = 59; // most left
player.image[1] = new Image();
player.image[1].src = 'images/player0SpriteRight.png';
player.image[1].spriteH = [];
player.image[1].spriteH[0] = 28; // sprite Height
player.image[1].spriteH[1] = 30; // next sprite
player.image[1].spriteW = [];
player.image[1].spriteW[0] = 48; // front
player.image[1].spriteW[1] = 54; // middle
player.image[1].spriteW[2] = 59; // most left


// Opponent Object
var opponent = {
    array: [],
    indexArray: 0,
    generateRandomLane: 0,
    generateRandomCentralLane: 0,
    collisionDistance: 0,
    
    // Opponent Methods
    generator: function (ctx) {
        'use strict';
        opponent.generateRandomLane = Math.floor(Math.random() * 3);
        opponent.generateRandomCentralLane = Math.floor((Math.random() * 2) + 1);
        if (player.isLeft) {
            if (opponent.generateRandomLane === 0 || opponent.generateRandomLane === 1 || opponent.generateRandomLane === 2) {
                opponent.array.push(new OpponentCreator(ctx, 130, 100, 7));
            }
            opponent.array[opponent.indexArray].drawFar();
        } else if (player.isRight) {
            if (opponent.generateRandomLane === 0 || opponent.generateRandomLane === 1 || opponent.generateRandomLane === 2) {
                opponent.array.push(new OpponentCreator(ctx, 620, 100, 7));
            }
            opponent.array[opponent.indexArray].drawFar();
        } else {
            if (opponent.generateRandomLane === 0) {
                opponent.array.push(new OpponentCreator(ctx, 360, 100, 7));
            } else if (opponent.generateRandomLane === 1) {
                opponent.array.push(new OpponentCreator(ctx, 420, 100, 7));
            } else {
                opponent.array.push(new OpponentCreator(ctx, 390, 100, 7));
            }
            opponent.array[opponent.indexArray].drawFar();
        }
    },
    
    management: function () {
        'use strict';
        opponent.array[opponent.indexArray].distanceToPlayerY = 400 - opponent.array[opponent.indexArray].y;
        if (player.isLeft) {
            if (opponent.generateRandomLane === 0 || opponent.generateRandomLane === 1 || opponent.generateRandomLane === 2) {
                opponent.array[opponent.indexArray].x += opponent.array[opponent.indexArray].speedX;
            }
            if (opponent.array[opponent.indexArray].distanceToPlayerY > 300) {
                opponent.array[opponent.indexArray].y = 100;
                opponent.array[opponent.indexArray].x = 160;
                opponent.array[opponent.indexArray].speedResultant = 0;
            } else if (opponent.array[opponent.indexArray].distanceToPlayerY >= 280) {
                opponent.array[opponent.indexArray].distanceController = 7;
                if (opponent.array[opponent.indexArray].x < 150) {
                    opponent.array[opponent.indexArray].speedX = -opponent.array[opponent.indexArray].speedX;
                    if (opponent.array[opponent.indexArray].x < 149) {
                        opponent.array[opponent.indexArray].x = 150;
                    }
                } else if (opponent.array[opponent.indexArray].x > 170) {
                    opponent.array[opponent.indexArray].speedX = -opponent.array[opponent.indexArray].speedX;
                    if (opponent.array[opponent.indexArray].x > 171) {
                        opponent.array[opponent.indexArray].x = 170;
                    }
                }
                opponent.array[opponent.indexArray].drawFar();
            } else if (opponent.array[opponent.indexArray].distanceToPlayerY >= 240) {
                opponent.array[opponent.indexArray].distanceController = 7 / 2;
                if (opponent.array[opponent.indexArray].x < 180) {
                    opponent.array[opponent.indexArray].speedX = -opponent.array[opponent.indexArray].speedX;
                    if (opponent.array[opponent.indexArray].x < 179) {
                        opponent.array[opponent.indexArray].x = 180;
                    }
                } else if (opponent.array[opponent.indexArray].x > 420) {
                    opponent.array[opponent.indexArray].speedX = -opponent.array[opponent.indexArray].speedX;
                    if (opponent.array[opponent.indexArray].x > 421) {
                        opponent.array[opponent.indexArray].x = 420;
                    }
                }
                opponent.array[opponent.indexArray].drawFar();
            } else if (opponent.array[opponent.indexArray].distanceToPlayerY >= 200) {
                opponent.array[opponent.indexArray].distanceController = 7 / 3;
                if (opponent.array[opponent.indexArray].x < 190) {
                    opponent.array[opponent.indexArray].speedX = -opponent.array[opponent.indexArray].speedX;
                    if (opponent.array[opponent.indexArray].x < 189) {
                        opponent.array[opponent.indexArray].x = 190;
                    }
                } else if (opponent.array[opponent.indexArray].x > 500) {
                    opponent.array[opponent.indexArray].speedX = -opponent.array[opponent.indexArray].speedX;
                    if (opponent.array[opponent.indexArray].x > 501) {
                        opponent.array[opponent.indexArray].x = 500;
                    }
                }
                opponent.array[opponent.indexArray].drawFar();
            } else if (opponent.array[opponent.indexArray].distanceToPlayerY >= 160) {
                opponent.array[opponent.indexArray].distanceController = 7 / 4;
                if (opponent.array[opponent.indexArray].x < 190) {
                    opponent.array[opponent.indexArray].speedX = -opponent.array[opponent.indexArray].speedX;
                    if (opponent.array[opponent.indexArray].x < 189) {
                        opponent.array[opponent.indexArray].x = 190;
                    }
                } else if (opponent.array[opponent.indexArray].x > 550) {
                    opponent.array[opponent.indexArray].speedX = -opponent.array[opponent.indexArray].speedX;
                    if (opponent.array[opponent.indexArray].x > 551) {
                        opponent.array[opponent.indexArray].x = 550;
                    }
                }
                opponent.array[opponent.indexArray].drawFar();
            } else if (opponent.array[opponent.indexArray].distanceToPlayerY >= 120) {
                opponent.array[opponent.indexArray].distanceController = 7 / 5;
                if (opponent.array[opponent.indexArray].x < 180) {
                    opponent.array[opponent.indexArray].speedX = -opponent.array[opponent.indexArray].speedX;
                    if (opponent.array[opponent.indexArray].x < 179) {
                        opponent.array[opponent.indexArray].x = 180;
                    }
                } else if (opponent.array[opponent.indexArray].x > 600) {
                    opponent.array[opponent.indexArray].speedX = -opponent.array[opponent.indexArray].speedX;
                    if (opponent.array[opponent.indexArray].x > 601) {
                        opponent.array[opponent.indexArray].x = 600;
                    }
                }
                opponent.array[opponent.indexArray].drawFar();
            } else if (opponent.array[opponent.indexArray].distanceToPlayerY >= 80) {
                opponent.array[opponent.indexArray].distanceController = 7 / 6;
                if (opponent.array[opponent.indexArray].x < 160) {
                    opponent.array[opponent.indexArray].speedX = -opponent.array[opponent.indexArray].speedX;
                    if (opponent.array[opponent.indexArray].x < 159) {
                        opponent.array[opponent.indexArray].x = 160;
                    }
                } else if (opponent.array[opponent.indexArray].x > 600) {
                    opponent.array[opponent.indexArray].speedX = -opponent.array[opponent.indexArray].speedX;
                    if (opponent.array[opponent.indexArray].x > 601) {
                        opponent.array[opponent.indexArray].x = 600;
                    }
                }
                opponent.array[opponent.indexArray].drawFar();
            } else if (opponent.array[opponent.indexArray].distanceToPlayerY >= 21) {
                opponent.array[opponent.indexArray].distanceController = 1;
                if (opponent.array[opponent.indexArray].x < 110) {
                    opponent.array[opponent.indexArray].speedX = -opponent.array[opponent.indexArray].speedX;
                    if (opponent.array[opponent.indexArray].x < 109) {
                        opponent.array[opponent.indexArray].x = 110;
                    }
                } else if (opponent.array[opponent.indexArray].x > 620) {
                    opponent.array[opponent.indexArray].speedX = -opponent.array[opponent.indexArray].speedX;
                    if (opponent.array[opponent.indexArray].x > 621) {
                        opponent.array[opponent.indexArray].x = 620;
                    }
                }
                opponent.array[opponent.indexArray].drawFar();
            } else if (opponent.array[opponent.indexArray].distanceToPlayerY < 21 && opponent.array[opponent.indexArray].distanceToPlayerY > 0) {
                if (opponent.array[opponent.indexArray].x < 100) {
                    opponent.array[opponent.indexArray].speedX = -opponent.array[opponent.indexArray].speedX;
                    if (opponent.array[opponent.indexArray].x < 99) {
                        opponent.array[opponent.indexArray].x = 100;
                    }
                } else if (opponent.array[opponent.indexArray].x > 600) {
                    opponent.array[opponent.indexArray].speedX = -opponent.array[opponent.indexArray].speedX;
                    if (opponent.array[opponent.indexArray].x > 601) {
                        opponent.array[opponent.indexArray].x = 600;
                    }
                }
                if (player.x < opponent.array[opponent.indexArray].x) {
                    opponent.array[opponent.indexArray].drawNearRight();
                } else {
                    opponent.array[opponent.indexArray].drawNearLeft();
                }
            } else {
                opponent.indexArray++;
                opponent.generator(ct1);
            }
        } else if (player.isRight) {
            if (opponent.generateRandomLane === 0 || opponent.generateRandomLane === 1 || opponent.generateRandomLane === 2) {
                opponent.array[opponent.indexArray].x -= opponent.array[opponent.indexArray].speedX;
            }
            if (opponent.array[opponent.indexArray].distanceToPlayerY > 300) {
                opponent.array[opponent.indexArray].y = 100;
                opponent.array[opponent.indexArray].x = 620;
                opponent.array[opponent.indexArray].speedResultant = 0;
            } else if (opponent.array[opponent.indexArray].distanceToPlayerY >= 280) {
                opponent.array[opponent.indexArray].distanceController = 7;
                if (opponent.array[opponent.indexArray].x < 600) {
                    opponent.array[opponent.indexArray].speedX = -opponent.array[opponent.indexArray].speedX;
                    if (opponent.array[opponent.indexArray].x < 599) {
                        opponent.array[opponent.indexArray].x = 600;
                    }
                } else if (opponent.array[opponent.indexArray].x > 640) {
                    opponent.array[opponent.indexArray].speedX = -opponent.array[opponent.indexArray].speedX;
                    if (opponent.array[opponent.indexArray].x > 641) {
                        opponent.array[opponent.indexArray].x = 640;
                    }
                }
                opponent.array[opponent.indexArray].drawFar();
            } else if (opponent.array[opponent.indexArray].distanceToPlayerY >= 240) {
                opponent.array[opponent.indexArray].distanceController = 7 / 2;
                if (opponent.array[opponent.indexArray].x < 350) {
                    opponent.array[opponent.indexArray].speedX = -opponent.array[opponent.indexArray].speedX;
                    if (opponent.array[opponent.indexArray].x < 349) {
                        opponent.array[opponent.indexArray].x = 350;
                    }
                } else if (opponent.array[opponent.indexArray].x > 580) {
                    opponent.array[opponent.indexArray].speedX = -opponent.array[opponent.indexArray].speedX;
                    if (opponent.array[opponent.indexArray].x > 581) {
                        opponent.array[opponent.indexArray].x = 580;
                    }
                }
                opponent.array[opponent.indexArray].drawFar();
            } else if (opponent.array[opponent.indexArray].distanceToPlayerY >= 200) {
                opponent.array[opponent.indexArray].distanceController = 7 / 3;
                if (opponent.array[opponent.indexArray].x < 240) {
                    opponent.array[opponent.indexArray].speedX = -opponent.array[opponent.indexArray].speedX;
                    if (opponent.array[opponent.indexArray].x < 239) {
                        opponent.array[opponent.indexArray].x = 240;
                    }
                } else if (opponent.array[opponent.indexArray].x > 540) {
                    opponent.array[opponent.indexArray].speedX = -opponent.array[opponent.indexArray].speedX;
                    if (opponent.array[opponent.indexArray].x > 541) {
                        opponent.array[opponent.indexArray].x = 540;
                    }
                }
                opponent.array[opponent.indexArray].drawFar();
            } else if (opponent.array[opponent.indexArray].distanceToPlayerY >= 160) {
                opponent.array[opponent.indexArray].distanceController = 7 / 4;
                if (opponent.array[opponent.indexArray].x < 180) {
                    opponent.array[opponent.indexArray].speedX = -opponent.array[opponent.indexArray].speedX;
                    if (opponent.array[opponent.indexArray].x < 179) {
                        opponent.array[opponent.indexArray].x = 180;
                    }
                } else if (opponent.array[opponent.indexArray].x > 530) {
                    opponent.array[opponent.indexArray].speedX = -opponent.array[opponent.indexArray].speedX;
                    if (opponent.array[opponent.indexArray].x > 531) {
                        opponent.array[opponent.indexArray].x = 530;
                    }
                }
                opponent.array[opponent.indexArray].drawFar();
            } else if (opponent.array[opponent.indexArray].distanceToPlayerY >= 120) {
                opponent.array[opponent.indexArray].distanceController = 7 / 5;
                if (opponent.array[opponent.indexArray].x < 140) {
                    opponent.array[opponent.indexArray].speedX = -opponent.array[opponent.indexArray].speedX;
                    if (opponent.array[opponent.indexArray].x < 139) {
                        opponent.array[opponent.indexArray].x = 140;
                    }
                } else if (opponent.array[opponent.indexArray].x > 530) {
                    opponent.array[opponent.indexArray].speedX = -opponent.array[opponent.indexArray].speedX;
                    if (opponent.array[opponent.indexArray].x > 531) {
                        opponent.array[opponent.indexArray].x = 530;
                    }
                }
                opponent.array[opponent.indexArray].drawFar();
            } else if (opponent.array[opponent.indexArray].distanceToPlayerY >= 80) {
                opponent.array[opponent.indexArray].distanceController = 7 / 6;
                if (opponent.array[opponent.indexArray].x < 110) {
                    opponent.array[opponent.indexArray].speedX = -opponent.array[opponent.indexArray].speedX;
                    if (opponent.array[opponent.indexArray].x < 109) {
                        opponent.array[opponent.indexArray].x = 110;
                    }
                } else if (opponent.array[opponent.indexArray].x > 520) {
                    opponent.array[opponent.indexArray].speedX = -opponent.array[opponent.indexArray].speedX;
                    if (opponent.array[opponent.indexArray].x > 521) {
                        opponent.array[opponent.indexArray].x = 520;
                    }
                }
                opponent.array[opponent.indexArray].drawFar();
            } else if (opponent.array[opponent.indexArray].distanceToPlayerY >= 21) {
                opponent.array[opponent.indexArray].distanceController = 1;
                if (opponent.array[opponent.indexArray].x < 80) {
                    opponent.array[opponent.indexArray].speedX = -opponent.array[opponent.indexArray].speedX;
                    if (opponent.array[opponent.indexArray].x < 79) {
                        opponent.array[opponent.indexArray].x = 80;
                    }
                } else if (opponent.array[opponent.indexArray].x > 580) {
                    opponent.array[opponent.indexArray].speedX = -opponent.array[opponent.indexArray].speedX;
                    if (opponent.array[opponent.indexArray].x > 581) {
                        opponent.array[opponent.indexArray].x = 580;
                    }
                }
                opponent.array[opponent.indexArray].drawFar();
            } else if (opponent.array[opponent.indexArray].distanceToPlayerY < 21 && opponent.array[opponent.indexArray].distanceToPlayerY > 0) {
                if (opponent.array[opponent.indexArray].x < 70) {
                    opponent.array[opponent.indexArray].speedX = -opponent.array[opponent.indexArray].speedX;
                    if (opponent.array[opponent.indexArray].x < 69) {
                        opponent.array[opponent.indexArray].x = 70;
                    }
                } else if (opponent.array[opponent.indexArray].x > 550) {
                    opponent.array[opponent.indexArray].speedX = -opponent.array[opponent.indexArray].speedX;
                    if (opponent.array[opponent.indexArray].x > 551) {
                        opponent.array[opponent.indexArray].x = 550;
                    }
                }
                if (player.x < opponent.array[opponent.indexArray].x) {
                    opponent.array[opponent.indexArray].drawNearRight();
                } else {
                    opponent.array[opponent.indexArray].drawNearLeft();
                }
            } else {
                opponent.indexArray++;
                opponent.generator(ct1);
            }
        } else {
            if (opponent.generateRandomLane === 0) {
                opponent.array[opponent.indexArray].x += opponent.array[opponent.indexArray].speedX;
            } else if (opponent.generateRandomLane === 1) {
                opponent.array[opponent.indexArray].x -= opponent.array[opponent.indexArray].speedX;
            } else {
                if (opponent.generateRandomCentralLane === 1) {
                    opponent.array[opponent.indexArray].x += opponent.array[opponent.indexArray].speedX;
                } else {
                    opponent.array[opponent.indexArray].x -= opponent.array[opponent.indexArray].speedX;
                }
            }
            if (opponent.array[opponent.indexArray].distanceToPlayerY > 300) {
                opponent.array[opponent.indexArray].y = 100;
                opponent.array[opponent.indexArray].x = 400;
                opponent.array[opponent.indexArray].speedResultant = 0;
            } else if (opponent.array[opponent.indexArray].distanceToPlayerY >= 280) {
                opponent.array[opponent.indexArray].distanceController = 7;
                if (opponent.array[opponent.indexArray].x < 360) {
                    opponent.array[opponent.indexArray].speedX = -opponent.array[opponent.indexArray].speedX;
                    if (opponent.array[opponent.indexArray].x < 359) {
                        opponent.array[opponent.indexArray].x = 360;
                    }
                } else if (opponent.array[opponent.indexArray].x > 420) {
                    opponent.array[opponent.indexArray].speedX = -opponent.array[opponent.indexArray].speedX;
                    if (opponent.array[opponent.indexArray].x > 421) {
                        opponent.array[opponent.indexArray].x = 420;
                    }
                }
                opponent.array[opponent.indexArray].drawFar();
            } else if (opponent.array[opponent.indexArray].distanceToPlayerY >= 240) {
                opponent.array[opponent.indexArray].distanceController = 7 / 2;
                if (opponent.array[opponent.indexArray].x < 340) {
                    opponent.array[opponent.indexArray].speedX = -opponent.array[opponent.indexArray].speedX;
                    if (opponent.array[opponent.indexArray].x < 339) {
                        opponent.array[opponent.indexArray].x = 340;
                    }
                } else if (opponent.array[opponent.indexArray].x > 420) {
                    opponent.array[opponent.indexArray].speedX = -opponent.array[opponent.indexArray].speedX;
                    if (opponent.array[opponent.indexArray].x > 421) {
                        opponent.array[opponent.indexArray].x = 420;
                    }
                }
                opponent.array[opponent.indexArray].drawFar();
            } else if (opponent.array[opponent.indexArray].distanceToPlayerY >= 200) {
                opponent.array[opponent.indexArray].distanceController = 7 / 3;
                if (opponent.array[opponent.indexArray].x < 310) {
                    opponent.array[opponent.indexArray].speedX = -opponent.array[opponent.indexArray].speedX;
                    if (opponent.array[opponent.indexArray].x < 309) {
                        opponent.array[opponent.indexArray].x = 310;
                    }
                } else if (opponent.array[opponent.indexArray].x > 430) {
                    opponent.array[opponent.indexArray].speedX = -opponent.array[opponent.indexArray].speedX;
                    if (opponent.array[opponent.indexArray].x > 431) {
                        opponent.array[opponent.indexArray].x = 430;
                    }
                }
                opponent.array[opponent.indexArray].drawFar();
            } else if (opponent.array[opponent.indexArray].distanceToPlayerY >= 160) {
                opponent.array[opponent.indexArray].distanceController = 7 / 4;
                if (opponent.array[opponent.indexArray].x < 250) {
                    opponent.array[opponent.indexArray].speedX = -opponent.array[opponent.indexArray].speedX;
                    if (opponent.array[opponent.indexArray].x < 249) {
                        opponent.array[opponent.indexArray].x = 250;
                    }
                } else if (opponent.array[opponent.indexArray].x > 450) {
                    opponent.array[opponent.indexArray].speedX = -opponent.array[opponent.indexArray].speedX;
                    if (opponent.array[opponent.indexArray].x > 451) {
                        opponent.array[opponent.indexArray].x = 450;
                    }
                }
                opponent.array[opponent.indexArray].drawFar();
            } else if (opponent.array[opponent.indexArray].distanceToPlayerY >= 120) {
                opponent.array[opponent.indexArray].distanceController = 7 / 5;
                if (opponent.array[opponent.indexArray].x < 230) {
                    opponent.array[opponent.indexArray].speedX = -opponent.array[opponent.indexArray].speedX;
                    if (opponent.array[opponent.indexArray].x < 229) {
                        opponent.array[opponent.indexArray].x = 230;
                    }
                } else if (opponent.array[opponent.indexArray].x > 460) {
                    opponent.array[opponent.indexArray].speedX = -opponent.array[opponent.indexArray].speedX;
                    if (opponent.array[opponent.indexArray].x > 461) {
                        opponent.array[opponent.indexArray].x = 460;
                    }
                }
                opponent.array[opponent.indexArray].drawFar();
            } else if (opponent.array[opponent.indexArray].distanceToPlayerY >= 80) {
                opponent.array[opponent.indexArray].distanceController = 7 / 6;
                if (opponent.array[opponent.indexArray].x < 190) {
                    opponent.array[opponent.indexArray].speedX = -opponent.array[opponent.indexArray].speedX;
                    if (opponent.array[opponent.indexArray].x < 189) {
                        opponent.array[opponent.indexArray].x = 190;
                    }
                } else if (opponent.array[opponent.indexArray].x > 480) {
                    opponent.array[opponent.indexArray].speedX = -opponent.array[opponent.indexArray].speedX;
                    if (opponent.array[opponent.indexArray].x > 481) {
                        opponent.array[opponent.indexArray].x = 480;
                    }
                }
                opponent.array[opponent.indexArray].drawFar();
            } else if (opponent.array[opponent.indexArray].distanceToPlayerY >= 21) {
                opponent.array[opponent.indexArray].distanceController = 1;
                if (opponent.array[opponent.indexArray].x < 170) {
                    opponent.array[opponent.indexArray].speedX = -opponent.array[opponent.indexArray].speedX;
                    if (opponent.array[opponent.indexArray].x < 169) {
                        opponent.array[opponent.indexArray].x = 170;
                    }
                } else if (opponent.array[opponent.indexArray].x > 500) {
                    opponent.array[opponent.indexArray].speedX = -opponent.array[opponent.indexArray].speedX;
                    if (opponent.array[opponent.indexArray].x > 501) {
                        opponent.array[opponent.indexArray].x = 500;
                    }
                }
                opponent.array[opponent.indexArray].drawFar();
            } else if (opponent.array[opponent.indexArray].distanceToPlayerY < 21 && opponent.array[opponent.indexArray].distanceToPlayerY > 0) {
                if (opponent.array[opponent.indexArray].x < 100) {
                    opponent.array[opponent.indexArray].speedX = -opponent.array[opponent.indexArray].speedX;
                    if (opponent.array[opponent.indexArray].x < 99) {
                        opponent.array[opponent.indexArray].x = 100;
                    }
                } else if (opponent.array[opponent.indexArray].x > 520) {
                    opponent.array[opponent.indexArray].speedX = -opponent.array[opponent.indexArray].speedX;
                    if (opponent.array[opponent.indexArray].x > 521) {
                        opponent.array[opponent.indexArray].x = 520;
                    }
                }
                if (player.x < opponent.array[opponent.indexArray].x) {
                    opponent.array[opponent.indexArray].drawNearRight();
                } else {
                    opponent.array[opponent.indexArray].drawNearLeft();
                }
            } else {
                opponent.indexArray++;
                opponent.generator(ct1);
            }
        }
        opponent.array[opponent.indexArray].y = opponent.array[opponent.indexArray].y + opponent.array[opponent.indexArray].speedResultant + opponent.collisionDistance;
    },
    
    collisionDetection: function (enemy) {
        'use strict';
        var i;
        if (player.x < enemy.x + enemy.image.spriteW[2] * 4 && player.x + player.image[0].spriteW[player.cycle] * 3 > enemy.x && player.y + 40 < enemy.y + enemy.image.spriteH[0] * 4 && player.y + player.image[0].spriteH[0] * 3 > enemy.y) {
            race.sound.crash.play();
            opponent.array[opponent.indexArray].y -= 120;
            speed += 25;
            race.updateSpeed();
        }
        if (player.x < 29 || player.x > 623) {
            if (speed + 5 < 240) {
                speed += 5;
            } else {
                speed = 240;
            }
            if (player.x < 29) {
                player.x += 50;
            }
            if (player.x > 623) {
                player.x -= 50;
            }
            race.updateSpeed();
        }
    }
};


// Track Object
var track = {
    lane: 60,
	gap: 50,
    direction: -1,
    curveCycle: 0,
    codeExecuted: false,
    
    // Track Methods
    draw: function (ctx) {
        'use strict';
        ctx.save();
        ctx.fillStyle = 'green';
        ctx.fillRect(0, backCanvas.height / 5, backCanvas.width, backCanvas.height / 5 * 4);
        ctx.beginPath();
        ctx.fillStyle = "gray";
        ctx.lineTo(0, 500);
        ctx.lineTo(0, 480);
        ctx.lineTo(350, 100);
        ctx.lineTo(450, 100);
        ctx.lineTo(800, 480);
        ctx.lineTo(800, 500);
        ctx.lineTo(0, 500);
        ctx.fill();
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 10;
        ctx.beginPath();
        ctx.lineTo(0, 480);
        ctx.lineTo(350, 100);
        ctx.stroke();
        ctx.beginPath();
        ctx.lineTo(800, 480);
        ctx.lineTo(450, 100);
        ctx.stroke();
        ctx.strokeStyle = 'white';
        ctx.setLineDash([track.lane, track.gap, 70, 50, 70, 50, 70, 50, 70, 50]);
        
		if (track.lane + track.gap === 0) {
			track.lane = 60;
			track.gap = 50;
		} else if (track.lane > 0) {
			track.lane -= 10;
		} else {
			track.gap -= 10;
		}

        // Lanes
        ctx.beginPath();
        ctx.lineTo(266, 500);
        ctx.lineTo(390, 100);
        ctx.stroke();
        ctx.beginPath();
        ctx.lineTo(533, 500);
        ctx.lineTo(410, 100);
        ctx.stroke();
        
        // Zebras
        ctx.setLineDash([track.lane, track.gap, 65, 50, 65, 50, 65, 50, 65, 50]);
        ctx.beginPath();
        ctx.lineTo(0, 480);
        ctx.lineTo(350, 100);
        ctx.stroke();
        ctx.beginPath();
        ctx.lineTo(800, 480);
        ctx.lineTo(450, 100);
        ctx.stroke();
        ctx.restore();
    },
    
    drawCurveToLeft: function (ctx, degree) {
        'use strict';
        var xQuadraticLeft,
            xFinalQuadraticLeft,
            xRight,
            xQuadraticRight,
            laneXQuadraticLeft,
            laneXFinalQuadraticLeft,
            laneXQuadraticRight,
            laneXFinalQuadraticRight;

        if (degree === 0) {
            xQuadraticLeft = 200;
            xFinalQuadraticLeft = 300;
            xRight = 400;
            xQuadraticRight = 550;
            laneXQuadraticLeft = 350;
            laneXFinalQuadraticLeft = 333;
            laneXQuadraticRight = 500;
            laneXFinalQuadraticRight = 366;
        } else if (degree === 1) {
            xQuadraticLeft = 250;
            xFinalQuadraticLeft = 250;
            xRight = 350;
            xQuadraticRight = 600;
            laneXQuadraticLeft = 400;
            laneXFinalQuadraticLeft = 283;
            laneXQuadraticRight = 550;
            laneXFinalQuadraticRight = 316;
        } else if (degree === 2) {
            xQuadraticLeft = 250;
            xFinalQuadraticLeft = 200;
            xRight = 300;
            xQuadraticRight = 650;
            laneXQuadraticLeft = 450;
            laneXFinalQuadraticLeft = 233;
            laneXQuadraticRight = 600;
            laneXFinalQuadraticRight = 266;
        } else if (degree === 3) {
            xQuadraticLeft = 300;
            xFinalQuadraticLeft = 150;
            xRight = 250;
            xQuadraticRight = 700;
            laneXQuadraticLeft = 500;
            laneXFinalQuadraticLeft = 183;
            laneXQuadraticRight = 650;
            laneXFinalQuadraticRight = 216;
        } else {
            xQuadraticLeft = 300;
            xFinalQuadraticLeft = 100;
            xRight = 200;
            xQuadraticRight = 700;
            laneXQuadraticLeft = 500;
            laneXFinalQuadraticLeft = 133;
            laneXQuadraticRight = 650;
            laneXFinalQuadraticRight = 166;
        }
        ctx.save();
        ctx.fillStyle = 'green';
        ctx.fillRect(0, 100, 800, 400);
        ctx.beginPath();
        ctx.fillStyle = "gray";
        ctx.lineTo(0, 500);
        ctx.lineTo(0, 480);
        ctx.quadraticCurveTo(xQuadraticLeft, 250, xFinalQuadraticLeft, 100); // 1 , 3
        ctx.lineTo(xRight, 100); // 1
        ctx.quadraticCurveTo(xQuadraticRight, 150, 800, 480); // 1
        ctx.lineTo(800, 500);
        ctx.fill();
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 10;
        ctx.beginPath();
        ctx.lineTo(0, 480);
        ctx.quadraticCurveTo(xQuadraticLeft, 250, xFinalQuadraticLeft, 100); // 1 , 3
        ctx.stroke();
        ctx.beginPath();
        ctx.lineTo(xRight, 100); // 1
        ctx.quadraticCurveTo(xQuadraticRight, 150, 800, 480); // 1
        ctx.stroke();
        ctx.strokeStyle = "white";
        ctx.setLineDash([track.lane, track.gap, 70, 50, 70, 50, 70, 50, 70, 50, 70, 50, 70, 50]);
        
		if (track.lane + track.gap === 0) {
			track.lane = 60;
			track.gap = 50;
		} else if (track.lane > 0) {
			track.lane -= 10;
		} else {
			track.gap -= 10;
		}
		
        // Lanes
        ctx.beginPath();
        ctx.lineTo(300, 500);
        ctx.quadraticCurveTo(laneXQuadraticLeft, 250, laneXFinalQuadraticLeft, 100); // 1, 3
        ctx.stroke();
        ctx.beginPath();
        ctx.lineTo(525, 500);
        ctx.quadraticCurveTo(laneXQuadraticRight, 250, laneXFinalQuadraticRight, 100); // 1, 3
        ctx.stroke();

        // Zebras
        ctx.beginPath();
        ctx.lineTo(0, 480);
        ctx.quadraticCurveTo(xQuadraticLeft, 250, xFinalQuadraticLeft, 100); // 1 , 3
        ctx.stroke();
        ctx.beginPath();
        ctx.lineTo(800, 480); // 1
        ctx.quadraticCurveTo(xQuadraticRight, 150, xRight, 100); // 1
        ctx.stroke();
        ctx.restore();
    },
    
    drawCurveToRight: function (ctx, degree) {
        'use strict';
        ctx.save();
        ctx.translate(800, 0);
        ctx.scale(-1, 1);
        track.drawCurveToLeft(ctx, degree);
        ctx.restore();
    },
    
    drawCurveToStreight: function (ctx) {
        'use strict';
        if (player.wasLeft) {
            if (track.curveCycle > 0) {
                track.curveCycle--;
                track.drawCurveToLeft(ctx, track.curveCycle);
            } else {
                player.wasLeft = false;
				track.draw(ct0);
            }
        } else if (player.wasRight) {
            if (track.curveCycle > 0) {
                track.curveCycle--;
                track.drawCurveToRight(ctx, track.curveCycle);
            } else {
                player.wasRight = false;
				track.draw(ct0);
            }
        }
    },
    
    manager: function () {
        'use strict';
        if (track.direction === 0) {
            if (track.codeExecuted === false) {
                track.codeExecuted = true;
                player.isLeft = true;
                player.curvePhysics = 2;
                setTimeout(function () {
                    player.isLeft = false;
                    player.wasLeft = true;
                }, 10000);
            }
        } else if (track.direction === 1) {
            if (track.codeExecuted === false) {
                track.codeExecuted = true;
                player.isRight = true;
                player.curvePhysics = -2;
                setTimeout(function () {
                    player.isRight = false;
                    player.wasRight = true;
                    track.drawCurveToStreight(ct0, 4);
                }, 10000);
            }
        }
    },

    backgroundMountain: function (ctx) {
        'use strict';
        if (player.isLeft) {
            track.bgmountains.direction = -4;
        } else if (player.isRight) {
            track.bgmountains.direction = 4;
        } else {
            track.bgmountains.direction = 0;
        }
        ctx.clearRect(0, 0, 800, 100);
        ctx.drawImage(track.bgmountains, track.bgmountains.sourceX, 0, track.bgmountains.sourceEnd, track.bgmountains.height, 0, 0, track.bgmountains.sourceEnd, track.bgmountains.height);
        ctx.drawImage(track.bgmountains, 0, 0, track.bgmountains.width, track.bgmountains.height, track.bgmountains.sourceEnd, 0, track.bgmountains.width, track.bgmountains.height);
        
        track.bgmountains.sourceX = (track.bgmountains.sourceX + track.bgmountains.direction + 800) % 800;
        track.bgmountains.sourceEnd = 800 - track.bgmountains.sourceX;
        
    }
};

// Background Image and Track Results
track.bgmountains = new Image();
track.bgmountains.src = 'images/bgmountains.png';
track.bgmountains.direction = 0;
track.bgmountains.sourceX = 0;
track.bgmountains.sourceEnd = 800;
track.results = [];
track.results[0] = {
    driver: 'Speed Racer',
    time: '01:12'
};
track.results[1] = {
    driver: 'Bumblebee',
    time: '02:59'
};
track.results[2] = {
    driver: 'Ecto-1',
    time: '03:20'
};
track.results[3] = {
    driver: 'The Mystery Machine',
    time: '04:41'
};
track.results[4] = {
    driver: 'Dick Dastardly and Muttley',
    time: '09:24'
};

// Chronometer Object
var chronometer = {
    start: 0,
    end: 0,
    seconds: 0,
    minutes: 0,
    
    // Chronometer Methods
    begin: function () {
        'use strict';
        this.end = Date.parse(new Date());
        this.seconds = ((this.end - this.start) / 1000) % 60;
        this.minutes = Math.floor(((this.end - this.start) / 1000) / 60);
    }
};

// Score Object
var score = {
    userName: '',
    opponentMinutes: 0,
    opponentSeconds: 0,
    
    // Score Methods
    sort: function () {
        'use strict';
        var i;
        for (i = 0; i < track.results.length; i++) {
            this.opponentMinutes = +(track.results[i].time.slice(0, 2));
            this.opponentSeconds = +(track.results[i].time.slice(3, 5));
            if (chronometer.minutes < this.opponentMinutes || (chronometer.minutes === this.opponentMinutes && chronometer.seconds <= this.opponentSeconds)) {
                do {
                    score.userName = prompt('Congratulations! Enter your name:');
                } while (score.userName === null || score.userName === '');
                track.results.splice(i, 0, new ScoreConstructor(score.userName, ('0' + chronometer.minutes).slice(-2) + ':' + ('0' + chronometer.seconds).slice(-2)));
                break;
            }
        }
        score.show();
    },
    
    show: function () {
        'use strict';
        var stringResults = '<tr><th>Position #</th><th>Driver</th><th>Time</th></tr>',
            i;
        for (i = 0; i < track.results.length; i++) {
            stringResults += '<tr><td>' + (i + 1) + '</td><td>' + track.results[i].driver + '</td><td>' + track.results[i].time + '</td></tr>';
        }
        tableResults.innerHTML = stringResults;
    }
};


// Race Object
var race = {
    isRunning: false,
    
    // Race Methods
    drawHud: function (ctx) {
        'use strict';
        ctx.font = '25px Arial';
        ctx.fillStyle = 'white';
        ctx.fillText('Race Time: ' + ('0' + chronometer.minutes).slice(-2) + ':' + ('0' + chronometer.seconds).slice(-2), 10, 130);
        ctx.fillText('Position: ' + (50 - opponent.indexArray) + '/ 50', 10, 165);
        ctx.fillText('Speed: ' + player.speed + 'mph', 10, 200);
    },
    
    update: function () {
        'use strict';
        ct0.clearRect(0, 100, backCanvas.width, 400);
        ct1.clearRect(0, 100, backCanvas.width, 400);
        if (player.isLeft) {
            if (track.curveCycle < 4) {
				track.curveCycle++;
			}
            player.x += player.curvePhysics;
            player.cycle = 1;
            track.drawCurveToLeft(ct0, track.curveCycle);
        } else if (player.wasLeft) {
            track.drawCurveToStreight(ct0);
        } else if (player.isRight) {
            if (track.curveCycle < 4) {
				track.curveCycle++;
			}
            player.x += player.curvePhysics;
            player.cycle = 1;
            track.drawCurveToRight(ct0, track.curveCycle);
        } else if (player.wasRight) {
			track.drawCurveToStreight(ct0);
		} else {
            track.draw(ct0);
        }
        if (player.keyLeft === false && player.keyRight === false) {
            ct2.clearRect(0, 385, backCanvas.width, 115);
            player.draw(ct2, player.x);
        }
        track.backgroundMountain(ct0);
        chronometer.begin();
        race.drawHud(ct0);
        player.displaycementY(player.speed);
        opponent.management();
        opponent.collisionDetection(opponent.array[opponent.indexArray]);
        if ((50 - opponent.indexArray) === 0) {
            race.end();
        }
    },
    
    updateSpeed: function () {
        'use strict';
        player.speed = (260 - speed);
        opponent.array[opponent.indexArray].speedResultant = -(opponent.array[opponent.indexArray].speedY - player.speed);
        clearInterval(timerId);
        timerId = setInterval(function () { race.update(); }, speed);
    },
    
    begin: function () {
        'use strict';
        if (this.isRunning === false) {
            this.isRunning = true;
            race.sound.start.play();
            setTimeout(function () {
                race.sound.music.sound.loop = true;
                race.sound.music.play();
                opponent.generator(ct1);
                chronometer.start = Date.parse(new Date());
                timerId = setInterval(function () { race.update(); }, speed);
                setInterval(function () {
                    track.direction = Math.floor(Math.random() * 2);
                    track.codeExecuted = false;
                    track.manager();
                }, 20000);
            }, 3000);
        }
    },
    
    onLoad: function () {
        'use strict';
        race.sound.start = new race.sound.construct('sounds/v8Start.mp3');
        race.sound.crash = new race.sound.construct('sounds/crash.mp3');
        race.sound.music = new race.sound.construct('sounds/topGearTheme.mp3');
        race.sound.win = new race.sound.construct('sounds/mk64FirstPlace.wav');
        score.show();
        track.draw(ct0);
        track.backgroundMountain(ct0);
        ct1.drawImage(race.title, 0, 0, race.title.width, race.title.height, frontCanvas.width / 2 - race.title.width / 2, frontCanvas.height / 2 - race.title.height / 2, race.title.width, race.title.height);
    },
    
    end: function () {
        'use strict';
        clearInterval(timerId);
        race.sound.music.stop();
        race.sound.win.play();
        ct0.clearRect(0, 100, backCanvas.width, 400);
        ct1.clearRect(0, 100, backCanvas.width, 400);
        ct2.clearRect(0, 100, backCanvas.width, 400);
        track.draw(ct0);
        track.backgroundMountain(ct0);
        race.drawHud(ct0);
        ct1.drawImage(race.flag, 0, 0, race.flag.width, race.flag.height, frontCanvas.width / 2 - race.flag.width / 2, frontCanvas.height / 2 - race.flag.height / 2, race.flag.width, race.flag.height);
        score.sort();
    },
    
    // Sounds Methods
    sound: {
        music: 0,
        start: 0,
        crash: 0,
        win: 0,
        isMusic: true,
        construct: function (src) {
            'use strict';
            this.sound = document.createElement("audio");
            this.sound.src = src;
            this.sound.setAttribute("preload", "auto");
            this.sound.setAttribute("controls", "none");
            this.sound.style.display = "none";
            document.body.appendChild(this.sound);
            this.play = function () {
                this.sound.play();
            };
            this.stop = function () {
                this.sound.pause();
            };
        },
        
        musicToggle: function () {
            'use strict';
            if (race.sound.isMusic) {
                race.sound.music.stop();
                race.sound.isMusic = false;
            } else {
                race.sound.music.play();
                race.sound.isMusic = true;
            }
        }
    }
};

// Race Images
race.title = new Image();
race.title.src = 'images/gameTitle.png';
race.flag = new Image();
race.flag.src = 'images/flag.png';


// User Input
document.addEventListener('keydown', function (event) {
    'use strict';
    event.preventDefault();
    if (race.isRunning) {
        if (event.keyCode === 37) {
            player.leftKeyDown(ct2, player.x - 6);
        }
        if (event.keyCode === 39) {
            player.rightKeyDown(ct2, player.x + 6);
        }
        if (event.keyCode === 38) {
            if (speed > 100) {
                if (speed < 140) {
                    speed -= 2;
                } else {
                    speed -= 5;
                }
                race.updateSpeed();
            }
        }
        if (event.keyCode === 40) {
            if (speed < 240) {
                speed += 5;
                race.updateSpeed();
            }
        }
    }
    
});

document.addEventListener('keyup', function (event) {
    'use strict';
    event.preventDefault();
    if (race.isRunning) {
        if (event.keyCode === 37) {
            player.leftKeyUp(ct2, player.x);
        }
        if (event.keyCode === 39) {
            player.rightKeyUp(ct2, player.x);
        }
    }
});