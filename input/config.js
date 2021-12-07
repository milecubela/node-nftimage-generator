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


// Definiranje svih layera koji ce biti sastavljeni u canvas, dizajn bi trebao biti nacrtan u 1000x1000 formatu 
// Nemam dizajn, zbog toga sam skinuo random ikonice i stavio ih da pocinju sa razlicitih mjesta, u njihovim originalnim velicinama
// Zbog preglednosti funkcionalnosti
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
    size: {width: 100, height: 100}
},
{
    id: 3,
    name: "layer2",
    location: `${dir}/layer2/`,
    elements: getElements(`${dir}/layer2/`),
    position: { x: 200, y: 200},
    size: {width: 100, height: 100}
},
{
    id: 4,
    name: "layer3",
    location: `${dir}/layer3/`,
    elements: getElements(`${dir}/layer3/`),
    position: { x: 300, y: 300},
    size: {width: 100, height: 100}
},
{
    id: 5,
    name: "layer4",
    location: `${dir}/layer4/`,
    elements: getElements(`${dir}/layer4/`),
    position: { x: 400, y: 400},
    size: {width: 100, height: 100}
},
{
    id: 6,
    name: "layer5",
    location: `${dir}/layer5/`,
    elements: getElements(`${dir}/layer5/`),
    position: { x: 500, y: 500},
    size: {width: 100, height: 100}
},
{
    id: 7,
    name: "layer6",
    location: `${dir}/layer6/`,
    elements: getElements(`${dir}/layer6/`),
    position: { x: 600, y: 600},
    size: {width: 100, height: 100}
},
{
    id: 8,
    name: "layer7",
    location: `${dir}/layer7/`,
    elements: getElements(`${dir}/layer7/`),
    position: { x: 700, y: 700},
    size: {width: 100, height: 100}
},
]

module.exports = {layers, width, height}