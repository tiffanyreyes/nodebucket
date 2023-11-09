import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { EmployeesService } from 'src/app/employees.service';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.css']
})
export class TaskDialogComponent implements OnInit {
  createTaskForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private employeesService: EmployeesService,
    private cookieService: CookieService,
    private dialogRef: MatDialogRef<TaskDialogComponent>) {}

  ngOnInit(): void {
    this.createTaskForm = this.fb.group({description: ['', Validators.compose([Validators.required])]});
  }

  onSubmit() {
    const employeeId = this.cookieService.get('empId');
    const formValues = this.createTaskForm.value;
    const task: Task = {
      description: formValues.description
    };

    this.employeesService.createTaskByEmployeeId(employeeId, task)
      .subscribe((res) => {
        this.dialogRef.close(res);
      });
  }
}
