const Participant = require('../models/participantModel');

// Create a new participant
exports.createParticipant = async (req, res) => {
    try {
        const newParticipant = new Participant(req.body);
        const savedParticipant = await newParticipant.save();
        res.status(201).json(savedParticipant);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all participants
exports.getAllParticipants = async (req, res) => {
    try {
        const participants = await Participant.find();
        res.json(participants);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get participant by ID
exports.getParticipantById = async (req, res) => {
    try {
        const participant = await Participant.findById(req.params.id);
        if (!participant) return res.status(404).json({ message: 'Participant not found' });
        res.json(participant);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update participant
exports.updateParticipant = async (req, res) => {
    try {
        const updatedParticipant = await Participant.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedParticipant) return res.status(404).json({ message: 'Participant not found' });
        res.json(updatedParticipant);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete participant
exports.deleteParticipant = async (req, res) => {
    try {
        const deletedParticipant = await Participant.findByIdAndDelete(req.params.id);
        if (!deletedParticipant) return res.status(404).json({ message: 'Participant not found' });
        res.json({ message: 'Participant deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
