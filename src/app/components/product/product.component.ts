import { Component, OnDestroy, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Product } from "../../models/product/product.interface";
import { ToastrService } from "ngx-toastr";
import { ProductService } from "../../services/product.service";
import { NgxSpinnerService } from "ngx-spinner";
import { Subscription } from "rxjs";
import { NgForm } from "@angular/forms";
@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.scss"],
})
export class ProductComponent implements OnInit, OnDestroy {
  public product = {} as Product;
  private sub = new Subscription();
  @ViewChild("fileInput")
  fileInputRef: ElementRef;
  constructor(private toastr: ToastrService, private productService: ProductService, private spinner: NgxSpinnerService) {}

  ngOnInit(): void {}

  public handleFileInput(files: FileList) {
    this.product.image = files[0];
  }
  public onSubmit(f: NgForm) {
    console.log(this.product);
    if (!this.product.image) {
      this.toastr.error("Please Select Image", "Error");
      return;
    } else {
      this.spinner.show();
      this.sub.add(
        this.productService.addNewProduct(this.product).subscribe(
          (res: any) => {
            // TODO: Make use to input property to send the notification to child component to fetch the updated record.
            this.toastr.success("Please Added Successfully, Please Press the Refresh Button");
            this.spinner.hide();
            this.resetForm(f);
          },
          (err) => {
            this.toastr.error("Something went wrong", "Internel Server Error");
            this.spinner.hide();
          }
        )
      );
    }
  }

  private resetForm(form?: NgForm): void {
    // To reset form
    form.resetForm();
    this.fileInputRef.nativeElement.value = "";
    this.product = {} as Product;
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
