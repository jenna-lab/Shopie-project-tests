import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { of } from 'rxjs';

import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { User, UserDetails, updatedUserData } from '../interfaces/user';
import { Product } from '../interfaces/product';

describe('UserService', () => {
  let userService: UserService;
  let authService: AuthService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService, AuthService],
    });

    userService = TestBed.inject(UserService);
    authService = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(userService).toBeTruthy();
  });

  it('should get users', () => {
    const mockUsers: User[] = [
      {
        userId: '1',
        userName: 'user1',
        userEmail: 'user1@example.com',
        userPhone: '123-456-7890',
        password: 'password1',
        profilePic: 'user1.jpg',
        role: 'user',
      },
    ];

    userService.getUsers().subscribe((users) => {
      expect(users).toEqual(mockUsers);
    });

    const req = httpTestingController.expectOne(`${userService.apiUrl}/`);
    expect(req.request.method).toBe('GET');

    req.flush(mockUsers);
  });

  it('should check user details', () => {
    const mockRole = 'admin';

spyOn(authService, 'getUserDetails').and.returnValue(of(mockUserDetails));



    userService.checkDetails().subscribe((role) => {
      expect(role).toEqual(mockRole);
    });
  });

  it('should update user by ID', () => {
    const mockUpdatedUser: updatedUserData = {
  userId: '1',
  userName: 'updateduser',
  userEmail: 'updateduser@example.com',
  userPhone: '999-999-9999',
  profilePic: 'updateduser.jpg',
  role: 'updatedRole',
    };
    const mockUserDetails: UserDetails = {
      userId: '1',
      userName: 'testuser',
      userEmail: 'testuser@example.com',
      userPhone: '555-555-5555',
      profilePic: 'testuser.jpg',
    };

    spyOn(authService, 'getUserDetails').and.returnValue(of(mockUserDetails));

    userService.updateUserById(mockUpdatedUser).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpTestingController.expectOne(
      `${userService.apiUrl}/update/${mockUserDetails.userId}`
    );
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(mockUpdatedUser);

    req.flush({
      /* mocked response */
    });
  });

  it('should delete user', () => {
    const userId = '1';

    userService.deleteUser(userId).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpTestingController.expectOne(
      `${userService.apiUrl}/delete/${userId}`
    );
    expect(req.request.method).toBe('DELETE');

    req.flush({
      userId: '1',
      userName: 'updateduser',
      userEmail: 'updateduser@example.com',
      userPhone: '999-999-9999',
      profilePic: 'updateduser.jpg',
      role: 'updatedRole',
    });
  });

  it('should get products', () => {
    const mockProducts: Product[] = [{ id: '1', name: 'Product1' }];

    userService.getProducts().subscribe((products) => {
      expect(products).toEqual(mockProducts);
    });

    const req = httpTestingController.expectOne(
      'http://localhost:4700/products/all'
    );
    expect(req.request.method).toBe('GET');

    req.flush(mockProducts);
  });
});
