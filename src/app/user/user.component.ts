import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  user = { firstName: '', lastName: '' };

  constructor() {}

  ngOnInit(): void {
    this.user.firstName = 'John';
    this.user.lastName = 'Doe';
  }
}
