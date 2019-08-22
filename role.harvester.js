function runHarvesters() {

    for (let key in Game.creeps) {
        let currentCreep = Game.creeps[key];
        let activity = currentCreep.memory.activity;
        let destination = Game.getObjectById(currentCreep.memory.destinationId);



        switch (activity) {
            case 'IDLE':
                let sources = getAvailableResources(currentCreep);

                if (currentCreep.memory.lastSourceAssigned === undefined) {
                    currentCreep.memory.lastSourceAssigned = sources[0].id;
                }
                currentCreep.memory.destinationId = sources[0].id;
                currentCreep.memory.activity = 'MOVING_TO_RESOURCE';
                moveHarvester(currentCreep);
                break;

            case 'MOVING_TO_RESOURCE':
                if (currentCreep.harvest(destination) === ERR_NOT_IN_RANGE) {
                    moveHarvester(currentCreep);
                } else if (currentCreep.harvest(destination) === OK) {
                    currentCreep.memory.activity = 'HARVESTING';
                }
                break;

            case 'HARVESTING':
                if (currentCreep.carry.energy === currentCreep.carryCapacity) {
                    currentCreep.memory.activity = 'MOVING_TO_STRUCTURE';
                    currentCreep.memory.destinationId = currentCreep.room.controller.id;
                    moveHarvester(currentCreep);
                } else {
                    currentCreep.harvest(destination);
                }
                break;

            case 'MOVING_TO_STRUCTURE':
                if (currentCreep.transfer(destination, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    moveHarvester(currentCreep);
                } else if (currentCreep.transfer(destination, RESOURCE_ENERGY) === OK) {
                    currentCreep.memory.activity = 'UNLOADING';
                }
                break;


            case 'UNLOADING':
                if (currentCreep.carry.energy > 0) {
                    currentCreep.transfer(destination, RESOURCE_ENERGY);
                } else {
                    currentCreep.memory.activity = 'IDLE';
                }
                break;
        }
    }
}

function getAvailableResources(currentCreep) {
    if (currentCreep.room.memory.availableSources === undefined) {
        let sources = {};
        sources = currentCreep.room.find(FIND_SOURCES_ACTIVE); //M CPU
        let result = [];

        for (let key in sources) {
            result.push(sources[key]);
        }
        currentCreep.room.memory.availableSources = result;
    }
    return currentCreep.room.memory.availableSources;
}

function moveHarvester(currentCreep) {
    let destination = Game.getObjectById(currentCreep.memory.destinationId);
    currentCreep.moveTo(destination, { reusePath: 0 });
}

module.exports = {
    runHarvesters
}
