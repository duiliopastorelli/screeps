// var roleHarvester = require('role.harvester');

module.exports.loop = function () {

    const spawn = require('spawn');
    const creepsThresholds = 1;

    console.log(`CPU bucket is: ${Game.cpu.bucket}`);

    spawn.determineCreepsNeed(creepsThresholds);
    
}
