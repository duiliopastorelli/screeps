const numberOfExistingCreeps = Object.entries(Game.creeps).length;
const spawn1 = Game.spawns.Spawn1;

function determineCreepsNeed(threshold = 1){
    if (numberOfExistingCreeps < threshold) {
        console.log(`There not enough Creeps available (threshold is ${threshold}), we need to spawn a new one.`)
        spawnCreep([WORK, CARRY, MOVE]);
    }
}

function spawnCreep(body){
    if (spawn1.spawning === null) {
        console.log('Spawn is not currently spawning, initiate spawning now.');
        spawn1.spawnCreep(body, `Harvester-${Game.time}`);
    }
}

module.exports = {
    determineCreepsNeed
}
