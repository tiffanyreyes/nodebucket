import { Component, inject } from '@angular/core';
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


  deleteTask() {
    const data = inject(MAT_DIALOG_DATA);
    const cookieService = inject(CookieService);
    const employeesService = inject(EmployeesService);
    const dialogRef = inject(MatDialogRef<TaskDeleteDialogComponent>);

    const employeeId = cookieService.get('empId');
    employeesService.deleteTaskByEmployeeId(employeeId, data.taskId)
      .subscribe(() => {
        dialogRef.close(true);
      });

  }

}
