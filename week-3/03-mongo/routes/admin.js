const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const {Admin,Course} = require('../db/index')
// Admin Routes
router.post('/signup', (req, res) => {
    try {
        // Implement admin signup logic
        const  {username,password}=req.body;
        if(username && password){
            const admin = new Admin({username:username,password:password});
            admin.save().then(()=>{
             return res.status(201).json({message:'Admin created successfully'});
            });
        }
        else{
            return res.status(400).json({message:"Please provide both username and password"});
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/courses', adminMiddleware, async(req, res) => {
    // Implement course creation logic
    const { title, description, price, imageLink } = req.body;

if (!title || !description || price === "" || imageLink === "") {
    return res.status(400).json({ message: "Missing fields" });
}

try {
    // Check if a course with the same title already exists
    const existingCourse = await Course.findOne({ title: title });

    if (existingCourse) {
        // If a course with the same title already exists, return an error
        return res.status(400).json({ message: "Course with the same title already exists" });
    }

    // If no course with the same title exists, create and save the new course
    let newCourse = new Course({ title, description, price, imageLink });
    await newCourse.save();

    return res.status(201).json({ course: newCourse });
} catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
}
 
});

router.get('/courses', adminMiddleware, async(req, res) => {
    // Implement fetching all courses logic
    const courses=await Course.find();
    return res.status(201).json({courses})
});

module.exports = router;