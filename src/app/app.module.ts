import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { AboutusComponent } from './shared/aboutus/aboutus.component';
import { AppRoutingModule } from './/app-routing.module';
import { CustommaterialModule } from './/custommaterial.module';
import { SettingsComponent } from './settings/settings.component';
import { SetproductComponent } from './admin/setproduct/setproduct.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdmintabComponent } from './admin/admintab/admintab.component';
import { AdminordersComponent } from './admin/adminorders/adminorders.component';
import { AdmincartsComponent } from './admin/admincarts/admincarts.component';
import { AdminusersComponent } from './admin/adminusers/adminusers.component';
import { OrdersComponent } from './user/orders/orders.component';
import { CartsComponent } from './user/carts/carts.component';
import { UserComponent } from './user/user/user.component';
import { ProductComponent } from './user/product/product.component';
import { LoginComponent } from './user/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AboutusComponent,
    SettingsComponent,
    SetproductComponent,
    AdmintabComponent,
    AdminordersComponent,
    AdmincartsComponent,
    AdminusersComponent,
    OrdersComponent,
    CartsComponent,
    UserComponent,
    ProductComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CustommaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
