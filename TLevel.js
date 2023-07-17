/* 
 * Credits: W. Verty
 * Discord: w.verty
 * last modified: July 17, 2023
 * Version: 1.0
*/

class TLevel {
  constructor(){
    this.level = {
      "name" : "",
      "width" : 16,
      "height" : 16,
      "tiledef" : "",
      "map" : [],
      "objects" : [],
    }
  }

  createLevelFromLine(line){
    let result = [];
    let li = line;

    for(let i=0; i != li.length; i++){
      var token = li[i].trim().split(" ");
      var addParts = {};

      if(parseInt(token[1]) === undefined) continue;

      addParts.x = (parseInt(token[0]) === 0 ? parseInt(token[0]) : this.level.width * parseInt(token[0]));
      addParts.y = (parseInt(token[1]) === 0 ? parseInt(token[1]) : this.level.height * parseInt(token[0]));
      addParts.tilex = parseInt(token[2]);
      addParts.tiley = parseInt(token[3]);

      result.push(addParts);
    }

    return result;
  }

  createLevelFromArray(text){
    let lines = text.trim().split("\n")
    let par = false;

    for(let i=0; i!=lines.length; i++){
      var org = lines[i].trim().replace(/ +/g, "");
      if(lines[i] == "") continue;

      if(org.startsWith("MAP") && !par) {
        par = true;

      } else if(org.startsWith("ENDMAP") && par) {
        par = false;

      } else if(par) {
        let line = lines[i].split(",");
        this.level.map = this.level.map. concat(this.createLevelFromLine(line));

      } else if(org.startsWith("NAME")) {
          this.level.name = lines[i].trim().split(" ")[1];
      } else if(org.startsWith("TILEDEF")) {
          this.level.tiledef = lines[i].trim().split(" ")[1];
      }
    }

    console.log(this.level);
  }
}

let text = `
  NAME verty_startcity
  TILEDEF tileset_level.png

  MAP
    0 0 0 0, 1 0 0 0, 2 0 0 0, 3 0 0 0
    0 1 0 0, 1 1 0 0, 2 1 0 0, 3 1 0 0
    0 2 0 0, 1 2 0 0, 2 2 0 0, 3 2 0 0
    0 3 0 0, 1 3 0 0, 2 3 0 0, 3 3 0 0
  ENDMAP
`

new TLevel().createLevelFromArray(text);
