namespace SpriteKind {
    //% isKind
    export const Number = SpriteKind.create()
}

//% blockNamespace="numbersprite"
//% blockGap=8
class NumberSprite extends Sprite {
    constructor(
        public number: number,
        public bg: number,
        public fg: number,
    ) {
        super(image.create(0, 0))
        this.setKind(SpriteKind.Number)
        this.setFlag(SpriteFlag.Ghost, true)
        this.update()
    }

    public update() {
        const right = this.right // store

        const str = this.number.toString()

        const width = str.length * 4 - 1
        const height = 5
        const img = image.create(width, height)
        img.fill(this.bg)

        for (let i = 0; i < str.length; i++) {
            const c = str[i]
            switch (c) {
                case "0":
                    img.drawRect(i * 4, 0, 3, 5, this.fg)
                    break
                case "1":
                    img.setPixel(i * 4, 0, this.fg)
                    img.drawLine(i * 4 + 1, 0, i * 4 + 1, 4, this.fg)
                    break
                case "2":
                    img.drawRect(i * 4, 0, 3, 5, this.fg)
                    img.setPixel(i * 4 + 1, 2, this.fg)
                    img.setPixel(i * 4, 1, this.bg)
                    img.setPixel(i * 4 + 2, 3, this.bg)
                    break
                case "3":
                    img.drawRect(i * 4, 0, 3, 5, this.fg)
                    img.setPixel(i * 4 + 1, 2, this.fg)
                    img.setPixel(i * 4, 1, this.bg)
                    img.setPixel(i * 4, 3, this.bg)
                    break
                case "4":
                    img.drawRect(i * 4, 0, 3, 3, this.fg)
                    img.drawLine(i * 4 + 2, 0, i * 4 + 2, 4, this.fg)
                    img.setPixel(i * 4 + 1, 0, this.bg)
                    break
                case "5":
                    img.drawRect(i * 4, 0, 3, 5, this.fg)
                    img.setPixel(i * 4 + 1, 2, this.fg)
                    img.setPixel(i * 4 + 2, 1, this.bg)
                    img.setPixel(i * 4, 3, this.bg)
                    break
                case "6":
                    img.drawRect(i * 4, 0, 3, 5, this.fg)
                    img.setPixel(i * 4 + 1, 2, this.fg)
                    img.setPixel(i * 4 + 2, 1, this.bg)
                    break
                case "7":
                    img.drawLine(i * 4, 0, i * 4 + 2, 0, this.fg)
                    img.drawLine(i * 4 + 2, 0, i * 4 + 2, 4, this.fg)
                    break
                case "8":
                    img.drawRect(i * 4, 0, 3, 5, this.fg)
                    img.setPixel(i * 4 + 1, 2, this.fg)
                    break
                case "9":
                    img.drawRect(i * 4, 0, 3, 5, this.fg)
                    img.setPixel(i * 4 + 1, 2, this.fg)
                    img.setPixel(i * 4, 3, this.bg)
                    break
                default:
                    img.fillRect(i * 4, 0, 3, 5, this.fg)
                    break
            }
        }

        this.setImage(img)
        this.right = right // restore
    }

    //% block="set $this(numberSprite) number to $number"
    //% group="Modify"
    //% weight=80
    public setNumber(number: number) {
        this.number = number || 0
        this.update()
    }

    //% block="change $this(numberSprite) number by $number"
    //% group="Modify"
    //% weight=60
    public changeNumber(number: number) {
        this.number += number || 0
        this.update()
    }

    //% block="$this(numberSprite) number"
    //% group="Modify"
    //% weight=10
    public getNumber(): number {
        return this.number
    }
}

//% color=#3e99de
//% icon="\uf031"
//% blockGap=8 block="Number Sprite"
//% groups='["Create", "Modify"]'
namespace numbersprite {

    //% block="number sprite $number || as $fg on $bg"
    //% blockId="numbersprite_create"
    //% blockSetVariable="numberSprite"
    //% expandableArgumentMode="toggle"
    //% bg.defl=0
    //% bg.shadow="colorindexpicker"
    //% fg.defl=1
    //% fg.shadow="colorindexpicker"
    //% group="Create"
    //% weight=100
    export function create(
        number: number,
        bg: number = 0,
        fg: number = 1,
    ): NumberSprite {
        const sprite = new NumberSprite(number, bg, fg)
        game.currentScene().physicsEngine.addSprite(sprite)
        return sprite
    }
}