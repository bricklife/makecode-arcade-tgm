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
    field.fill(10)
    for (let x = 0; x <= 9; x++) {
        for (let y = 0; y <= 19; y++) {
            drawBlock(x, y, TGM.getPiece(x, y), field)
        }
    }
    for (let point of TGM.ghostPiecePositions()) {
        drawBlock(point.x, point.y, 9, field)
    }
    for (let point of TGM.currentPiecePositions()) {
        drawBlock(point.x, point.y, point.pieceType, field)
    }
}
function checkErasing () {
    if (erasing) {
        erasing = false
        music.play(music.melodyPlayable(music.magicWand), music.PlaybackMode.InBackground)
        pause(400)
        TGM.erase()
        TGM.popNext()
        TGM.pushRandomNext()
    }
}
function checkPut () {
    if (put) {
        put = false
        music.play(music.melodyPlayable(music.knock), music.PlaybackMode.InBackground)
        if (TGM.markErasingRows() > 0) {
            erasing = true
        } else {
            pause(200)
            TGM.popNext()
            TGM.pushRandomNext()
        }
    }
}
function drawBlock (x: number, y: number, color: number, image2: Image) {
    if (color > 0) {
        image2.fillRect(x * 5, y * 5, 5, 5, color)
    }
}
function shouldMoveRight () {
    if (controller.right.isPressed()) {
        right += 1
    } else {
        right = 0
    }
    return right == 1 || right > 15
}
let right = 0
let put = false
let erasing = false
let left = 0
let next: Image = null
let field: Image = null
let wall = image.create(60, 110)
let wallSprite = sprites.create(wall, SpriteKind.Player)
field = image.create(50, 100)
let fieldSprite = sprites.create(field, SpriteKind.Projectile)
next = image.create(50, 10)
let nextSprite = sprites.create(next, SpriteKind.Projectile)
fieldSprite.y = 65
wallSprite.y = 65
nextSprite.y = 5
scene.setBackgroundColor(11)
wall.fill(14)
TGM.pushRandomNextForFirst()
TGM.popNext()
TGM.pushRandomNext()
game.onUpdate(function () {
    checkErasing()
    checkPut()
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
    drawFieldBlocks()
    drawNextPiece()
})
