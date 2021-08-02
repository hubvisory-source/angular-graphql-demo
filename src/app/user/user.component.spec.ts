import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NetworkStatus } from '@apollo/client/core';
import { of } from 'rxjs';
import { render, screen } from '@testing-library/angular';

import { UserComponent } from './user.component';
import { UserService } from './user.service';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let mockedGetUserFromId = jest.fn().mockReturnValue(
    of({
      data: {
        user: {
          id: 1,
          firstName: 'John',
          lastName: 'Doe',
        },
      },
      loading: false,
      networkStatus: NetworkStatus.ready,
    })
  );
  let mockedUserService = {
    getUserFromId: mockedGetUserFromId,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    TestBed.configureTestingModule({
      declarations: [UserComponent],
    });
    TestBed.overrideComponent(UserComponent, {
      set: {
        providers: [
          {
            provide: UserService,
            useValue: mockedUserService,
          },
        ],
      },
    });
  });

  it('should create', () => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should display the firstname and lastname of the user', async () => {
    await render(UserComponent);
    expect(screen.getByText(/John/i)).toBeTruthy();
    expect(screen.getByText(/Doe/i)).toBeTruthy();
  });
});
