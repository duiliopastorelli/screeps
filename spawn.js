const creepsDetails = require('utils.creepsDetails');

const numberOfExistingCreeps = Object.keys(Game.creeps).length;

function determineCreepsNeed() {
    if (numberOfExistingCreeps === 0) {
        let buildCost = creepsDetails.configuration.harvester.base.buildCost;
        suitableSpawn = determineSuitableSpawns(buildCost);
        suitableSpawn ?
            performCreepSpawn(suitableSpawn, creepsDetails.configuration.harvester.base.body) : //0.2 CPU
            null;
    }
}

function performCreepSpawn(spawnName, body) {
    let currentSpawn = Game.spawns[spawnName];
    if (currentSpawn.spawning === null) {
        console.log('Spawn is not currently spawning, initiate spawning now.');
        currentSpawn.spawnCreep(body, `Harvester-${Game.time}`, {
            memory: {
                role: 'harvester',
                activity: 'IDLE'
            }
        }); //0.2 CPU
    }
}

function determineSuitableSpawns(buildCost) {
    for (let key in Game.spawns) {
        if (
            Game.spawns[key].energy >= buildCost &&
            Game.spawns[key].spawning === null
        ) {
            return key;
        }
    }

    return null;
}

module.exports = {
    determineCreepsNeed
}
