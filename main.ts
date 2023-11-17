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
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    TGM.rotate(true)
})
function drawAllBlocks () {
    for (let x = 0; x <= 9; x++) {
        for (let y = 0; y <= 19; y++) {
            drawBlock(x, y, TGM.getPiece(x, y))
        }
    }
    for (let point of TGM.currentPiecePositions()) {
        drawBlock(point.x, point.y, point.pieceType)
    }
}
function setup () {
    colors = [
    15,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    15
    ]
}
function drawBlock (x: number, y: number, color: number) {
    field.fillRect(x * 5, y * 5, 5, 5, colors[color])
}
function shouldMoveRight () {
    if (controller.right.isPressed()) {
        right += 1
    } else {
        right = 0
    }
    return right == 1 || right > 15
}
let erasing = 0
let right = 0
let colors: number[] = []
let left = 0
let field: Image = null
setup()
scene.setBackgroundColor(11)
field = image.create(50, 100)
field.fill(15)
let fieldSprite = sprites.create(field, SpriteKind.Projectile)
let wall = image.create(60, 110)
wall.fillRect(0, 0, 60, 5, 14)
wall.fillRect(0, 105, 60, 5, 14)
wall.fillRect(0, 0, 5, 110, 14)
wall.fillRect(55, 0, 5, 110, 14)
let wallSprite = sprites.create(wall, SpriteKind.Player)
fieldSprite.y = 65
wallSprite.y = 65
TGM.putRandomNextForFirst()
game.onUpdate(function () {
    if (erasing > 0) {
        erasing += -1
        if (erasing == 0) {
            TGM.erase()
            TGM.putRandomNext()
        }
    }
    if (shouldMoveRight()) {
        TGM.moveRight()
    }
    if (shouldMoveLeft()) {
        TGM.moveLeft()
    }
    if (controller.down.isPressed()) {
        if (!(TGM.moveDown())) {
            TGM.putCurrentPiece()
            music.play(music.melodyPlayable(music.knock), music.PlaybackMode.InBackground)
            if (TGM.markErasingRows() > 0) {
                music.play(music.melodyPlayable(music.magicWand), music.PlaybackMode.InBackground)
                erasing = 20
            } else {
                pause(200)
                TGM.putRandomNext()
            }
        }
    }
    drawAllBlocks()
})
