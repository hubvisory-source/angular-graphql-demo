import { Component, OnInit } from '@angular/core';
import { ApolloQueryResult } from '@apollo/client/core';
import { User, UserQueryResponse, UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  user: User | null = null;
  loading = true;
  error: any;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService
      .getUserFromId('1')
      .subscribe((result: ApolloQueryResult<UserQueryResponse>) => {
        this.user = result?.data?.user;
        this.loading = result.loading;
        this.error = result?.errors;
      });
  }
}
