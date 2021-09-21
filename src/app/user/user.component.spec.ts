import { NetworkStatus } from '@apollo/client/core';
import { render, screen } from '@testing-library/angular';
import { of } from 'rxjs';
import { UserComponent } from './user.component';
import { UserService } from './user.service';

describe('UserComponent', () => {
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

  it('should display the firstname and lastname of the user', async () => {
    await render(UserComponent, {
      componentProviders: [
        {
          provide: UserService,
          useValue: mockedUserService,
        },
      ],
    });
    expect(screen.getByText(/John/i)).toBeTruthy();
    expect(screen.getByText(/Doe/i)).toBeTruthy();
  });
});
