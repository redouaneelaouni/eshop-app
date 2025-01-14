import { Injectable, inject, signal } from "@angular/core";
import { Product } from "../../products/data-access/product.model";
import { HttpClient } from "@angular/common/http";
import { catchError, Observable, of, tap } from "rxjs";
import { environment } from '../../../environments/environment';
import {API_ENDPOINTS} from "../../constants/api.constants";
import {T} from "@angular/cdk/keycodes";

@Injectable({
    providedIn: "root"
}) export class ProductsService {

    private readonly http = inject(HttpClient);
    private readonly path = `${environment.apiUrl + API_ENDPOINTS.products}`;

    private readonly _products = signal<Product[]>([]);

    public readonly products = this._products.asReadonly();

  public get(page: number = 0, size: number = 10): Observable<PageResponse<Product>> {
    return this.http.get<PageResponse<Product>>(
      `${this.path}?page=${page}&size=${size}`
    ).pipe(
      catchError((error) => {
        console.log(error);
        return of(error);
      }),
      tap((response) => {
        // Now we're setting just the content array to your signal
        this._products.set(response.content);
        // Optionally store pagination info in separate signals if needed
        // this._totalElements.set(response.totalElements);
        // this._currentPage.set(response.number);
      }),
    );
  }
    public create(product: Product): Observable<boolean> {
        return this.http.post<boolean>(this.path, product).pipe(
            catchError(() => {
                return of(true);
            }),
            tap(() => this._products.update(products => [product, ...products])),
        );
    }

    public update(product: Product): Observable<boolean> {
        return this.http.patch<boolean>(`${this.path}/${product.id}`, product).pipe(
            catchError(() => {
                return of(true);
            }),
            tap(() => this._products.update(products => {
                return products.map(p => p.id === product.id ? product : p)
            })),
        );
    }

    public delete(productId: number): Observable<boolean> {
        return this.http.delete<boolean>(`${this.path}/${productId}`).pipe(
            catchError(() => {
                return of(true);
            }),
            tap(() => this._products.update(products => products.filter(product => product.id !== productId))),
        );
    }
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}
