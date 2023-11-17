namespace TGM {

    export class Field {
        width: number
        height: number

        field: PieceType[][]

        constructor(width: number, height: number) {
            this.width = width
            this.height = height
            this.field = []

            for (let i = 0; i < height + 2; i++) {
                this.field.push(this.makeEmptyRow())
            }
            for (let i = 0; i < width + 2; i++) {
                this.field[height + 1][i] = PieceType.Wall
            }
        }

        makeEmptyRow(): PieceType[] {
            let row: PieceType[] = []
            row.push(PieceType.Wall)
            for (let i = 0; i < this.width; i++) {
                row.push(PieceType.None)
            }
            row.push(PieceType.Wall)
            return row
        }
    }

    export class BlockStatePosition {
        x: number
        y: number
        canKick: boolean
    }

    export class BlockState {
        pieceType: PieceType
        x: number
        y: number
        rotation: number

        constructor(pieceType: PieceType, x: number, y: number, rotation = 0) {
            this.pieceType = pieceType
            this.x = x
            this.y = y
            this.rotation = rotation
        }

        static empty(): BlockState {
            return new BlockState(PieceType.None, 0, 0)
        }

        moved(dx: number, dy: number): BlockState {
            return new BlockState(this.pieceType, this.x + dx, this.y + dy, this.rotation)
        }

        rotated(clockwise: boolean): BlockState {
            let rotation = (this.rotation + (clockwise ? 3 : 1)) % 4
            return new BlockState(this.pieceType, this.x, this.y, rotation)
        }

        positions(): BlockStatePosition[] {
            const positions = allBlocks[this.pieceType]
            if (positions.length == 0) {
                return []
            }
            return positions[this.rotation % positions.length].map(e => {
                let p = new BlockStatePosition()
                p.x = e[0] + this.x
                p.y = e[1] + this.y
                p.canKick = this.pieceType != PieceType.I && this.pieceType != PieceType.O && e[0] != 0
                return p
            })
        }
    }

    export class GameController {
        field: Field
        blockState: BlockState

        constructor() {
            this.field = new Field(10, 20)
            this.blockState = BlockState.empty()
        }

        canPut(blockState: BlockState): PutTextResult {
            let blockedPositions: BlockStatePosition[] = []
            const positions = blockState.positions()
            for (let i = 0; i < positions.length; i++) {
                const p = positions[i]
                if (p.x < 0 || p.x > this.field.width + 1) { return PutTextResult.cannotPut }
                if (p.y < 0 || p.y > this.field.height + 1) { return PutTextResult.cannotPut }
                if (this.field.field[p.y][p.x] != PieceType.None) {
                    blockedPositions.push(p)
                }
            }

            if (blockedPositions.length == 0) {
                return PutTextResult.canPut
            }

            if (blockedPositions.filter(e => e.canKick).length > 0) {
                return PutTextResult.canKick
            }

            return PutTextResult.cannotPut
        }

        move(dx = 0, dy = 0): boolean {
            const newState = this.blockState.moved(dx, dy)
            if (this.canPut(newState) == PutTextResult.canPut) {
                this.blockState = newState
                return true
            }
            return false
        }

        rotate(clockwise: boolean): boolean {
            const newState = this.blockState.rotated(clockwise)
            switch (this.canPut(newState)) {
                case PutTextResult.canPut:
                    this.blockState = newState
                    return true

                case PutTextResult.canKick:
                    const rightMoved = newState.moved(1, 0)
                    if (this.canPut(rightMoved) == PutTextResult.canPut) {
                        this.blockState = rightMoved
                        return true
                    }
                    const leftMoved = newState.moved(-1, 0)
                    if (this.canPut(leftMoved) == PutTextResult.canPut) {
                        this.blockState = leftMoved
                        return true
                    }
                    return false

                default:
                    return false
            }
            return false
        }

        putCurrentPiece() {
            this.blockState.positions().forEach(e => {
                this.field.field[e.y][e.x] = this.blockState.pieceType
            })
            this.blockState = BlockState.empty()
        }

        markErasingRows(): number {
            let marked = 0
            for (let y = 1; y < this.field.height + 1; y++) {
                if (this.field.field[y].filter(e => e == PieceType.None).length == 0) {
                    marked++
                    for (let x = 1; x < this.field.width + 1; x++) {
                        this.field.field[y][x] = PieceType.Erasing
                    }
                }
            }
            return marked
        }

        erase() {
            let newField: PieceType[][] = []
            for (let y = 0; y < this.field.height + 2; y++) {
                if (this.field.field[y].filter(e => e == PieceType.Erasing).length > 0) {
                    newField.insertAt(0, this.field.makeEmptyRow())
                } else {
                    newField.push(this.field.field[y])
                }
            }
            this.field.field = newField
        }
    }

    export enum PutTextResult {
        canPut,
        canKick,
        cannotPut,
    }
}