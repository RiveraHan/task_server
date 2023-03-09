const { validationResult } = require('express-validator');
const Project = require('../models/Project');

exports.createProject = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const project = new Project(req.body);

    project.owner = req.user.id;

    project.save();
    res.json(project);
  } catch (error) {
    console.error(error);
    res.status(500).send('There was an error creating');
  }
};

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ owner: req.user.id }).sort({
      owner: -1,
    });
    res.json({ projects });
  } catch (error) {
    console.error(error);
    res.status(500).send('There was an error getting');
  }
};

exports.updateProject = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name } = req.body;
  const newProject = {};

  if (name) {
    newProject.name = name;
  }

  try {
    let project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ msg: 'Project not found' });
    }

    if (project.owner.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    project = await Project.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: newProject },
      { new: true }
    );

    res.json({ project });
  } catch (error) {
    console.error(error);
    res.status(500).send('Sever error ');
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ msg: 'Project not found' });
    }

    if (project.owner.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Project.findOneAndRemove({ _id: req.params.id });
    res.json({ msg: 'Deleted project ' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Sever error');
  }
};
