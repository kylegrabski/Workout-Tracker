const router = require("express").Router();
const path = require("path");
const Workout = require("../models/workout");

// get all workouts
router.get("/api/workouts", (req, res) => {
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
  Workout.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    {
      $set: {
        type: req.body.type,
        name: req.body.name,
        weight: req.body.weight,
        sets: req.body.sets,
        reps: req.body.reps,
        duration: req.body.duration,
        distance: req.body.distance,
      },
    },
    (error, data) => {
      if (error) {
        res.send(error);
      } else {
        res.send(data);
      }
    }
  );
});

// POST ONE workout /api/workouts
router.post("/api/workouts", ({ body }, res) => {
  Workout.create(body)
    .then(({ _id }) =>
      Workout.findOneAndUpdate(
        {},
        {
          $push: { exercises: _id },
        },
        { new: true }
      )
    )
    .then((workoutdb) => {
      res.json(workoutdb);
    })
    .catch((err) => {
      res.json(err);
    });
});

//GET WORKOUT /api/workouts/range

module.exports = router;
