/*
============================================
; Title:  task.js
; Author: Tiffany Reyes
; Date:   25 October 2023
; Description: Task Schema
;===========================================
*/

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// A mongoose task schema

const taskSchema = new Schema({
    description: {
      type: String,
      required: true
    },
    taskId: {
      type: Number,
      required: true
    },
    employeeId: {
      type: String
    },
    priority: {
      type: Number
    },
    status: {
      type: String,
      required: true
    }
 });

module.exports = mongoose.model('Task', taskSchema);