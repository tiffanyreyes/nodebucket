/**
 * Title: nav.component.ts
 * Author: Tiffany Reyes
 * Date: 8/5/23
 */

// imports statements
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  constructor(private router: Router, private cookieService: CookieService) {}
  signOut() {
    this.cookieService.deleteAll();
    this.router.navigate(['/']);
  }
}
