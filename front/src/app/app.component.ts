import {Component, OnInit,} from "@angular/core";
import {RouterModule} from "@angular/router";
import {SplitterModule} from 'primeng/splitter';
import {ToolbarModule} from 'primeng/toolbar';
import {PanelMenuComponent} from "./shared/ui/panel-menu/panel-menu.component";
import {HeaderComponent} from "./header/header.component";
import {Store} from "@ngrx/store";
import * as fromRoot from './store/index'
import {LoadUser} from "./store/authentication/auth.actions";
import {ToastModule} from "primeng/toast";
import {LoadCartAction} from "./store/cart/cart.action";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  standalone: true,
  imports: [RouterModule, SplitterModule, ToolbarModule, PanelMenuComponent, HeaderComponent, ToastModule],
})
export class AppComponent implements OnInit {

  title = "ALTEN SHOP";

  constructor(private store: Store<fromRoot.State>) {

  }

  ngOnInit(): void {
    this.store.dispatch(new LoadUser())
  }
}
