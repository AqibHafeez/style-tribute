import { Component, OnInit } from "@angular/core";
import { ProductService } from "../../services/product.service";
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: "app-catalog",
  templateUrl: "./catalog.component.html",
  styleUrls: ["./catalog.component.scss"],
})
export class CatalogComponent implements OnInit {
  public products: any[] = [];
  constructor(private productService: ProductService, private spinner: NgxSpinnerService) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  public getAllProducts(): void {
    this.spinner.show();
    this.productService.getAllProducts().subscribe(
      (res: any) => {
        this.products = res;
        this.spinner.hide();
      },
      (err) => {
        this.spinner.hide();
      }
    );
  }
}
