
/**
* Use this file to define custom functions and blocks.
* Read more at https://arcade.makecode.com/blocks/custom
*/

enum PieceType {
    //% block="none"
    None,
    //% block="I"
    I,
    //% block="T"
    T,
    //% block="L"
    L,
    //% block="J"
    J,
    //% block="S"
    S,
    //% block="Z"
    Z,
    //% block="O"
    O,
    //% block="wall"
    Wall,
    //% block="any"
    Any,
    //% block="erasing"
    Erasing,
}

/**
 * Custom blocks
 */
//% weight=100 color=#0fbc11 icon=""
namespace TGM {
    let gameController = new GameController()

    //% block
    export function getPiece(x: number, y: number): PieceType {
        return gameController.field.field[y + 1][x + 1]
    }

    //% block
    export function pushRandomNext() {
        const pieceType = allPieceType[Math.floor(Math.random() * allPieceType.length)]
        gameController.pushNext(pieceType)
    }

    //% block
    export function pushRandomNextForFirst() {
        const pieceType = allPieceTypeForFirst[Math.floor(Math.random() * allPieceTypeForFirst.length)]
        gameController.pushNext(pieceType)
    }

    //% block
    export function nextPieces(): PieceType[] {
        return gameController.nextPieces
    }

    //% block
    export function popNext() {
        gameController.popNext()
    }

    //% block
    export function nextPiecePositions(index: number): Point[] {
        const pieceType = gameController.nextPieces[index]
        const positions = allBlocks[pieceType][0]
        return positions.map(e => new Point(e[0], e[1], pieceType))
    }

    //% block
    export function currentPiecePositions(): Point[] {
        return gameController.blockState.positions()
            .map(e => new Point(e.x - 1, e.y - 1, gameController.blockState.pieceType))
    }

    //% block
    export function ghostPiecePositions(): Point[] {
        return gameController.ghost.positions()
            .map(e => new Point(e.x - 1, e.y - 1, gameController.blockState.pieceType))
    }

    //% block
    export function rotate(clockwise: boolean) {
        gameController.rotate(clockwise)
    }

    //% block
    export function moveRight() {
        gameController.move(1, 0)
    }

    //% block
    export function moveLeft() {
        gameController.move(-1, 0)
    }

    //% block
    export function moveDown(): boolean {
        return gameController.move(0, 1)
    }

    //% block
    export function drop() {
        while (gameController.move(0, 1)) { }
    }

    //% block
    export function putCurrentPiece() {
        gameController.putCurrentPiece()
    }

    //% block
    export function markErasingRows(): number {
        return gameController.markErasingRows()
    }

    //% block
    export function erase() {
        gameController.erase()
    }
}

//% blockNamespace=TGM
class Point {
    _x: number
    _y: number
    _pieceType: PieceType

    constructor(x: number, y: number, pieceType: PieceType) {
        this._x = x
        this._y = y
        this._pieceType = pieceType
    }

    //% blockCombine
    get x() { return this._x }
    //% blockCombine
    get y() { return this._y }
    //% blockCombine
    get pieceType() { return this._pieceType }
}