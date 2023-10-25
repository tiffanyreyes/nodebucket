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

export const taskSchema = new Schema({
    description: {
      type: String,
      required: true
    },
    employeeId: {
      type: String
    },
    priority: {
      type: Number
    }
 });

module.exports = mongoose.model('Task', taskSchema);