/**
 * Title: sign-in.component.ts
 * Author: Tiffany Reyes
 * Date: 10 Nov 2023
 * Description: sign-in component
 */

// exporting book class elements
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeesService } from '../employees.service';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  signInForm: FormGroup;
  errorMessage: string;

  constructor(private router: Router, private fb: FormBuilder, private employeesService: EmployeesService, private cookieService: CookieService) {}

  ngOnInit(): void { // validation for sign-in
    this.signInForm = this.fb.group({employeeId: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])]});
  }

  onSubmit() {
    const formValues = this.signInForm.value;
    const employeeId = formValues.employeeId;
    this.employeesService.findEmployeeById(employeeId)
      .subscribe({
        next: (res) => {
          this.cookieService.set('empId', employeeId, 1);
          this.cookieService.set('fullName', `${res.firstName} ${res.lastName}`, 1);
          this.router.navigate(['/tasks']);
        },
        error:  (err) => {
          console.error(err);
          this.errorMessage = 'Invalid sign-in.'
        }
      });
  }

  get form() {
    return this.signInForm.controls;
  }
}

