// Dependencies
const fs = require('fs');
const fetch = require('node-fetch');

// Helpers
const legacyMoves = require('./legacyMoves.js');
const shinyPokemon = require('./shinyPokemon.js');

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

    const masterUrl = "https://raw.githubusercontent.com/pokemongo-dev-contrib/pokemongo-game-master/master/versions/latest/V2_GAME_MASTER.json";
    const masterRequest = await fetch(masterUrl);
    const master = await masterRequest.json();

    this.moves = [...master.template]
      .filter(({templateId}) => templateId.match(/COMBAT_V\d{4}_MOVE/))
      .reduce((moves, {combatMove}) => {
        if (combatMove && combatMove.uniqueId) {
          moves[combatMove.uniqueId] = {
            "type": combatMove.type.split("_").pop().toLowerCase(),
            "name": move.replace(/_fast/i, ""),
            "power": combatMove.power
          };
        }
        return moves;
      }, {});

    this.dex = master.template
      .filter(({templateId}) => {
        return templateId.includes("_POKEMON_") &&
               templateId.includes("V0") &&
               !templateId.includes("SPAWN") &&
               !templateId.includes("FORMS");
      })
      .reduce((dex, config) => {
        const {templateId, pokemon: pokemonSettings} = config;
        const num = MasterParser.num(templateId);
        const name = MasterParser.name(pokemonSettings);
        if (name) {
          dex[num] = {
            "name": MasterParser.name(pokemonSettings),
            "candy": MasterParser.candy(pokemonSettings),
            "types": MasterParser.types(pokemonSettings),
            "stats": MasterParser.stats(pokemonSettings),
            "evolution": MasterParser.evolution(pokemonSettings),
            "moves": this.lookupMoves(pokemonSettings),
            "thirdMove": pokemonSettings.thirdMove,
            "buddyDistance": pokemonSettings.kmBuddyDistance,
            "icon": `https://assets.thesilphroad.com/img/pokemon/icons/96x96/${num}.png`,
            "shiny": false
          };
        }
        return dex;
      }, {});

    const gimmeLegacyMoves = await legacyMoves();
    this.registerLegacyMoves(gimmeLegacyMoves);

    const gimmeShinyPokemon = await shinyPokemon();
    this.registerShinyPokemon(gimmeShinyPokemon);

    this.registered = true;
    return this.dex;

  }

  lookupMoves(pokemonSettings) {
    const lookup = s => Object.assign(this.moves[s], {"legacy": false}),
          hasQuickMoves  = pokemonSettings.hasOwnProperty("quickMoves"),
          hasChargeMoves = pokemonSettings.hasOwnProperty("cinematicMoves");
    return {
      "fast": hasQuickMoves ? pokemonSettings.quickMoves.map(lookup) : [],
      "charge": hasChargeMoves ? pokemonSettings.cinematicMoves.map(lookup) : [],
    };
  }

  registerLegacyMoves(moves) {
    Object.entries(moves)
      .forEach(([num, moves]) => {
        moves
          .forEach(([name, type]) => {
            if (type == "fast") name += "_FAST";
            this.dex[num].moves[type].push({
              ...this.moves[name],
              "legacy": true
            });
          })
      });
  }

  registerShinyPokemon(nums) {
    nums
      .forEach(num => {
        if (!!Number(num))
          this.dex[num].shiny = true;
      });
  }

  static name(pokemonSettings) {
    if (pokemonSettings && pokemonSettings.uniqueId) {
      return uniqueId
        .replace(/_MALE/i, " ♂")
        .replace(/_FEMALE/i, " ♀");
    }
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
    const types = [pokemonSettings.type1];
    if (pokemonSettings.hasOwnProperty("type2"))
      types.push(pokemonSettings.type2);
    return types
      .map(type => type.split("_").pop().toLowerCase());
  }

  static num(templateId) {
    return Number(templateId.split("_").shift().split("").filter(i => Number(i) + 1).join(""));
  }

}
