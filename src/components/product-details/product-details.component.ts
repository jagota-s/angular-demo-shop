import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit, OnDestroy {

  productData!: Product;
  productQuantity = 1;
  removeCart = false;
  private subscriptions: Subscription[] = [];

  constructor(private productService: ProductsService, private activeRoute: ActivatedRoute, private cartService: CartService) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.activeRoute.params.subscribe((params) => {
        const productId = this.activeRoute.snapshot.paramMap.get('id');
        this.productService.getProductById(productId!).subscribe((product) => {
          this.productData = product;
        });
      })
    );
  }

  handleQuantity(val: string) {
    if (this.productQuantity < 10 && val === '+') {
      this.productQuantity++;
    } else if (this.productQuantity > 1 && val === '-') {
      this.productQuantity--;
    }
  }

  removeFromCart(id: string) {
  }
  addToCart(product: Product) {
    this.cartService.addToCart(product, this.productQuantity);
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

}
