export default class MasterParser {

  constructor() {
    this.moves = {};
    this.dex = {};
    this.registered = false;
  }

  async init() {

    const url = "https://raw.githubusercontent.com/pokemongo-dev-contrib/pokemongo-game-master/master/versions/latest/GAME_MASTER.json";
    const masterRequest = await fetch(url);
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
          "name": pokemonSettings.pokemonId,
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

    this.registered = true;
    return this.dex;

  }

  lookupMoves(pokemonSettings) {
    const lookup = s => this.moves[s],
          hasQuickMoves  = pokemonSettings.hasOwnProperty("quickMoves"),
          hasChargeMoves = pokemonSettings.hasOwnProperty("cinematicMoves");
    return {
      "quick": hasQuickMoves ? pokemonSettings.quickMoves.map(lookup) : [],
      "charge": hasChargeMoves ? pokemonSettings.cinematicMoves.map(lookup) : [],
    };
  }

  static evolution(pokemonSettings) {
    return (pokemonSettings.hasOwnProperty("evolutionBranch")) ? pokemonSettings.evolutionBranch : [];
  }

  static stats(pokemonSettings) {
    return {
      "stamina": pokemonSettings.stats.baseStamina,
      "attack": pokemonSettings.stats.baseAttack,
      "defense": pokemonSettings.stats.baseDefense
    }
  }

  static candy(pokemonSettings) {
    return pokemonSettings.familyId.split("_").pop();
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
