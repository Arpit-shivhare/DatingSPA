import { AuthService } from './../_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { AlertfyService } from '../_services/alertfy.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
model: any = {};
photoUrl: string;
  constructor(public authServices: AuthService, private alertify: AlertfyService, private router: Router) { }

  ngOnInit(): void {
    this.authServices.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);
  }

  login() {
    this.authServices.login(this.model).subscribe(next => {
      this.alertify.success('logged in successfully');
    }, error => {
      this.alertify.error('login Failed');
    }, () => {this.router.navigate(['/members']); });
  }

 loggedIn() {
  //  const token = localStorage.getItem('token');
   // tslint:disable-next-line:max-line-length
   // !! sign return true or false value (if variable contain something than it will return true otherwise fasle short-form of 'if-statement')
  //
  return this.authServices.loggedIn();
 }


 logout() {
   localStorage.removeItem('token');
   localStorage.removeItem('user');
   this.authServices.decodedToken = null;
   this.authServices.currentUser = null;
   this.alertify.message('logged out successfully');
   this.router.navigate(['/home']);
 }
}

