import { TestBed, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ProductService } from './product.service';
import { Product } from '../interfaces/product';

describe('ProductService', () => {
  let productService: ProductService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService],
    });

    productService = TestBed.inject(ProductService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(productService).toBeTruthy();
  });

  it('should create a product', () => {
    const product: Product = {
      productId: '1',
      productName: 'Test Product',
      productDescription: 'Description',
      productClassification: 'Classified',
      productCategory: 'Category',
      productCost: 100,
      productImg: 'image-url',
      earlyCost: 90,
      userId: 'user-1',
    };

    productService.createProduct(product).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpTestingController.expectOne(
      `${productService.baseUrl}/add`
    );
    expect(req.request.method).toBe('POST');
   req.flush({
    /* your response object here */
  });

  });

  it('should get all products', () => {
    productService.getProducts().subscribe((products) => {
      expect(products).toBeTruthy();
    });

    const req = httpTestingController.expectOne(
      `${productService.getProducts}/allProducts`
    );
    expect(req.request.method).toBe('GET');
    req.flush({
      
    });
  });

  it('should get a product by ID', () => {
    const productId = '1';

    productService.getProductById(productId).subscribe((product) => {
      expect(product).toBeTruthy();
    });

    const req = httpTestingController.expectOne(
      `${productService.baseUrl}/viewOneProduct/${productId}`
    );
    expect(req.request.method).toBe('GET');
    req.flush({
      /* your response object here */
    });
  });

  it('should delete a product', () => {
    const productId = '1';

    productService.deleteProduct(productId).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpTestingController.expectOne(
      `${productService.baseUrl}/delete/${productId}`
    );
    expect(req.request.method).toBe('DELETE');
    req.flush({
      /* your response object here */
    });
  });

  it('should update a product', () => {
    const productId = '1';
    const updatedProduct: Product = {
      productId: '1',
      productName: 'Updated Product',
      productDescription: 'Updated Description',
      productClassification: 'Updated Classified',
      productCategory: 'Updated Category',
      productCost: 120,
      productImg: 'updated-image-url',
      earlyCost: 110,
      userId: 'user-1',
    };

    productService
      .updateProduct(productId, updatedProduct)
      .subscribe((response) => {
        expect(response).toBeTruthy();
      });

    const req = httpTestingController.expectOne(
      `${productService.baseUrl}/update/${productId}`
    );
    expect(req.request.method).toBe('PUT');
    req.flush({
      /* your response object here */
    });
  });

  it('should view all products', () => {
    productService.viewAllProducts().subscribe((products) => {
      expect(products).toBeTruthy();
    });

    const req = httpTestingController.expectOne(
      `${productService.baseUrl}/allProducts`
    );
    expect(req.request.method).toBe('GET');
    req.flush({
      /* your response object here */
    });
  });

  it('should view products by category', () => {
    const productCategory = 'SomeCategory';

    productService
      .viewProductsCategory(productCategory)
      .subscribe((products) => {
        expect(products).toBeTruthy();
      });

    const req = httpTestingController.expectOne(
      `${productService.baseUrl}/allProducts/${productCategory}`
    );
    expect(req.request.method).toBe('GET');
    req.flush({
    });
  });

});
