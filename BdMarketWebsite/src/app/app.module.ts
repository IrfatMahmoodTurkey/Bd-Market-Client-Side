import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuCmpComponent } from './menu-cmp/menu-cmp.component';
import { BodyCmpComponent } from './body-cmp/body-cmp.component';
import { FooterCmpComponent } from './footer-cmp/footer-cmp.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {HomeCmpComponent} from './home-cmp/home-cmp.component';
import {RouterModule} from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatExpansionModule} from '@angular/material/expansion';
import { AllProductCmpComponent } from './all-product-cmp/all-product-cmp.component';
import {MatBadgeModule} from '@angular/material/badge';
import { CategoryCmpComponent } from './category-cmp/category-cmp.component';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {DataServiceService} from "./data-service.service";
// for http service
import {HttpClientModule} from '@angular/common/http';
import { RelatedComponentComponent } from './related-component/related-component.component';

import {MatTableModule} from '@angular/material/table';

// for forms
import {ReactiveFormsModule} from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { RegisterCmpComponent } from './register-cmp/register-cmp.component';
import { VerifyCmpComponent } from './verify-cmp/verify-cmp.component';
import { ProfileCmpComponent } from './profile-cmp/profile-cmp.component';
import { CartCmpComponent, ActionDialog } from './cart-cmp/cart-cmp.component';
import {MatDialogModule} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { ForgetPasswordCmdComponent } from './forget-password-cmd/forget-password-cmd.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuCmpComponent,
    BodyCmpComponent,
    FooterCmpComponent,
    HomeCmpComponent,
    AllProductCmpComponent,
    CategoryCmpComponent,
    RelatedComponentComponent,
    RegisterCmpComponent,
    VerifyCmpComponent,
    ProfileCmpComponent,
    CartCmpComponent,
    ActionDialog,
    ForgetPasswordCmdComponent
  ],
  entryComponents: [CartCmpComponent, ActionDialog],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatMenuModule,
    MatCardModule,
    MatGridListModule,
    MatSidenavModule,
    MatTableModule,
    FormsModule,
    MatExpansionModule,
    MatBadgeModule,
    MatSelectModule,
    MatSnackBarModule,
    MatInputModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    RouterModule.forRoot([{
      path:'',
      component:HomeCmpComponent
    },
  {
    path:'allProduct',
    component:AllProductCmpComponent
  },
{
  path:'category',
  component:CategoryCmpComponent
},
{
  // view details from category
  path:'category/details/:id',
  component:BodyCmpComponent
},
{
  // view details from all products
  path:'allProduct/details/:id',
  component:BodyCmpComponent
},
{
  // view details of top products
  path:'details/:id',
  component:BodyCmpComponent
},
{
  // view related item details
  path:'related/:id',
  component:RelatedComponentComponent
},
{
  // for register new account
  path:'register',
  component:RegisterCmpComponent
},
{
  // verify code
  path:'verify',
  component:VerifyCmpComponent
},
{
  // profile info
  path:'profile',
  component:ProfileCmpComponent
},
{
  // cart info
  path:'cart',
  component:CartCmpComponent
},
{
  // forgot password
  path:'register/forget_password',
  component:ForgetPasswordCmdComponent
}
])
  ],
  providers: [DataServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
