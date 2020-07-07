export default {
    events: {
        /* eslint-disable */
        AchievementEarned: true,
        BattleRankUp: true,
        ContinentLock: true,
        ContinentUnlock: true,
        Death: true,
        FacilityControl: true,
        GainExperience: false,
        ItemAdded: false,
        MetagameEvent: true,
        PlayerFacilityCapture: true,
        PlayerFacilityDefend: true,
        PlayerLogin: true,
        PlayerLogout: true,
        SkillAdded: true,
        VehicleDestroy: true,
        /* eslint-enable */
    },
    logging: {
        validationRejects: true,
        censusIncomingEvents: true,
        censusEventContent: true,
    },
    monitoredServers: new Set([1,10,13,17,19,40,1000,2000]),
    monitoredZones: new Set([2,4,6,8]),
};