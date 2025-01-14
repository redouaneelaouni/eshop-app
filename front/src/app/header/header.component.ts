import {Component, input, OnInit} from '@angular/core';
import {ToolbarModule} from "primeng/toolbar";
import {Product} from "../products/data-access/product.model";
import {ShoppingCartComponent} from "../shopping-cart/cart-header/shopping-cart.component";
import {MenuItem} from "primeng/api";
import {AuthService} from "../services/auth/auth.service";
import {Router} from "@angular/router";
import {async, Observable} from "rxjs";
import {AsyncPipe, NgIf} from "@angular/common";
import {MenuModule} from "primeng/menu";
import {ButtonDirective} from "primeng/button";
import {Store} from "@ngrx/store";
import {getUserSelector, State} from "../store";
import {User} from "../model/auth.model";
import {Logout} from "../store/authentication/auth.actions";

@Component({
    selector: 'app-header',
    standalone: true,
  imports: [
    ToolbarModule,
    ShoppingCartComponent,
    AsyncPipe,
    NgIf,
    MenuModule,
    ButtonDirective
  ],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{

  title = input.required<string>()
  user$: Observable<User>;

  menuItems: MenuItem[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<State>
  ) {
    this.user$ = store.select(getUserSelector)
  }

  ngOnInit() {
    this.menuItems = [
      {
        label: 'Profile',
        icon: 'pi pi-user',
        command: () => {
          // Handle profile click
        }
      },
      {
        separator: true
      },
      {
        label: 'Logout',
        icon: 'pi pi-sign-out',
        command: () => {
          this.store.dispatch(new Logout())
          this.router.navigate(['/login']);
        }
      }
    ];
  }

}
