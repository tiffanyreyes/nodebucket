import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { EmployeesService } from '../employees.service';
import { CookieService } from 'ngx-cookie-service';
import { Task } from '../models/task';
import { MatDialog } from '@angular/material/dialog';
import { TaskDialogComponent } from '../dialogs/task-dialog/task-dialog.component';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})

export class TasksComponent implements OnInit {
  employeeName = '';

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
  }

  openTaskDialog() {
    this.dialog.open(TaskDialogComponent, {
      width: '500px'
    });
  }
}
