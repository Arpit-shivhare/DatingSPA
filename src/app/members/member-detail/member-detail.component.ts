import { User } from './../../_models/user';
import { Component, OnInit } from '@angular/core';
import { AlertfyService } from 'src/app/_services/alertfy.service';
import { UserService } from 'src/app/_services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  user: User;

  constructor(private userService: UserService, private alertify: AlertfyService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.user = data['user'];
    });
  }

  // loadUser() {
  // this.userService.getUser(+this.route.snapshot.params['id']).subscribe((user: User) => {
  //   this.user = user;
  // }, error => {
  //   this.alertify.error(error);
  // });
  // }

}
