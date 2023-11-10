/*
============================================
; Title:  task.ts
; Author: Tiffany Reyes
; Date:   3 Nov 2023
; Description: Task Model
;===========================================
*/

export interface Task {
  description: string,
  status: string,
  taskId?: number,
  employeeId?: string,
  priority?: number
}