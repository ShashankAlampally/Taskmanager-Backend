const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    taskName: { type: String, required: true },
    description: { type: String, required: true },
    priority: { type: String, required: true },
    status: { type: String, required: true }
});

module.exports = mongoose.model('Task', TaskSchema);
