const fs = require('fs')
const {createCanvas, loadImage } = require('canvas')
// Canvas 1000x1000 px
const canvas = createCanvas(1000, 1000)
// context
const ctx = canvas.getContext('2d')
const {layers, width, height} = require('./input/config')


const saveLayer = (_canvas) => {
    fs.writeFileSync("./newImage.png", _canvas.toBuffer("image/png"))
    console.log("image created")
}

const drawLayer = async () => {
    const image = await loadImage("./slika.png")
    ctx.drawImage(image, 0, 0, width, height)
    console.log("this ran")
    saveLayer(canvas)
}

drawLayer()