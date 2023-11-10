import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { EmployeesService } from 'src/app/employees.service';
import { Task } from 'src/app/models/task';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';

@Component({
  selector: 'app-task-update-dialog',
  templateUrl: './task-update-dialog.component.html',
  styleUrls: ['./task-update-dialog.component.css']
})
export class TaskUpdateDialogComponent {
  updateTaskForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private employeesService: EmployeesService,
    private cookieService: CookieService,
    private dialogRef: MatDialogRef<TaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { task: Task }) {}

  ngOnInit(): void {
    this.updateTaskForm = this.fb.group({description: [this.data.task.description, Validators.compose([Validators.required])]});
  }

  updateTask() {
    const employeeId = this.cookieService.get('empId');
    const formValues = this.updateTaskForm.value;

    const task: Task = {
      taskId: this.data.task.taskId,
      employeeId: this.data.task.employeeId,
      description: formValues.description,
      status: this.data.task.status
    };

    this.employeesService.updateTaskByEmployeeId(employeeId, task)
      .subscribe(() => {
        this.dialogRef.close(task);
      });
  }
}
