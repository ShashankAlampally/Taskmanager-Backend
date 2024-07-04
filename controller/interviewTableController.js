const Task = require('../model/InterviewTable'); // Assuming Task model is defined in models/Task.js

exports.createObject = async (req, res) => {
    try {
        const { taskName, description, priority, status } = req.body;

        // Validate required fields
        if (!(taskName && description && priority && status)) {
            return res.status(400).send({ message: "All fields must be filled" });
        }

        // Create new task object
        const newTask = await Task.create({ taskName, description, priority, status });

        return res.status(200).send({ message: "Task added successfully", data: newTask });
    } catch (error) {
        console.error("Error creating task:", error);
        return res.status(500).send({ error: error.message });
    }
};

exports.viewObject = async (req, res) => {
    try {
        const tasks = await Task.find({});

        if (!tasks || tasks.length === 0) {
            return res.status(200).send({ message: "No tasks found" });
        }

        return res.status(200).send({ data: tasks });
    } catch (error) {
        console.error("Error fetching tasks:", error);
        return res.status(500).send({ error: error.message });
    }
};

exports.updateStatus = async (req, res) => {
    const taskId = req.params.id;
    const { taskName, description, priority, status } = req.body;

    try {
        const updatedTask = await Task.findByIdAndUpdate(
            taskId,
            { taskName, description, priority, status },
            { new: true } // Return the updated document
        );

        if (!updatedTask) {
            return res.status(404).send({ message: "Task not found" });
        }

        res.status(200).send({ message: "Task updated successfully", data: updatedTask });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.deleteObject = async (req, res) => {
    try {
        const { id } = req.params; // Extract id from request parameters

        // Validate id
        if (!id) {
            return res.status(400).send({ message: "id is required" });
        }

        // Find task by id and delete
        const deletedTask = await Task.findByIdAndDelete(id);

        if (!deletedTask) {
            return res.status(404).send({ message: "Task not found" });
        }

        return res.status(200).send({ message: "Task deleted successfully" });
    } catch (error) {
        console.error("Error deleting task:", error);
        return res.status(500).send({ error: error.message });
    }
};
