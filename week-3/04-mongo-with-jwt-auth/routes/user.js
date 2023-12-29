const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const jwt=require('jsonwebtoken');
const { Admin, Course, User } = require("../db/index");
const config = require('../config/jwt');
// User Routes
router.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;
    const userFind= await User.findOne({username:username});
      if(userFind){
        return res.status(409).json({message:"User already exists"})
      }   
    if (username && password) {
      const user = new User({ username: username, password: password });
      const accessToken = jwt.sign({ userId: user.id, username: user.username }, config.secret, { expiresIn: '1h' });
      await user.save().then(() => {
        return res.status(201).json({ token:accessToken,message: "User created successfully" });
      });
    } else {
      return res
        .status(400)
        .json({ message: "Please provide both username and password" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/courses", userMiddleware, async (req, res) => {
  // Implement listing all courses logic
  const courses = await Course.find();
  return res.status(201).json({ course: courses });
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  // Implement course purchase logic
  const username = req.headers["username"];
  const { courseId } = req.params;
  const userFind = await User.findOne({ username: username });
  if (!userFind) {
    return res.status(404).json({ err: "User not found" });
  }
  userFind.purchasedCourse.map((i) => {
    if (i === courseId) {
      return res.status(400).json({ err: "Course already purchased" });
    }
  });
  const course = await Course.findOne({ _id: courseId });
  if (!course) {
    return res.status(404).json({ err: "Course not found" });
  }
  userFind.purchasedCourse.push(courseId);
  await userFind.save();
  return res.status(201).json({ msg: "Course purchased successfully" });
});

router.get("/purchasedCourses",  userMiddleware, async(req, res) => {
  // Implement fetching purchased courses logic
  const username = req.headers["username"];
  const userFind = await User.findOne({ username: username });
  let purchasedCourses=[];
  if (!userFind) {
    return res.status(404).json({ err: "User not found" });
  }
  console.log(userFind.purchasedCourse)
  for (const courseId of userFind.purchasedCourse) {
    const course = await Course.findOne({ _id: courseId });

    if (course) {
      purchasedCourses.push({
        id: course._id,
        name: course.title,
        description: course.description,
        price: course.price,
      });
    }
  }
  console.log(purchasedCourses)
  return res.status(200).json({CoursesBought:purchasedCourses});
});

module.exports = router;
