# Level-information-generator
A Simple Text Level Information Generator

O código define uma classe chamada TLevel, que representa um nível do jogo. Aqui está uma explicação linha por linha do código:
# Explicação
```js
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
```
A classe TLevel possui um construtor que é executado quando uma instância da classe é criada. O construtor inicializa a propriedade level como um objeto que representa o nível.

O objeto level possui as seguintes propriedades: name, width, height, tiledef, map e objects.

Inicialmente, name é uma string vazia, width e height são definidos como 16, tiledef é uma string vazia, map é um array vazio e objects é um array vazio.

# createLevelFromLine
```js
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
```
O método createLevelFromLine recebe uma linha como entrada e retorna um array de objetos representando as partes adicionais do nível.
  
O método faz um loop pelos elementos da linha e, para cada elemento, remove os espaços em branco no início e no final usando trim() e divide a linha em partes separadas pelo espaço em branco usando split(" ").

Em seguida, cria um objeto addParts para armazenar as partes adicionais.

Se parseInt(token[1]) não for um número válido, o loop continua para a próxima iteração.

Caso contrário, as propriedades x, y, tilex e tiley do objeto addParts são definidas com base nos valores numéricos dos tokens.

O valor de x é calculado com base no token na posição 0, multiplicado pela largura do nível (this.level.width) ou mantido como zero se o token for zero.

O valor de y é calculado da mesma forma, mas usando o token na posição 1 e a altura do nível (this.level.height).

Os valores de tilex e tiley são extraídos dos tokens nas posições 2 e 3, respectivamente.

O objeto addParts é adicionado ao array result.

Por fim, o método retorna o array result.

# createLevelFromArray
```js
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
        this.level.map = this.level.map.concat(this.createLevelFromLine(line));

      } else if(org.startsWith("NAME")) {
          this.level.name = lines[i].split(" ")[1];
      }
    }

    console.log(this.level);
  }
```
O método createLevelFromArray recebe um texto contendo as informações do nível e processa-o para preencher as propriedades do objeto level.

O texto é dividido em linhas usando split("\n") e armazenado no array lines.
A variável par é inicializada como false.

Em seguida, há um loop que itera por todas as linhas do array lines.

Cada linha é limpa de espaços extras no início e no final usando trim() e removendo os espaços consecutivos usando replace(/ +/g, "").

Se a linha for vazia, o loop continua para a próxima iteração.

Se a linha começar com "MAP" e par for false, isso significa que encontramos o início das informações do mapa. Nesse caso, par é definido como true.

Se a linha começar com "ENDMAP" e par for true, isso significa que encontramos o final das informações do mapa. Nesse caso, par é definido como false.

Se par for true, significa que estamos dentro do bloco de informações do mapa.

A linha é dividida em partes separadas por vírgulas usando split(",") e armazenada no array line.

O método createLevelFromLine é chamado, passando a linha como argumento, para obter as partes adicionais do nível.

As partes adicionais são concatenadas ao array map do objeto level usando concat().

Se a linha começar com "NAME", isso significa que encontramos o nome do nível. Nesse caso, o nome é extraído da linha e atribuído à propriedade name do objeto level.

Por fim, o método imprime o objeto level no console.
# resultado
```js
let text = `
  NAME verty_startcity

  MAP
    0 0 0 0, 1 0 0 0, 2 0 0 0, 3 0 0 0
    0 1 0 0, 1 1 0 0, 2 1 0 0, 3 1 0 0
    0 2 0 0, 1 2 0 0, 2 2 0 0, 3 2 0 0
    0 3 0 0, 1 3 0 0, 2 3 0 0, 3 3 0 0
  ENDMAP
`

new TLevel().createLevelFromArray(text);
```

```js
// Output
{
  name: 'verty_startcity',
  width: 16,
  height: 16,
  tiledef: '',
  map: [
    { x: 0, y: 0, tilex: 0, tiley: 0 },
    { x: 16, y: 0, tilex: 0, tiley: 0 },
    { x: 32, y: 0, tilex: 0, tiley: 0 },
    { x: 48, y: 0, tilex: 0, tiley: 0 },
    { x: 0, y: 0, tilex: 0, tiley: 0 },
    { x: 16, y: 16, tilex: 0, tiley: 0 },
    { x: 32, y: 32, tilex: 0, tiley: 0 },
    { x: 48, y: 48, tilex: 0, tiley: 0 },
    { x: 0, y: 0, tilex: 0, tiley: 0 },
    { x: 16, y: 16, tilex: 0, tiley: 0 },
    { x: 32, y: 32, tilex: 0, tiley: 0 },
    { x: 48, y: 48, tilex: 0, tiley: 0 },
    { x: 0, y: 0, tilex: 0, tiley: 0 },
    { x: 16, y: 16, tilex: 0, tiley: 0 },
    { x: 32, y: 32, tilex: 0, tiley: 0 },
    { x: 48, y: 48, tilex: 0, tiley: 0 }
  ],
  objects: []
}
```
- O código cria uma instância da classe TLevel usando new TLevel() e chama o método createLevelFromArray passando o texto como argumento.
O objetivo geral desse código é analisar o texto fornecido, que contém informações sobre um nível de jogo, e preencher as propriedades do objeto level com base nesses dados. O resultado final é impresso no console.

# Créditos

Esta explicação foi gerada usando o modelo de linguagem GPT-3.5 da OpenAI.

- Modelo de linguagem: GPT-3.5
- Desenvolvido por: OpenAI
- Site da OpenAI: https://openai.com

O código foi explicado de forma detalhada com a ajuda deste modelo de linguagem. Agradecemos à OpenAI por fornecer essa tecnologia avançada de IA.
