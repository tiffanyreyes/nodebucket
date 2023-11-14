/**
 * Title: tasks.component.ts
 * Author: Tiffany Reyes
 * Date: 10 Nov 2023
 */

// imports statements
import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { EmployeesService } from '../employees.service';
import { CookieService } from 'ngx-cookie-service';
import { Task } from '../models/task';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TaskDialogComponent } from '../dialogs/task-dialog/task-dialog.component';
import { TaskDeleteDialogComponent } from '../dialogs/task-delete-dialog/task-delete-dialog.component';
import { TaskUpdateDialogComponent } from '../dialogs/task-update-dialog/task-update-dialog.component';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})

export class TasksComponent implements OnInit {
  employeeName = '';
  employeeId: string;
  progress = 0;
  createDialogRef: MatDialogRef<TaskDialogComponent>;
  deleteDialogRef: MatDialogRef<TaskDeleteDialogComponent>;
  updateDialogRef: MatDialogRef<TaskUpdateDialogComponent>;

  todo: Task[] = [];

  done: Task[] = [];

  constructor(
    private employeesService: EmployeesService,
    private cookieService: CookieService,
    public dialog: MatDialog) {}

  ngOnInit(): void {
    this.employeeId = this.cookieService.get('empId');
    this.employeeName = this.cookieService.get('fullName');
    this.employeesService.findTasksByEmployeeId(this.employeeId)
      .subscribe((res) => {
        this.todo = res.filter(task => task.status === 'todo');
        this.done = res.filter(task => task.status === 'completed');

        this.calculateProgress();
      });
  }

  drop(event: CdkDragDrop<Task[]>) { // drag and drop list logic
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const task = event.previousContainer.data[event.previousIndex];

      if (event.container.id === 'done-list') {
        task.status = 'completed';
      }
      else {
        task.status = 'todo';
      }

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );

      this.employeesService.updateTaskByEmployeeId(this.employeeId, task).subscribe();
    }

    this.calculateProgress();
  }

  openTaskDialog() {
    this.createDialogRef = this.dialog.open(TaskDialogComponent, {
      width: '500px'
    });

    this.createDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.todo.push(result);
        this.calculateProgress();
      }
    });
  }

  calculateProgress() { // progress bar logic
    if(this.todo.length + this.done.length === 0) {
      return;
    }

    this.progress = (this.done.length/(this.todo.length + this.done.length)) * 100;
  }

  deleteTask(taskId: number) { // deleting task
    this.deleteDialogRef = this.dialog.open(TaskDeleteDialogComponent, {
      data: { taskId },
      width: '500px'
    });

    this.deleteDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.todo = this.todo.filter(task => task.taskId !== taskId);
      }
    });
  }

  updateTask(task: Task) { // updating task
    this.updateDialogRef = this.dialog.open(TaskUpdateDialogComponent, {
      data: { task },
      width: '500px'
    });

    this.updateDialogRef.afterClosed().subscribe((result: Task) => {
      if (result) {
        this.todo = this.todo.map(task => {
          return task.taskId === result.taskId ? result : task;
        });
      }
    });
  }
}
