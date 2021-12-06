const fs = require('fs')
const width = 1000
const height = 1000
const dir = __dirname

// Lista rarity-a, nalaze se u nazivu slike slika_r slika_sr 
const rarity = [
    { key: "", val: "original"},
    { key: "_r", val: "rare"},
    { key: "_sr", val: "super rare"},
]

// Vraća rarity ako ga slika ima
const addRarity = (_str) => {
    let itemRarity;
    rarity.forEach((r) => {
        if(_str.includes(r.key)) {
            itemRarity = r.val;
        }
    })
    return itemRarity
}


// Ukljanja .png sa kraja imena, također ukljanja rarity iz imena
const cleanName = (_str) => {
    let name = _str.slice(0, -4)
    rarity.forEach((r) => {
        name = name.replace(r.key, "")
    })
    return name
}

// Dohvaca sve elemente iz layer foldera
const getElements = path => {
    return fs
      .readdirSync(path)
      .filter((item) => !/(^|\/)\.[^\/\.]/g.test(item))
      .map((i, index) => {
        return {
          id: index + 1,
          name: cleanName(i),
          fileName: i,
          rarity: addRarity(i),
        };
      });
  };


// Definiranje svih layera koji ce biti sastavljeni u canvas, dizajn bi trebao biti nacrtan ali ja nisam umjetnik pa sam skinuo ikonice s interneta
// Pozicija x-y bi kod svih trebala biti 0,0, ali radi preglednosti 
const layers = [{
    id: 1,
    name: "background",
    location: `${dir}/background/`,
    elements: getElements(`${dir}/background/`),
    position: { x: 0, y: 0},
    size: {width: width, height: height}
},
{
    id: 2,
    name: "layer1",
    location: `${dir}/layer1/`,
    elements: getElements(`${dir}/layer1/`),
    position: { x: 100, y: 100},
    size: {width: width, height: height}
},
{
    id: 3,
    name: "layer2",
    location: `${dir}/layer2/`,
    elements: getElements(`${dir}/layer2/`),
    position: { x: 200, y: 200},
    size: {width: width, height: height}
},
{
    id: 4,
    name: "layer3",
    location: `${dir}/layer3/`,
    elements: getElements(`${dir}/layer3/`),
    position: { x: 300, y: 300},
    size: {width: width, height: height}
},
{
    id: 5,
    name: "layer4",
    location: `${dir}/layer4/`,
    elements: getElements(`${dir}/layer4/`),
    position: { x: 400, y: 400},
    size: {width: width, height: height}
},
]

module.exports = {layers, width, height}