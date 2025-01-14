import { Component, OnInit, inject, signal } from "@angular/core";
import { Product } from "app/products/data-access/product.model";
import { ProductsService } from "app/services/products/products.service";
import { ProductFormComponent } from "app/products/ui/product-form/product-form.component";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import {ProductItemComponent} from "../product-item/product-item.component";
import {PaginatorModule} from "primeng/paginator";
import {Store} from "@ngrx/store";
import {getTotalElements, ProductState} from "../../../store/product/products.reducers";
import {LoadProduct} from "../../../store/product/products.actions";
import {AuthService} from "../../../services/auth/auth.service";
import {first} from "rxjs";
import {AsyncPipe} from "@angular/common";
import {getProductsSelector, getTotalElementsSelector} from "../../../store";

const emptyProduct: Product = {
  id: 0,
  code: "",
  name: "",
  description: "",
  image: "",
  category: "",
  price: 0,
  quantity: 0,
  internalReference: "",
  shellId: 0,
  inventoryStatus: "INSTOCK",
  rating: 0,
  createdAt: 0,
  updatedAt: 0,
  totalPrice: 0
};

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"],
  standalone: true,
  imports: [DataViewModule, CardModule, ButtonModule, DialogModule, ProductFormComponent, ProductItemComponent, PaginatorModule, AsyncPipe],
})
export class ProductListComponent implements OnInit {
  private readonly productsService = inject(ProductsService);

  public readonly products = signal<Product[]>([]);
  public totalRecords = signal<number>(0);
  public currentPage = signal<number>(0);   // Current page number
  public pageSize = signal<number>(10);       // Items per page
  public isDialogVisible = false;
  public isCreation = false;
  public readonly editedProduct = signal<Product>(emptyProduct);


  constructor(private store: Store<ProductState>) {
    // Subscribe to store updates and update the signal
    this.store.select(getProductsSelector).subscribe(products => {
      this.products.set(products);
    });

    this.store.select(getTotalElementsSelector).subscribe(value => {
      this.totalRecords.set(value);
    });
  }

  ngOnInit() {
    this.dispatchPageLoad(this.currentPage(), this.pageSize());
  }

  public onCreate() {
    this.isCreation = true;
    this.isDialogVisible = true;
    this.editedProduct.set(emptyProduct);
  }

  public onUpdate(product: Product) {
    this.isCreation = false;
    this.isDialogVisible = true;
    this.editedProduct.set(product);
  }

  public onDelete(product: Product) {
    this.productsService.delete(product.id).subscribe();
  }

  public onSave(product: Product) {
    if (this.isCreation) {
      this.productsService.create(product).subscribe();
    } else {
      this.productsService.update(product).subscribe();
    }
    this.closeDialog();
  }

  public onCancel() {
    this.closeDialog();
  }

  private dispatchPageLoad(page: number, rows: number) {
    this.store.dispatch(new LoadProduct({
      page: page,
      size: rows
    }));
  }
  private closeDialog() {
    this.isDialogVisible = false;
  }

  onChange(event: any) {
    console.log(event)
    this.currentPage.set(event.page)
    this.pageSize.set(event.rows);
    this.dispatchPageLoad(event.page, event.rows);
  }
}
