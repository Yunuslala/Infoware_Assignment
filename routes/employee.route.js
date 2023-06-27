const express = require("express");
const router = express.Router();
const { sequelize } = require("../config/db");
const { Contact, Employee } = require("../models/model");
sequelize.sync();
const { body, validationResult,check } = require("express-validator");

router.post(
  "/employee/post",
  body("firstName")
    .exists()
    .withMessage("firstName is required")
    .isString()
    .withMessage("firstName must be a string")
    .isLength({ min: 1 }),
  body("lastName")
    .exists()
    .withMessage("lastName is required")
    .isString()
    .withMessage("lastName must be a string")
    .isLength({ min: 1 }),
  body("salary")
    .exists()
    .withMessage("salary is required")
    .custom((value) => {
      if (!Number.isInteger(value)) {
        throw new Error("salary must be an integer or a number string");
      }
      return true;
    }),
  body("JobTitle")
    .exists()
    .withMessage("JobTitle is required")
    .isString()
    .withMessage("JobTitle must be a string")
    .isLength({ min: 1 }),
    body("contacts")
    .isArray().withMessage('Contacts must be an array')
    .notEmpty().withMessage('Contacts array must not be empty'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
        const {firstName,lastName,salary,JobTitle,contacts}=req.body
       
      let data = await Employee.create({
        firstName,
        lastName,
        salary,
        JobTitle
    });
      const contactPromises = contacts.map((contact) =>
      Contact.create({
        employeeId: data.id,
        phoneNumber: contact.phoneNumber,
        email: contact.email,
        address:contact.address
      })
    );
    await Promise.all(contactPromises);
      res.status(201).send({ msg: "employee has been registered", data });
    } catch (error) {
      console.log(error);
      res.status(500).send({ msg: error });
    }
  }
);

router.delete(
  "/employee/:id",
  check("id")
    .exists()
    .withMessage("id is required")
    .isInt()
    .withMessage("id must be an integer"),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { id } = req.params;
      await Contact.destroy({ where: { EmployeeId: id } });
      const deletedData = await Employee.destroy({ where: { id } });
      res.status(204).send({ msg: "employee has been deleted", deletedData });
    } catch (error) {
      console.log(error);
      res.status(500).send({ msg: error });
    }
  }
);

router.get("/employee",async(req,res)=>{
    try {
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 10;
        const totalCount = await Contact.count();
        const totalPages = Math.ceil(totalCount / pageSize);
        const offset = (page - 1) * pageSize;
        const emplyees=await Employee.findAll({
            limit: pageSize,
            offset: offset,
            include: Contact
          });
        res.status(200).send(emplyees)
    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: error });
    }
}) 
router.get("/employee/:id",async(req,res)=>{
    try {
      const {id}=req.params
      const emplyees=await Employee.findAll({where:{id},include: Contact });
        if(emplyees.length==0){
            return res.status(404).send({"msg":`id ${id} is not valid`})
         }
        res.status(200).send(emplyees)
    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: error });
    }
})
router.get("/contacts",async(req,res)=>{
    try {
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 10;
        const totalCount = await Contact.count();
        const totalPages = Math.ceil(totalCount / pageSize);
        const offset = (page - 1) * pageSize;
        const Contacts=await Contact.findAll({
            limit: pageSize,
            offset: offset,
          },{ include: Employee });
        if(Contacts.length==0){
            return res.status(404).send({"msg":`id ${id} is not valid`})
         }
        res.status(200).send(Contacts)
    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: error });
    }
})

router.get("/contacts/:id",async(req,res)=>{
    try {
        const {id}=req.params
        const Contacts=await Contact.findAll({where:{id},include: Employee});
        if(Contacts.length==0){
           return res.status(404).send({"msg":`id ${id} is not valid`})
        }
        res.status(200).send(Contacts)
    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: error });
    }
})
router.delete("/contacts/:id",async(req,res)=>{
    try {
        const {id}=req.params
        const Contacts=await Contact.destroy({where:{id}});
        if(Contacts.length==0){
           return res.status(404).send({"msg":`id ${id} is not valid`})
        }
        res.status(204).send({"msg":`id ${id} employee has been deleted`})
    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: error });
    }
})
router.patch("/employee/:id", body('firstName').optional().notEmpty(),
body('lastName').optional().notEmpty(),
body('salary').optional().isInt(),
body('jobTitle').optional().notEmpty(),async(req,res)=>{
    try {
        const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { id } = req.params;
  const employee = await Employee.findOne({ where: { id } });
  if (!employee) {
    return res.status(404).json({ error: 'Employee not found' });
  }
  employee.firstName = req.body.firstName || employee.firstName;
  employee.lastName = req.body.lastName || employee.lastName;
  employee.salary = req.body.salary || employee.salary;
  employee.jobTitle = req.body.jobTitle || employee.jobTitle;
  await employee.save();
        res.status(204).send({"msg":`id ${id} contact has been updated`,employee})
    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: error });
    }
})
router.patch("/contact/:id",  body('phoneNumber').optional().isString(),
body('email').optional().isEmail(),body('address').optional().isString(),async(req,res)=>{
    try {
        const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;
  const contacts = await Contact.findOne({ where: {  id } });

  if (!contacts ) {
    return res.status(404).json({ error: 'contacts  not found' });
  }
  contacts .phoneNumber = req.body.phoneNumber || contacts .phoneNumber;
  contacts .email = req.body.email || contacts .email;
  contacts .address = req.body.address || contacts .address;
  await contacts .save();
        res.status(204).send({"msg":`id ${id} contact has been updated`,contacts})
    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: error });
    }
})
module.exports = {
  router,
};
