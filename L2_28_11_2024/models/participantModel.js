const mongoose = require('mongoose');

const ParticipantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    institution: { type: String, required: true },
    course: { type: String, required: true },
});

module.exports = mongoose.model('Participant', ParticipantSchema);
