// Dependencies
const fs = require('fs');
const fetch = require('node-fetch');
const specials = require('./specials.js');

// MasterParser class
module.exports = class MasterParser {

  constructor() {
    this.moves = {};
    this.dex = {};
    this.registered = false;
  }

  save(dir) {
    ["latest", (new Date()).valueOf()]
      .map(name => `${dir}\\${name}.json`)
      .forEach(path => fs.writeFileSync(path, JSON.stringify(this.dex)));
  }

  async init() {

    const masterUrl = "https://raw.githubusercontent.com/pokemongo-dev-contrib/pokemongo-game-master/master/versions/latest/GAME_MASTER.json";
    const masterRequest = await fetch(masterUrl);
    const master = await masterRequest.json();

    this.moves = master["itemTemplates"]
    .filter(({templateId}) => {
      return templateId.includes("COMBAT_") &&
             !templateId.includes("LEAGUE") &&
             !templateId.includes("SETTINGS");
    })
    .reduce((moves, {combatMove}) => {
      const move = combatMove.uniqueId;
      moves[move] = {
        "type": combatMove.type.split("_").pop().toLowerCase(),
        "name": move.replace(/_fast/i, ""),
        "power": combatMove.power
      };
      return moves;
    }, {});

    this.dex = master["itemTemplates"]
      .filter(({templateId}) => {
        return templateId.includes("_POKEMON_") &&
               templateId.includes("V0") &&
               !templateId.includes("SPAWN") &&
               !templateId.includes("FORMS");
      })
      .reduce((dex, {templateId, pokemonSettings}) => {
        const num = MasterParser.num(templateId);
        dex[num] = {
          "name": MasterParser.name(pokemonSettings),
          "candy": MasterParser.candy(pokemonSettings),
          "types": MasterParser.types(pokemonSettings),
          "stats": MasterParser.stats(pokemonSettings),
          "evolution": MasterParser.evolution(pokemonSettings),
          "moves": this.lookupMoves(pokemonSettings),
          "thirdMove": pokemonSettings.thirdMove,
          "buddyDistance": pokemonSettings.kmBuddyDistance,
          "icon": `https://assets.thesilphroad.com/img/pokemon/icons/96x96/${num}.png`
        };
        return dex;
      }, {});

      for (let specialName of specials) {
        const specialUrl = `https://raw.githubusercontent.com/pokemongo-dev-contrib/pokemongo-game-master/master/special/${specialName}`;
        const specialRequest = await fetch(specialUrl);
        const specialData = await specialRequest.json();
        for (let itemTemplate of specialData.itemTemplates)
          this.updateMoves(itemTemplate);
      }

    this.registered = true;
    return this.dex;

  }

  lookupMoves(pokemonSettings) {
    const lookup = s => Object.assign(this.moves[s], {"event": false}),
          hasQuickMoves  = pokemonSettings.hasOwnProperty("quickMoves"),
          hasChargeMoves = pokemonSettings.hasOwnProperty("cinematicMoves");
    return {
      "quick": hasQuickMoves ? pokemonSettings.quickMoves.map(lookup) : [],
      "charge": hasChargeMoves ? pokemonSettings.cinematicMoves.map(lookup) : [],
    };
  }

  updateMoves({templateId, pokemonSettings}) {
    const num = MasterParser.num(templateId);
    for (let moveType of [["quickMoves", "quick"], ["cinematicMoves", "charge"]]) {
      const existingMoves = this.dex[num].moves[moveType[1]].map(m => m.name);
      for (let specialMove of pokemonSettings[moveType[0]]) {
        const cleanMove = specialMove.replace(/_fast/i, "");
        if (existingMoves.indexOf(cleanMove) === -1) {
          this.dex[num].moves[moveType[1]].push({
            ...this.moves[specialMove],
            "event": true
          });
        }
      }
    }
  }

  static name({pokemonId}) {
    return pokemonId
      .replace(/_MALE/i, " ♂")
      .replace(/_FEMALE/i, " ♀");
  }

  static evolution(pokemonSettings) {
    return (pokemonSettings.hasOwnProperty("evolutionBranch")) ?
      pokemonSettings.evolutionBranch.map(e => Object.assign(e, {"candy": MasterParser.candy(pokemonSettings)})) :
      [];
  }

  static stats(pokemonSettings) {
    return {
      "stamina": pokemonSettings.stats.baseStamina,
      "attack": pokemonSettings.stats.baseAttack,
      "defense": pokemonSettings.stats.baseDefense
    };
  }

  static candy(pokemonSettings) {
    return pokemonSettings.familyId
      .replace(/FAMILY_/i, "")
      .replace(/_/i, " ")
      .toLowerCase();
  }

  static types(pokemonSettings) {
    const types = [pokemonSettings.type];
    if (pokemonSettings.hasOwnProperty("type2"))
      types.push(pokemonSettings.type2);
    return types
      .map(type => type.split("_").pop().toLowerCase());
  }

  static num(templateId) {
    return Number(templateId.split("_").shift().split("").filter(i => Number(i) + 1).join(""));
  }

}
