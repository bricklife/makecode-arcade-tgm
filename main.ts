controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    TGM.drop()
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    TGM.rotate(false)
})
function should_move_right () {
    if (controller.right.isPressed()) {
        right += 1
    } else {
        right = 0
    }
    return right == 1 || right > 15
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    TGM.rotate(true)
})
function should_move_left () {
    if (controller.left.isPressed()) {
        left += 1
    } else {
        left = 0
    }
    return left == 1 || left > 15
}
controller.menu.onEvent(ControllerButtonEvent.Pressed, function () {
    TGM.putNext(TGM.PieceType.I)
})
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
    9
    ]
}
function drawBlock (x: number, y: number, color: number) {
    field.fillRect(x * 5, y * 5, 5, 5, colors[color])
}
let colors: number[] = []
let left = 0
let right = 0
let field: Image = null
setup()
scene.setBackgroundColor(12)
field = image.create(50, 100)
field.fill(15)
let fieldSprite = sprites.create(field, SpriteKind.Projectile)
let wall = image.create(60, 110)
wall.fillRect(0, 0, 60, 5, 11)
wall.fillRect(0, 105, 60, 5, 11)
wall.fillRect(0, 0, 5, 110, 11)
wall.fillRect(55, 0, 5, 110, 11)
let wallSprite = sprites.create(wall, SpriteKind.Player)
fieldSprite.y = 65
wallSprite.y = 65
TGM.putNext(TGM.PieceType.T)
game.onUpdate(function () {
    if (should_move_right()) {
        TGM.moveRight()
    }
    if (should_move_left()) {
        TGM.moveLeft()
    }
    if (controller.down.isPressed()) {
        TGM.moveDown()
    }
    for (let x = 0; x <= 9; x++) {
        for (let y = 0; y <= 19; y++) {
            drawBlock(x, y, TGM.getPiece(x, y))
        }
    }
    for (let point of TGM.currentPiecePositions()) {
        drawBlock(point.x, point.y, point.pieceType)
    }
})
