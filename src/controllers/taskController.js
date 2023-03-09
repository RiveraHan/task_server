const { validationResult } = require('express-validator');
const Task = require('../models/Task');
const Project = require('../models/Project');

exports.createTask = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { project } = req.body;

    const existsProject = await Project.findById(project);
    if (!existsProject) {
      return res.status(404).json({ msg: 'Project not found' });
    }

    if (existsProject.owner.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    const task = new Task(req.body);
    await task.save();
    res.json({ task });
  } catch (error) {
    console.error(error);
    res.status(500).send('There was an error saving');
  }
};

exports.getTasks = async (req, res) => {
  try {
    const { project } = req.query;

    const existsProject = await Project.findById(project);
    if (!existsProject) {
      return res.status(404).json({ msg: 'Project not found' });
    }

    if (existsProject.owner.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    const tasks = await Task.find({ project }).sort({ created: -1 });
    res.json({ tasks });
  } catch (error) {
    console.error(error);
    res.status(500).send('TThere was an error');
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { project, name, state } = req.body;

    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ msg: 'Task not found' });
    }

    const existsProject = await Project.findById(project);

    if (existsProject.owner.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }
    const newTask = {};
    newTask.name = name;
    newTask.state = state;

    task = await Task.findOneAndUpdate({ _id: req.params.id }, newTask, {
      new: true,
    });

    res.json({ task });
  } catch (error) {
    console.error(error);
    res.status(500).send('There was an error updating');
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { project } = req.query;

    const task = await Task.findById(req.params.id);

    if (!task) {
      res.status(404).send('Task not found');
    }

    const existsProject = await Project.findById(project);

    if (existsProject.owner.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Task.findOneAndRemove({ _id: req.params.id });
    res.json({ msg: 'Deleted task' });
  } catch (error) {
    console.error(error);
    res.status(500).send('There was an error');
  }
};
