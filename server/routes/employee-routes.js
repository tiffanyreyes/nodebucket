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

module.exports = router;