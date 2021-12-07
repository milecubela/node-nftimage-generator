const fs = require('fs')
const myArgs = process.argv.slice(2)
const {createCanvas, loadImage } = require('canvas')
const {layers, width, height} = require('./input/config')
const canvas = createCanvas(width, height)
// context
const ctx = canvas.getContext('2d')
const edition = myArgs.length > 0 ? Number(myArgs[0]) : 1 // Broj razlicitih slika koje ce se generirati
let metadata = []
let attributes = []
let hash = []
let decodedHash = []

// Pretvara canvas u png i sprema u /output/
const saveLayer = (_canvas,_edition) => {
    fs.writeFileSync(`./output/${_edition}.png`, _canvas.toBuffer("image/png"))
}

// Metadata za svaki edition
const addMetaData = (_edition) => {
    let dateTimeStamp = Date.now()
    let tempMetaData = {
        hash: hash.join(""),
        decodedHash: decodedHash,
        edition: _edition,
        date: dateTimeStamp,
        attributes: attributes
    }
    metadata.push(tempMetaData)
    // Nakon spremanja metadata, resetiranje ostalih atributa za iduci edition
    attributes = []
    hash = []
    decodedHash = []
}

const addAttributes = (_element, _layer) => {
    let tempAttributes = {
        id: _element.id,
        layer: _layer.name,
        name: _element.name,
        rarity: _element.rarity
    }
    attributes.push(tempAttributes)
    hash.push(_layer.id)
    hash.push(_element.id)
    decodedHash.push({[_layer.id]: _element.id})
}

const drawLayer = async (_layer, _edition) => {
    // Trazi random element iz layera
    let element = _layer.elements[Math.floor(Math.random() * _layer.elements.length)]
    // Dodaje atribute za metadata od trenutnog elementa i layera kojemu pripada
    addAttributes(element, _layer)
    // Ucitava element kao sliku, sprema u context/canvas varijablu
    const image = await loadImage(`${_layer.location}${element.fileName}`)
    ctx.drawImage(image, _layer.position.x, _layer.position.y, _layer.size.width, _layer.size.height)
    console.log(`EDITION ${_edition} ||  Created the ${_layer.name} layer, and choose element ${element.fileName}`)
    
    saveLayer(canvas, _edition)
}

for (let i = 1; i <= edition; i++) {
     layers.forEach( layer => {
       drawLayer(layer, i);
    })
    addMetaData(i)
    console.log("Creating edition" + i)
}

fs.readFile("./output/_metadata.json", (err, data) => {
    if(err) throw err
    fs.writeFileSync("./output/_metadata.json", JSON.stringify(metadata))
})