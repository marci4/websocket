/**
 *  ### CENSUS RESPONSE ATTRIBUTES ####
 * "event_name":"", 
 * "character_id":"",
 * "timestamp":"",
 * "world_id":"",
 * "achievement_id":"",
 * "zone_id":""
 * ### END ###
**/
module.exports = (sequelize, Sequelize) => {
    const AchievementEarned = sequelize.define('AchievementEarned', {
        timestamp: {
            type: Sequelize.BIGINT
        },
        character_id: {
            type: Sequelize.BIGINT
        },
        event_name: {
            type: Sequelize.STRING
        },
        achievement_id: {
            type: Sequelize.INTEGER.UNSIGNED
        },
        world_id: {
            type: Sequelize.INTEGER
        },
        zone_id: {
            type: Sequelize.INTEGER
        },
    });
  
    return AchievementEarned;
  };