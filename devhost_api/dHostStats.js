const User = require('./models/user.js');
const evn ={
    "101": "CSS action",
    "102": "CodeForge",
    "103": "Capture the Flag",
    "104": "Sightless Synatax",
    "105": "Tech-Pitch",
    "106": "BGMI: Battlegrounds Mobile India",
    "107": "Valorant",
    "108": "RoboSumo (<5KG)",
    "109": "RoboSumo (>5KG)",
    "110": "LineFollower",
    "111": "RoboSoccer",
  }
async function regStats() {
    try {
        const result = await User.aggregate([
            { $unwind: "$events" },
            { $group: { 
                _id: "$events", 
                count: { $sum: 1 }
            }},
            { $sort: { count: -1 } }
        ]);
        const users = await User.find({}, { username: 1, eventDet: 1 }).lean();
        const eventGroup = {};
        users.forEach(user => {
            user.eventDet.forEach(event => {
                const { event_id, members } = event;
                if (!eventGroup[event_id]) {
                    eventGroup[event_id] = [];
                }
                eventGroup[event_id].push({
                    username: user.username,
                    members: members
                });
            });
        });
        const fres = result.map(item => ({
            event_name: evn[item._id] || item._id,
            regs: item.count,
            teamc: eventGroup[item._id].length
        }));
        const uc= await User.countDocuments();
        return {user_count: uc, regDetails: fres};
    } catch (err) {
        console.error("Error getting event registration counts:", err);
    }
}
module.exports = {
    regStats
};
