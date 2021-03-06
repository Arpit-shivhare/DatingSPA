import { User } from './../../_models/user';
import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertfyService } from 'src/app/_services/alertfy.service';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/_services/user.service';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
@ViewChild('editForm', {static: true}) editForm: NgForm;
user: User;
photoUrl: string;
@HostListener('window:beforeunload', ['$event'])
unloadNotification($event: any) {
  if (this.editForm.dirty) {
    $event.returnValue = true;
  }
}


  constructor(private route: ActivatedRoute, private alertify: AlertfyService, private userService: UserService,
              private authService: AuthService
    ) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.user = data['user'];
    });
    this.authService.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);
  }

  updateUser() {
  this.userService.updateUser(this.authService.decodedToken.nameid, this.user).subscribe(next => {
    this.alertify.success('Profile updated succesfully.');
    this.editForm.reset(this.user);
  }, error => {
    this.alertify.error('Updation Unsuccessfull!');
  });

  }

  updateMainPhoto(photoUrl) {
  this.user.photoUrl = photoUrl;
  }
}
