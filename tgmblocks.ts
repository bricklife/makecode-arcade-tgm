namespace TGM {
    export enum PieceType {
        None,
        I,
        T,
        L,
        J,
        S,
        Z,
        O,
        Wall,
        Any,
        Erasing
    }

    export const allPieceType: PieceType[] = [
        PieceType.I, PieceType.T, PieceType.L, PieceType.J, PieceType.S, PieceType.Z, PieceType.O
    ]

    export const allPieceTypeForFirst: PieceType[] = [
        PieceType.I, PieceType.T, PieceType.L, PieceType.J, PieceType.O
    ]

    const None: number[][][] = []

    const I = [
        [[-1, 0], [0, 0], [1, 0], [2, 0]],
        [[1, -1], [1, 0], [1, 1], [1, 2]],
    ]

    const T = [
        [[0, 0], [1, 0], [0, 1], [-1, 0]],
        [[0, 0], [1, 0], [0, -1], [0, 1]],
        [[0, 0], [-1, 1], [0, 1], [1, 1]],
        [[0, 0], [-1, 0], [0, -1], [0, 1]],
    ]

    const L = [
        [[-1, 0], [0, 0], [1, 0], [-1, 1]],
        [[0, -1], [0, 0], [0, 1], [1, 1]],
        [[1, 0], [-1, 1], [0, 1], [1, 1]],
        [[-1, -1], [0, -1], [0, 0], [0, 1]],
    ]

    const J = [
        [[-1, 0], [0, 0], [1, 0], [1, 1]],
        [[0, -1], [1, -1], [0, 0], [0, 1]],
        [[-1, 0], [-1, 1], [0, 1], [1, 1]],
        [[0, -1], [0, 0], [-1, 1], [0, 1]],
    ]

    const S = [
        [[0, 0], [1, 0], [-1, 1], [0, 1]],
        [[-1, -1], [-1, 0], [0, 0], [0, 1]],
    ]

    const Z = [
        [[-1, 0], [0, 0], [0, 1], [1, 1]],
        [[1, -1], [0, 0], [1, 0], [0, 1]],
    ]

    const O = [
        [[0, 0], [1, 0], [0, 1], [1, 1]],
    ]

    export const allBlocks = [
        None,
        I,
        T,
        L,
        J,
        S,
        Z,
        O,
    ]
}
