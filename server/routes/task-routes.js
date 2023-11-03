/*
============================================
; Title:  task-routes.js
; Author: Tiffany Reyes
; Date:   31 October 2023
; Description: Task API routes
;===========================================
*/

const express = require('express');
const router = express.Router();
const Task = require('../models/task')
const Counter = require('../models/counter')

/**
 * findAllTasks
 * @openapi
 * /api/tasks:
 *   get:
 *     tags:
 *       - Tasks
 *     description:  API for returning a task document
 *     summary: returns a list of task documents
 *     responses:
 *       '200':
 *         description: Task document
 *       '500':
 *         description: Internal Server Error
 *       '404':
 *         description: Not Found
 */

router.get('/tasks', async(req, res) => {
    try { 
        Task.find({})
            .then((tasks) => {
                console.log(tasks);
                res.json(tasks);
            })
            .catch((err) => { // catch mongo error
                console.log(err);
                res.status(500).send({
                    'message': 'Internal Server Error'
                });
            });
    }
    catch (e) { // catch api error
        console.log(e);
        res.status(500).send({
            'message': 'Internal Server Error'
        });
    }
  });
  
/**
 * createTask
 * @openapi
 * /api/tasks:
 *   post:
 *     tags:
 *       - Tasks
 *     name: createTask
 *     description: API for adding a new task document to MongoDB Atlas
 *     summary: Creates a new task document
 *     requestBody:
 *       description: Task information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - description
 *             properties:
 *               description:
 *                 type: string
 *             example:
 *               description: Create button
 *     responses:
 *       '200':
 *         description: Task added
 *       '500':
 *         description: Internal Server Error
 *       '404':
 *         description: Not Found
 */

router.post('/tasks', async(req, res) => {
    try {
        const task = {
            description: req.body.description
        }
        await Counter.findOneAndUpdate(
            {counterName: 'taskCounter'},
            {'$inc': {'value':1}},
            {new: true}
        )
        .then(async(counter) => {
            task.taskId = counter.value
            await Task.create(task)
            .then((task) => {
                console.log(task);
                res.json(task);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).send({
                    'message': `Internal Server Error: ${err}`
                });
            });
        })
    } catch (e) {
        console.log(e);
        res.status(500).send({
            'message': `Internal Server Error: ${e.message}`
        });
    }
});

  module.exports = router;










