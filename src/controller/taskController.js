const TaskModel = require('../model/taskModel');
const { ObjectId } = require('mongodb')

class TaskController {

    // Create all tasks from payload
    create(payload) {
        const newTask = new TaskModel(JSON.parse(payload));
        const { tasks } = JSON.parse(payload);
        tasks.map(task => {
            const taskModel = new TaskModel(task);
            taskModel.save();
        })
    }
}

module.exports.TaskController = TaskController;