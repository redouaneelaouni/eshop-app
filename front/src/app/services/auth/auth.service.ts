import {Observable} from 'rxjs';
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {LoginRequest, RegisterRequest, User} from "../../model/auth.model";
import {API_ENDPOINTS} from "../../constants/api.constants";
import {environment} from "../../../environments/environment";
import {Cart} from "../../model/cart.model";
import {StorageHelper} from "../helper/localStorage.helper";
import {Store} from "@ngrx/store";
import {State} from "../../store";
import {ClearCartAction, LoadCartSuccessAction} from "../../store/cart/cart.action";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private store: Store<State>) {
  }

  register(request: RegisterRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/account`, request);
  }

  login(request: LoginRequest): Observable<User> {
    return this.http.post<User>(this.apiUrl + API_ENDPOINTS.login, request)
  }

  logout(): void {
    StorageHelper.clear()
    this.store.dispatch(new ClearCartAction())
  }

}
