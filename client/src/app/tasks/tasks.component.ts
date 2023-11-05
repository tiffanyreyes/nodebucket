import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { EmployeesService } from '../employees.service';
import { CookieService } from 'ngx-cookie-service';
import { Task } from '../models/task';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TaskDialogComponent } from '../dialogs/task-dialog/task-dialog.component';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})

export class TasksComponent implements OnInit {
  employeeName = '';
  progress = 0;
  dialogRef: MatDialogRef<TaskDialogComponent>;

  todo: Task[] = [];

  done: Task[] = [];

  constructor(
    private employeesService: EmployeesService,
    private cookieService: CookieService,
    public dialog: MatDialog) {}

  ngOnInit(): void {
    const employeeId = this.cookieService.get('empId');
    this.employeeName = this.cookieService.get('fullName');
    this.employeesService.findTasksByEmployeeId(employeeId)
      .subscribe((res) => {
        this.todo = res;

        this.calculateProgress();
      });
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }

    this.calculateProgress();
  }

  openTaskDialog() {
    this.dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '500px'
    });

    this.dialogRef.afterClosed().subscribe(result => {
      this.todo.push(result);
    });
  }

  calculateProgress() {
    if(this.todo.length + this.done.length === 0) {
      return;
    }

    this.progress = (this.done.length/(this.todo.length + this.done.length)) * 100;
  }
}
