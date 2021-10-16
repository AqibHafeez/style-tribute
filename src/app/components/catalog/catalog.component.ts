import { Component, OnInit, OnDestroy } from "@angular/core";
import { ProductService } from "../../services/product.service";
import { NgxSpinnerService } from "ngx-spinner";
import { Subscription } from "rxjs";
import { environment } from "../../../environments/environment";

@Component({
  selector: "app-catalog",
  templateUrl: "./catalog.component.html",
  styleUrls: ["./catalog.component.scss"],
})
export class CatalogComponent implements OnInit, OnDestroy {
  public products: any[] = [];
  public images: any[] = [];
  private sub = new Subscription();
  constructor(private productService: ProductService, private spinner: NgxSpinnerService) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  public getAllProducts(): void {
    this.spinner.show();
    this.sub.add(
      this.productService.getAllProducts().subscribe(
        (res: any) => {
          this.products = res;
          this.spinner.hide();
        },
        (err) => {
          this.spinner.hide();
        }
      )
    );
  }
  public getImage(fileName: string): string {
    return `${environment.IMG_BASE_URL}` + fileName;
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
