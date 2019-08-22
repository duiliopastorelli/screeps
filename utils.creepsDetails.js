const rolesProportions = {
    harvesters: 1
}

const configuration = {
    harvester: {
        base: {
            body: [WORK, CARRY, MOVE],
            buildCost: 200
        }
    }
}

function getCreepsRolesStatistic() {
    let result = {
        harvesters: 0
    };

    for(let key in Game.creeps) {
        switch (Game.screeps[key].memory.role) {
            case 'harvester':
            result.harvesters ++;
            break;
        }
    }

    return result;
}

module.exports = {
    getCreepsRolesStatistic,
    rolesProportions,
    configuration
}