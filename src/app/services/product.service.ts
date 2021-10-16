import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  constructor(private httpClient: HttpClient) {}

  public addNewProduct(product: any): Observable<any> {
    let customheaders = new HttpHeaders();
    customheaders.append("Content-Type", "multipart/*");
    let payload: FormData = new FormData();
    payload.append("name", product.name);
    payload.append("image", product.image);
    return this.httpClient.post<any>(environment.BASE_API_URL + "create", payload, { headers: customheaders });
  }
  public getAllProducts(): Observable<any> {
    return this.httpClient.get<any>(environment.BASE_API_URL + "getAll");
  }
}
