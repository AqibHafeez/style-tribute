import { Component, OnInit, OnDestroy } from "@angular/core";
import { ProductService } from "../../services/product.service";
import { NgxSpinnerService } from "ngx-spinner";
import { Subscription } from "rxjs";

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
          this.images = new Array(res.length);
          res.forEach((data, index) => {
            this.readImageFile(index, data.image);
          });

          this.spinner.hide();
        },
        (err) => {
          this.spinner.hide();
        }
      )
    );
  }
  public readImageFile(idx, url) {
    if (url) {
      this.sub.add(
        this.productService.getImage(url).subscribe((res: any) => {
          this.images[idx] = "data:image/jpg;base64," + res;
        })
      );
    }
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
