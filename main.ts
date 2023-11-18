controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    TGM.drop()
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    TGM.rotate(false)
})
function shouldMoveLeft () {
    if (controller.left.isPressed()) {
        left += 1
    } else {
        left = 0
    }
    return left == 1 || left > 15
}
function drawNextPiece () {
    next.fill(0)
    for (let point of TGM.nextPiecePositions(0)) {
        drawBlock(point.x + 4, point.y, point.pieceType, next)
    }
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    TGM.rotate(true)
})
function drawFieldBlocks () {
    field.fill(0)
    for (let x = 0; x <= 9; x++) {
        for (let y = 0; y <= 19; y++) {
            drawFieldBlock(x, y, TGM.getPiece(x, y), field)
        }
    }
    for (let point2 of TGM.ghostPiecePositions()) {
        drawGhostBlock(point2.x, point2.y, point2.pieceType, field)
    }
    for (let point3 of TGM.currentPiecePositions()) {
        drawBlock(point3.x, point3.y, point3.pieceType, field)
    }
}
function putPiece () {
    music.play(music.melodyPlayable(music.knock), music.PlaybackMode.InBackground)
    if (TGM.markErasingRows() > 0) {
        erasing = true
    } else {
        pause(200)
        TGM.popNext()
        TGM.pushRandomNext()
    }
}
function eraseRows () {
    music.play(music.melodyPlayable(music.magicWand), music.PlaybackMode.InBackground)
    pause(400)
    TGM.erase()
    TGM.popNext()
    TGM.pushRandomNext()
}
function drawFieldBlock (x: number, y: number, color: number, image2: Image) {
    if (color >= 1 && color <= 7) {
        image2.fillRect(x * 5, y * 5, 5, 5, color)
        image2.drawRect(x * 5, y * 5, 5, 5, color + 7)
    }
}
function drawBlock (x: number, y: number, color: number, image2: Image) {
    image2.fillRect(x * 5, y * 5, 5, 5, color)
}
function shouldMoveRight () {
    if (controller.right.isPressed()) {
        right += 1
    } else {
        right = 0
    }
    return right == 1 || right > 15
}
function drawGhostBlock (x: number, y: number, color: number, image2: Image) {
    image2.drawRect(x * 5, y * 5, 5, 5, color + 7)
}
let put = false
let right = 0
let erasing = false
let left = 0
let next: Image = null
let field: Image = null
let background = image.create(160, 120)
let backgroundSprite = sprites.create(background, SpriteKind.Projectile)
field = image.create(50, 100)
let fieldSprite = sprites.create(field, SpriteKind.Projectile)
next = image.create(50, 10)
let nextSprite = sprites.create(next, SpriteKind.Projectile)
fieldSprite.y = 65
nextSprite.y = 5
for (let index = 0; index <= 60; index++) {
    background.drawLine(0, index * 2, 159, index * 2, 11)
    background.drawLine(0, index * 2 + 1, 159, index * 2 + 1, 12)
}
background.fillRect(50, 10, 60, 110, 15)
background.fillRect(55, 15, 50, 100, 0)
TGM.pushRandomNextForFirst()
TGM.popNext()
TGM.pushRandomNext()
game.onUpdate(function () {
    if (erasing) {
        erasing = false
        eraseRows()
    } else if (put) {
        put = false
        putPiece()
    } else {
        if (shouldMoveRight()) {
            TGM.moveRight()
        }
        if (shouldMoveLeft()) {
            TGM.moveLeft()
        }
        if (controller.down.isPressed()) {
            if (!(TGM.moveDown())) {
                TGM.putCurrentPiece()
                put = true
            }
        }
    }
    drawFieldBlocks()
    drawNextPiece()
})
