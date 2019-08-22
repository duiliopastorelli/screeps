function sources(){
    return Game.spawns['Spawn1'].room.find(FIND_SOURCES);
}

module.exports = {
    sources
}