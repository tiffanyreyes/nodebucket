/*
============================================
; Title:  employee.js
; Author: Tiffany Reyes
; Date:   25 October 2023
; Description: Employee Schema
;===========================================
*/

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// A mongoose employee schema

const employeeSchema = new Schema({
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    employeeId: {
      type: String,
      required: true
    },
 });

module.exports = mongoose.model('Employee', employeeSchema);