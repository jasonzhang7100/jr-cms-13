const Course = require('../models/course');
const Student = require('../models/student');
const Joi = require('joi');

async function getAllCourses(req, res) {
  // db.collections.find()
  const courses = await Course.find().exec();
  return res.json(courses);
  // Course.findById().then().catch()
  // Course.findById((error, data) => {
  //
  // })
}

async function getCourseById(req, res) {
  const { id } = req.params;
  const course = await Course.findById(id).populate('students').exec();
  if (!course) {
    return res.sendStatus(404);
  }
  return res.json(course);
}

async function updateCourseById(req, res) {
  const { id } = req.params;
  const { name, description } = req.body;
  const course = await Course.findByIdAndUpdate(
    id,
    { name, description },
    { new: true }
  );
  if (!course) {
    return res.sendStatus(404);
  }
  return res.json(course);
}

async function deleteCourseById(req, res) {
  const { id } = req.params;
  const course = await Course.findByIdAndDelete(id);
  if (!course) {
    return res.sendStatus(404);
  }

  // db.collections.updateMany()
  await Student.updateMany(
    {
      courses: course._id
    },
    {
      $pull: {
        courses: course._id
      }
    }
  );

  return res.sendStatus(204);
  // return res.json(course);
}
async function createCourse(req, res) {
  // const { code, name, description } = req.body;
  // validate data
  const stringValidator = Joi.string().min(2).max(10).required();
  const schema = Joi.object({
    name: stringValidator,
    code: Joi.string()
      .regex(/^[a-zA-Z0-9]+$/)
      .required(),
    description: Joi.string()
  });
  const { code, name, description } = await schema.validateAsync(req.body, {
    allowUnknown: true,
    stripUnknown: true,
    abortEarly: false
  });
  const existCourse = await Course.findById(code).exec();
  if (existCourse) {
    // duplicate course code
    return res.sendStatus(409);
  }
  const course = new Course({ _id: code, name, description });
  await course.save();
  return res.status(201).json(course);
}

module.exports = {
  getAllCourses,
  getCourseById,
  updateCourseById,
  deleteCourseById,
  createCourse
};
