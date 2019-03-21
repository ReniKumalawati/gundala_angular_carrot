import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { EmployeeComponent } from './employee/employee.component';
import { ManagerComponent } from './manager/manager.component';
import { MerchantComponent } from './merchant/merchant.component';
import { FarmerComponent } from './farmer/farmer.component';
import { AdministratorComponent } from './administrator/administrator.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { ImportRewardSectionComponent } from './administrator/import-reward-section/import-reward-section.component';
import { ImportAwardSectionComponent } from './administrator/import-award-section/import-award-section.component';
import { LoginComponent } from './login/login.component';
import { CreateBazarComponent } from './create-bazar/create-bazar.component';
import { ImportSocialFoundationSectionComponent } from './administrator/import-social-foundation-section/import-social-foundation-section.component';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';
import { ProfileComponent } from './profile/profile.component';
import { TransactionsComponent } from './administrator/transactions/transactions.component';
import { GroupsComponent } from './administrator/groups/groups.component';
import { GroupsManagerComponent } from './manager/groups-manager/groups-manager.component';
import { DetailGroupComponent } from './manager/detail-group/detail-group.component';
import { AddBazarComponent } from './manager/detail-group/add-bazar/add-bazar.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    AboutComponent,
    ContactComponent,
    HomeComponent,
    FooterComponent,
    EmployeeComponent,
    ManagerComponent,
    MerchantComponent,
    FarmerComponent,
    AdministratorComponent,
    ItemDetailComponent,
    ImportRewardSectionComponent,
    ImportAwardSectionComponent,
    LoginComponent,
    CreateBazarComponent,
    ImportSocialFoundationSectionComponent,
    TransactionHistoryComponent,
    ProfileComponent,
    TransactionsComponent,
    GroupsComponent,
    GroupsManagerComponent,
    DetailGroupComponent,
    AddBazarComponent
  ],
  imports: [
    NgbModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, // service harus di import
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
