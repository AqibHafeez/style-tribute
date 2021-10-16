import { BrowserModule } from "@angular/platform-browser";
import { APP_INITIALIZER, NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatTableModule } from "@angular/material/table";
import { ToastrModule } from "ngx-toastr";
import { MatMenuModule } from "@angular/material/menu";
import { MatButtonModule } from "@angular/material/button";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { ProductComponent } from "./components/product/product.component";
import { CatalogComponent } from "./components/catalog/catalog.component";
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  declarations: [AppComponent, ProductComponent, CatalogComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MatToolbarModule,
    MatIconModule,
    MatTableModule,
    MatMenuModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    NgxSpinnerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
