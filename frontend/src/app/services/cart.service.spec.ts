import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { CartService } from './cart.service';

describe('CartService', () => {
  let cartService: CartService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CartService],
    });

    cartService = TestBed.inject(CartService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(cartService).toBeTruthy();
  });

  it('should add a product to the cart', () => {
    const product = { id: '1', name: 'Product 1', price: 10 };
    const userId = 'user123';

    cartService.addToCart(product).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpTestingController.expectOne(`${cartService.apiUrl}/add`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(product);

    req.flush({ success: true });
  });

  it('should view the cart for a specific user', () => {
    const userId = 'user123';

    cartService.viewCart(userId).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpTestingController.expectOne(
      `${cartService.apiUrl}/viewCart/${userId}`
    );
    expect(req.request.method).toBe('GET');

    req.flush({
      success: true,
      products: [
        {
          id: '1',
          name: 'Product 1',
          price: 10,
          quantity: 1,
        },
      ],
    });
  });

  it('should remove all products from the cart for a specific user', () => {
    const userId = 'user123';

    cartService.removeAllFromCart(userId).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpTestingController.expectOne(
      `${cartService.apiUrl}/deleteAll/${userId}`
    );
    expect(req.request.method).toBe('DELETE');

    req.flush({ success: true });
  });

  it('should remove one product from the cart by product ID', () => {
    const productId = 'product123';

    cartService.removeOneFromCart(productId).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpTestingController.expectOne(
      `${cartService.apiUrl}/removeOne/${productId}`
    );
    expect(req.request.method).toBe('DELETE');

    req.flush({ success: true });
  });
});
