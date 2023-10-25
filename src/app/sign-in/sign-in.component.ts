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

  ngOnInit(): void {
    this.signInForm = this.fb.group({employeeId: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])]});
  }
  onSubmit() {
    const formValues = this.signInForm.value;
    const employeeId = parseInt(formValues.employeeId);
    if (this.employeesService.validate(employeeId)) {
      this.cookieService.set('empId', employeeId.toString(), 1);
      this.cookieService.set('fullName', 'TEST FULL NAME', 1);
      this.router.navigate(['/tasks']);
    }
    else {
      this.errorMessage = 'Invalid sign-in.'
    }
  }

  get form() {
    return this.signInForm.controls;
  }
}
