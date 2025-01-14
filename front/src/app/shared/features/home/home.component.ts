import {Component, OnInit} from "@angular/core";
import {RouterLink} from "@angular/router";
import {ButtonModule} from "primeng/button";
import {CardModule} from "primeng/card";
import {Store} from "@ngrx/store";
import {getUsernameSelector, getUserSelector, State} from "../../../store";
import {Observable} from "rxjs";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  standalone: true,
  imports: [CardModule, RouterLink, ButtonModule, AsyncPipe],
})
export class HomeComponent implements OnInit{
  public readonly appTitle = "ALTEN SHOP";

  username$: Observable<string>;

  constructor(private store: Store<State>) {
    this.username$ = this.store.select(getUsernameSelector)
  }

  ngOnInit() {

  }
}
