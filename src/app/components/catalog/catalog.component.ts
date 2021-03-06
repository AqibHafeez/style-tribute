import { Component, OnInit, OnDestroy, Input, OnChanges, SimpleChanges } from "@angular/core";
import { ProductService } from "../../services/product.service";
import { NgxSpinnerService } from "ngx-spinner";
import { Subscription } from "rxjs";
import { environment } from "../../../environments/environment";
import { ToastrService } from "ngx-toastr";
@Component({
  selector: "app-catalog",
  templateUrl: "./catalog.component.html",
  styleUrls: ["./catalog.component.scss"],
})
export class CatalogComponent implements OnInit, OnDestroy, OnChanges {
  @Input() fetchUpdated: boolean;
  public products: any[] = [];
  public images: any[] = [];
  private sub = new Subscription();
  constructor(private toastr: ToastrService, private productService: ProductService, private spinner: NgxSpinnerService) {}

  ngOnInit(): void {
    this.getAllProducts();
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.fetchUpdated.currentValue) {
      // Manually giving timeout as locally there is no delay in response time.
      setTimeout(() => {
        this.getAllProducts();
      }, 2000);
    }
  }

  public getAllProducts(): void {
    this.products = [];
    this.spinner.show();
    this.sub.add(
      this.productService.getAllProducts().subscribe(
        (res: any) => {
          this.products = res;
          this.spinner.hide();
        },
        (err) => {
          this.toastr.error("Something went wrong", "Internel Server Error");
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
