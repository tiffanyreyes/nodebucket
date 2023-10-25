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
      Employee.findOne({'_id': req.params.id})
          .then((employee) => {
              console.log(employee);
              res.json(employee);
          })
          .catch((err) => {
              console.log(err);
              res.status(404).send({
                  'message': `Not Found`
              });
          });
  } catch (e) {
      console.log(e);
      res.status(500).send({
          'message': 'Internal Server Error'
      });
  }
});

module.exports = router;