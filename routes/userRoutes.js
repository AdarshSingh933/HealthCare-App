const express = require("express");
const { loginController, 
   registerController, 
   authController,
   applyDoctorController,
   getAllNotificationController,
   deleteAllNotificationController,
   getAllDocotrsController,
   bookeAppointmnetController,
  bookingAvailabilityController } = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");


const router = express.Router();

//login routes|| post
router.post('/login',loginController); 

//register routes|| post
router.post('/register',registerController);

//Auth || post
router.post('/getUserData',authMiddleware,authController);

//APply Doctor || POST
router.post("/apply-doctor", authMiddleware, applyDoctorController);

//Notifiaction  Doctor || POST
router.post(
    "/get-all-notification",
    authMiddleware,
    getAllNotificationController
  );

  //Notifiaction  Doctor || POST
router.post(
  "/delete-all-notification",
  authMiddleware,
  deleteAllNotificationController
);

//GET ALL DOC
router.get("/getAllDoctors", authMiddleware, getAllDocotrsController);

//BOOK APPOINTMENT
router.post("/book-appointment", authMiddleware, bookeAppointmnetController);

//Booking Avliability
router.post(
  "/booking-availbility",
  authMiddleware,
  bookingAvailabilityController
);


module.exports = router;