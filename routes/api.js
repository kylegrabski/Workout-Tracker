const router = require("express").Router();
const path = require("path");
const Workout = require("../models/workout");

// get all workouts
router.get("/api/workouts", (req, res) => {
  console.log(" GET /api/workouts HIT HERE");
  Workout.find({})
    // .populate("exercises")
    .then((workoutdb) => {
      res.json(workoutdb);
    })
    .catch((err) => {
      res.json(err);
    });
});

// FIND ONE and update a workout /api/workouts/:id
router.put("/api/workouts/:id", (req, res) => {
  console.log(" PUT /api/workouts/:id HIT HERE");
  console.log(" PUT /api/workouts/:id HIT HERE WITH REQ", res);
  Workout.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    {
      $set: {
        exercises: {
          type: req.body.type,
          name: req.body.name,
          weight: req.body.weight,
          sets: req.body.sets,
          reps: req.body.reps,
          duration: req.body.duration,
          distance: req.body.distance,
        },
      },
    },
    (error, data) => {
      if (error) {
        console.log("ERROR AT PUT", error);
        res.send(error);
      } else {
        console.log("SUCCESS AT PUT", data);
        res.send(data);
      }
    }
  );
});

// POST ONE workout /api/workouts
router.post("/api/workouts", ({ body }, res) => {
  console.log("POST /api/workouts HIT HERE");
  Workout.create(body)

    .then((workoutdb) => {
      res.json(workoutdb);
    })
    .catch((err) => {
      res.json(err);
    });
});

//GET WORKOUT /api/workouts/range
router.get("/api/workouts/range", (req, res) => {});

module.exports = router;
