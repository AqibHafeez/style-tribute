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
  constructor(private toastr: ToastrService, private productService: ProductService, private spinner: NgxSpinnerService) {}
  public product = {} as Product;
  private sub = new Subscription();
  public fetchUpdated: boolean = false;
  @ViewChild("fileInput")
  fileInputRef: ElementRef;
  ngOnInit(): void {}
  public handleFileInput(files: FileList) {
    this.product.image = files[0];
  }
  public onSubmit(f: NgForm) {
    this.fetchUpdated = true;
    this.sub.add(
      this.productService.addNewProduct(this.product).subscribe(
        (res: any) => {
          this.toastr.success("Please Added Successfully");
          this.spinner.hide();
          this.product = {} as Product;
          this.resetForm(f);
          this.fetchUpdated = false;
        },
        (err) => {
          this.toastr.error("Something went wrong", "Internel Server Error");
          this.fetchUpdated = false;
          this.spinner.hide();
        }
      )
    );
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
