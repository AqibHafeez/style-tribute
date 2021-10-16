import { Component, OnInit } from "@angular/core";
import { Product } from "../../models/product/product.interface";
import { ToastrService } from "ngx-toastr";
import { ProductService } from "../../services/product.service";
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.scss"],
})
export class ProductComponent implements OnInit {
  public product = {} as Product;

  constructor(private toastr: ToastrService, private productService: ProductService, private spinner: NgxSpinnerService) {}

  ngOnInit(): void {}

  public handleFileInput(files: FileList) {
    this.product.image = files[0];
  }
  public onSubmit() {
    if (!this.product.image) {
      this.toastr.error("Please Select Image", "Error");
      return;
    } else {
      this.spinner.show();
      this.productService.addNewProduct(this.product).subscribe(
        (res: any) => {
          this.toastr.success("Please Added Successfully");
          this.spinner.hide();
          this.product = {} as Product;
        },
        (err) => {
          this.spinner.hide();
        }
      );
    }
  }
}
