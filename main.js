const spawn = require('spawn');
const harvester = require('role.harvester');

module.exports.loop = function () {

    const creepsThresholds = 1;

    if (Game.cpu.bucket < 10000) {
        console.log(`CPU bucket is:     ${Game.cpu.bucket}`);
    }

    if (Game.cpu.tickLimit < 500) {
        console.log(`CPU tick limit is: ${Game.cpu.tickLimit}`);
    }

    spawn.determineCreepsNeed(); //0.2 CPU
    harvester.runHarvesters();
}
