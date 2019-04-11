import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbActiveModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { EmployeeComponent } from './employee/employee.component';
import { ManagerComponent } from './manager/manager.component';
import { MerchantComponent } from './administrator/merchant/merchant.component';
import { FarmerComponent } from './farmer/farmer.component';
import { AdministratorComponent } from './administrator/administrator.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { ImportRewardSectionComponent } from './administrator/admin-function/import-reward-section/import-reward-section.component';
import { ImportAwardSectionComponent } from './administrator/admin-function/import-award-section/import-award-section.component';
import { LoginComponent } from './login/login.component';
import { CreateBazarComponent } from './create-bazar/create-bazar.component';
import { ImportSocialFoundationSectionComponent } from './administrator/admin-function/import-social-foundation-section/import-social-foundation-section.component';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';
import { ProfileComponent } from './profile/profile.component';
import { TransactionsComponent } from './administrator/admin-function/transactions/transactions.component';
import { GroupsComponent } from './administrator/admin-function/groups/groups.component';
import { GroupsManagerComponent } from './manager/groups-manager/groups-manager.component';
import { DetailGroupComponent } from './manager/detail-group/detail-group.component';
import { AddBazarComponent } from './manager/detail-group/add-bazar/add-bazar.component';
import { GroubAchievementComponent } from './manager/detail-group/groub-achievement/groub-achievement.component';
import { MerchantTransactionComponent } from './administrator/merchant/merchant-transaction/merchant-transaction.component';
import { GroupSocialFoundationComponent } from './manager/detail-group/group-social-foundation/group-social-foundation.component';
import { AchievementComponent } from './employee/achievement/achievement.component';
import { ClaimComponent } from './manager/claim/claim.component';
import { FunnelComponent } from './farmer/funnel/funnel.component';
import { SeniorManagerComponent } from './manager/senior-manager/senior-manager.component';
import { ModalLoadingComponent } from './partial/modal-loading/modal-loading.component';
import { AchievementListComponent } from './employee/achievement/achievement-list/achievement-list.component';
import { AchievedComponent } from './employee/achievement/achieved/achieved.component';
import {AuthService} from './interceptors/auth.service';
import { DetailSFComponent } from './employee/detail-sf/detail-sf.component';
import { SfListComponent } from './farmer/sf-list/sf-list.component';
import { AllSocialFoundationComponent } from './employee/all-social-foundation/all-social-foundation.component';
import { EmployeeListComponent } from './farmer/employee-list/employee-list.component';
import { EarnMostCarrotComponent } from './administrator/information-function/earn-most-carrot/earn-most-carrot.component';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RewardsComponent } from './administrator/information-function/rewards/rewards.component';
import { FreezerComponent } from './manager/freezer/freezer.component';
import { ButtonShareComponent } from './manager/freezer/button-share/button-share.component';
import { DataTablesModule } from 'angular-datatables';

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
    AddBazarComponent,
    GroubAchievementComponent,
    MerchantTransactionComponent,
    GroupSocialFoundationComponent,
    AchievementComponent,
    ClaimComponent,
    FunnelComponent,
    SeniorManagerComponent,
    ModalLoadingComponent,
    AchievementListComponent,
    AchievedComponent,
    DetailSFComponent,
    SfListComponent,
    AllSocialFoundationComponent,
    EmployeeListComponent,
    EarnMostCarrotComponent,
    RewardsComponent,
    FreezerComponent,
    ButtonShareComponent
  ],
  imports: [
    NgbModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, // service harus di import
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    SimpleNotificationsModule.forRoot(),
    DataTablesModule
  ],
  providers: [NgbActiveModal, {provide: HTTP_INTERCEPTORS, useClass: AuthService, multi: true}],
  entryComponents: [
    ModalLoadingComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
