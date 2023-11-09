/*
============================================
; Title:  employee-routes.js
; Author: Tiffany Reyes
; Date:   25 October 2023
; Description: Employee API routes
;===========================================
*/

const express = require('express');
const router = express.Router();
const Employee = require('../models/employee');
const Task = require('../models/task')
const Counter = require('../models/counter')

/**
 * findEmployeeById
 * @openapi
 * /api/employees/{id}:
 *   get:
 *     tags:
 *       - Employees
 *     description:  API for returning a employee document
 *     summary: returns a employee document
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Employee document id
 *         example: 1007
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Employee document
 *       '500':
 *         description: Internal Server Error
 *       '404':
 *         description: Not Found
 */
router.get('/employees/:id', async(req, res) => {
  try {
    Employee.findOne({'employeeId': req.params.id})
      .then((employee) => {
        if(!employee) {
          console.log(`Employee with id ${req.params.id} Not Found`);
          return res.status(404).send({
            'message': 'Not Found'
          });
        }
        console.log(employee);
        res.json(employee);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({
          'message': 'Internal Server Error'
        });
      });
  }
  catch (e) {
    console.log(e);
    res.status(500).send({
        'message': 'Internal Server Error'
    });
  }
});

/**
 * findAllTasks
 * @openapi
 * /api/employees/{id}/tasks:
 *   get:
 *     tags:
 *       - Employees
 *     description:  API for returning a task document
 *     summary: returns a list of task documents for an employee
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Employee document id
 *         example: 1007
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Task document
 *       '500':
 *         description: Internal Server Error
 *       '404':
 *         description: Not Found
 */

router.get('/employees/:id/tasks', async(req, res) => {
    try { 
        Task.find({employeeId: req.params.id})
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
 * /api/employees/{id}/tasks:
 *   post:
 *     tags:
 *       - Employees
 *     name: createTask
 *     description: API for adding a new task document to MongoDB Atlas
 *     summary: Creates a new task document for an employee
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Employee document id
 *         example: 1007
 *         schema:
 *           type: string
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
 *       '201':
 *         description: Task added
 *       '500':
 *         description: Internal Server Error
 *       '404':
 *         description: Not Found
 */

router.post('/employees/:id/tasks', async(req, res) => {
    try {
        const task = {
            description: req.body.description,
            employeeId: req.params.id
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
                res.status(201).json(task);
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

/**
 * updateTask
 * @openapi
 * /api/employees/{id}/tasks/{taskId}:
 *   put:
 *     tags:
 *       - Employees
 *     name: updateTask
 *     description: API for updating a task document by id to MongoDB Atlas
 *     summary: Updates a task document
 *     parameters: 
 *       - name: id
 *         in: path
 *         required: true
 *         description: Employee document id
 *         example: 1007
 *         schema:
 *           type: string
 *       - name: taskId
 *         in: path
 *         required: true
 *         description: Task document id
 *         example: 1
 *         schema:
 *           type: string
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
 *       '204':
 *         description: No Content
 *       '500':
 *         description: Internal Server Error
 *       '404':
 *         description: Not Found
 */

router.put('/employees/:id/tasks/:taskId', async(req, res) => {
  try {
      const taskRequest = {
        description: req.body.description
      };

      const task = await Task.findOne({ taskId: req.params.taskId });

      if (task) {
        task.set({ description: taskRequest.description });
        await task.save()
          .then(() => {
            res.status(204).send();
          })
          .catch(err => {
            res.status(400).send();
          });
      }
      else {
        res.status(404).send({
          'message': 'Not Found.'
        });
      }
  } catch (e) {
      console.log(e);
      res.status(500).send({
          'message': `Server Exception: ${e.message}`
      });
  }
});

/**
 * deleteTask
 * @openapi
 * /api/employees/{id}/tasks/{taskId}:
 *   delete:
 *     tags:
 *       - Employees
 *     name: deleteTask
 *     description: API for deleting a task document by id to MongoDB Atlas
 *     summary: Deletes a task document
 *     parameters: 
 *       - name: id
 *         in: path
 *         required: true
 *         description: Employee document id
 *         example: 1007
 *         schema:
 *           type: string
 *       - name: taskId
 *         in: path
 *         required: true
 *         description: Task document id
 *         example: 1
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: No Content
 *       '404':
 *         description: Not Found
 *       '500':
 *         description: Internal Server Error
 */

router.delete('/employees/:id/tasks/:taskId', async(req, res) => {
  try {
      await Task.findOneAndDelete({ taskId: req.params.taskId })
        .then(() => {
          res.status(204).send();
        })
        .catch(err => {
          res.status(400).send();
        });
  } catch (e) {
      console.log(e);
      res.status(500).send({
          'message': `Server Exception: ${e.message}`
      });
  }
});

module.exports = router;