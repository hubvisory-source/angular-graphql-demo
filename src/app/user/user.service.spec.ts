import { TestBed } from '@angular/core/testing';
import {
  ApolloTestingModule,
  ApolloTestingController,
} from 'apollo-angular/testing';

import { UserService, GET_USER_QUERY } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let controller: ApolloTestingController;

  describe('GetUserFromId', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ApolloTestingModule],
      });
      service = TestBed.inject(UserService);
      controller = TestBed.inject(ApolloTestingController);
    });

    it('should return the correct user info from id', (done) => {
      service.getUserFromId('1').subscribe((response) => {
        expect(response.data.user).toEqual({
          id: '1',
          firstName: 'John',
          lastName: 'Doe',
        });
        done();
      });

      const op = controller.expectOne(GET_USER_QUERY);

      // Respond with mock data, causing Observable to resolve.
      op.flush({
        data: {
          user: {
            id: '1',
            firstName: 'John',
            lastName: 'Doe',
          },
        },
      });

      // Finally, assert that there are no outstanding operations.
      controller.verify();
    });
  });
});
