
import Task from '../model/Task.js';


export const addtask = async (req, res) => {
    
            if (!req.body.title && !req.body.description && !req.body.type && !req.body.status && !req.body.dueDate) {
                res.status(400).send({ message: "Content can not be empty!" });
            }
            
            const task = new Task({
                title: req.body.title,
                description: req.body.description,
                type: req.body.type,
                status: req.body.status,
                dueDate: req.body.dueDate,

            });
            
            await task.save().then(data => {
                res.send({
                    message:"task created successfully!!",
                    user:data
                });
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating task"
                });
            });
        };
    export const getTasks = async (req, res) => {
        try {
            const tasks = await Task.find();
            res.status(200).json(tasks);
        } catch(error) {
            res.status(404).json({message: error.message});
        }
        };
    export const getTask = async (req, res) => {
        try {
            const task = await Task.findById(req.params.id);
            res.status(200).json(task); 
        } catch(error) {    
            res.status(404).json({message: error.message});
        }

    };
    export const updatetask = async (req, res) => {
            if(!req.body) {
                res.status(400).send({
                    message: "Data to update can not be empty!"
                });
            }
            
            const id = req.params.id;
            
            await Task.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
                if (!data) {
                    res.status(404).send({
                        message: `Task not found.`
                    });
                }else{
                    res.send({ message: "Task updated successfully." })
                }
            }).catch(err => {
                res.status(500).send({
                    message: err.message
                });
            })
    };

    export const deletetask = async (req, res) => {
        await Task.findByIdAndRemove(req.params.id).then(data => {
            if (!data) {
              res.status(404).send({
                message: `Task not found.`
              });
            } else {
              res.send({
                message: "Task deleted successfully!"
              });
            }
        }).catch(err => {
            res.status(500).send({
              message: err.message
            });
        });
    };


    
    export default {addtask, getTask, getTasks, updatetask, deletetask};