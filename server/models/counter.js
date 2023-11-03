/*
============================================
; Title:  counter.js
; Author: Tiffany Reyes
; Date:   31 October 2023
; Description: Counter Schema
;===========================================
*/

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// A mongoose employee schema

const counterSchema = new Schema({
    counterName: {
      type: String,
      required: true
    },
    value: {
      type: Number,
      required: true
    }
 });

module.exports = mongoose.model('Counter', counterSchema);