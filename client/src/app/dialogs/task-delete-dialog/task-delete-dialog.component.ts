import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { EmployeesService } from 'src/app/employees.service';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';

@Component({
  selector: 'app-task-delete-dialog',
  templateUrl: './task-delete-dialog.component.html',
  styleUrls: ['./task-delete-dialog.component.css']
})
export class TaskDeleteDialogComponent {
  constructor(
    private employeesService: EmployeesService,
    private cookieService: CookieService,
    private dialogRef: MatDialogRef<TaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { taskId: number }) {}

  deleteTask() {
    const employeeId = this.cookieService.get('empId');
    this.employeesService.deleteTaskByEmployeeId(employeeId, this.data.taskId)
      .subscribe(() => {
        this.dialogRef.close(true);
      });
  }

}
