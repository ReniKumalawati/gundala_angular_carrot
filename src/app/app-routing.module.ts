import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import {EmployeeComponent} from './employee/employee.component';
import {ManagerComponent} from './manager/manager.component';
import {MerchantComponent} from './administrator/merchant/merchant.component';
import {FarmerComponent} from './farmer/farmer.component';
import {AdministratorComponent} from './administrator/administrator.component';
import {ItemDetailComponent} from './item-detail/item-detail.component';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './guard/auth.guard';
import {CreateBazarComponent} from './create-bazar/create-bazar.component';
import {TransactionHistoryComponent} from './transaction-history/transaction-history.component';
import {ProfileComponent} from './profile/profile.component';
import {DetailGroupComponent} from './manager/detail-group/detail-group.component';
import {MerchantTransactionComponent} from './administrator/merchant/merchant-transaction/merchant-transaction.component';
import {AchievementComponent} from './employee/achievement/achievement.component';
import {DetailSFComponent} from './employee/detail-sf/detail-sf.component';
import {AllSocialFoundationComponent} from './employee/all-social-foundation/all-social-foundation.component';
import {FreezerComponent} from './manager/freezer/freezer.component';
import { NewsletterComponent } from './newsletter/newsletter.component';

const routes: Routes = [
  { path: '', component: EmployeeComponent, canActivate: [AuthGuard],
    data: {permission: ['ROOT_ADMIN', 'ADMIN', 'STAFF', 'MANAGER', 'SENIOR_MANAGER', 'STAKEHOLDER']}},
  { path: 'about', component: AboutComponent, canActivate: [AuthGuard], data: {permission: []}},
  { path: 'contact', component: ContactComponent, canActivate: [AuthGuard], data: {permission: []}},
  { path: 'employee', component: EmployeeComponent, canActivate: [AuthGuard],
    data: {permission: ['ROOT_ADMIN', 'ADMIN', 'STAFF', 'MANAGER', 'SENIOR_MANAGER', 'STAKEHOLDER']}},
  { path: 'social-foundation', component: AllSocialFoundationComponent, canActivate: [AuthGuard],
    data: {permission: ['ROOT_ADMIN', 'ADMIN', 'STAFF', 'MANAGER', 'SENIOR_MANAGER', 'STAKEHOLDER']}},
  { path: 'socialfoundation-detail/:id', component: DetailSFComponent, canActivate: [AuthGuard],
    data: {permission: ['ROOT_ADMIN', 'ADMIN', 'STAFF', 'MANAGER', 'SENIOR_MANAGER', 'STAKEHOLDER']}},
  { path: 'achievement', component: AchievementComponent, canActivate: [AuthGuard],
    data: {permission: ['STAFF']}},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard],
    data: {permission: ['ROOT_ADMIN', 'ADMIN', 'STAFF', 'MANAGER', 'SENIOR_MANAGER', 'STAKEHOLDER']}},
  { path: 'manager', component: ManagerComponent, canActivate: [AuthGuard], data: {permission: ['ROOT_ADMIN', 'MANAGER', 'SENIOR_MANAGER']}},
  { path: 'freezer/:id', component: FreezerComponent, canActivate: [AuthGuard], data: {permission: ['ROOT_ADMIN', 'MANAGER', 'SENIOR_MANAGER']}},
  { path: 'merchant', component: MerchantComponent, canActivate: [AuthGuard], data: {permission: ['MERCHANT', 'ROOT_ADMIN', 'ADMIN']}},
  { path: 'farmer', component: FarmerComponent, canActivate: [AuthGuard], data: {permission: ['FARMER', 'ROOT_ADMIN']}},
  { path: 'administrator', component: AdministratorComponent, canActivate: [AuthGuard], data: {permission: ['ADMIN', 'ROOT_ADMIN']}},
  { path: 'item-detail/:id', component: ItemDetailComponent, canActivate: [AuthGuard],
    data: {permission: ['ROOT_ADMIN', 'ADMIN', 'STAFF', 'MANAGER', 'SENIOR_MANAGER', 'STAKEHOLDER']}},
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard],
    data: {permission: ['ROOT_ADMIN', 'ADMIN', 'STAFF', 'MANAGER', 'SENIOR_MANAGER', 'STAKEHOLDER', 'UNKNOWN']}},
  { path: 'create-bazar', component: CreateBazarComponent, canActivate: [AuthGuard], data: {permission: ['MERCHANT', 'ROOT_ADMIN','ADMIN']}},
  { path: 'edit-bazar/:id', component: CreateBazarComponent, canActivate: [AuthGuard], data: {permission: ['MERCHANT', 'ROOT_ADMIN','ADMIN']}},
  { path: 'transaction-histories', component: TransactionHistoryComponent, canActivate: [AuthGuard],
    data: {permission: ['ROOT_ADMIN', 'ADMIN', 'STAFF', 'MANAGER', 'SENIOR_MANAGER', 'STAKEHOLDER']}},
  { path: 'detail-group/:id', component: DetailGroupComponent, canActivate: [AuthGuard], data: {permission: ['MANAGER', 'ROOT_ADMIN', 'SENIOR_MANAGER']}},
  { path: 'merchant-transaction', component: MerchantTransactionComponent, canActivate: [AuthGuard], data: {permission: ['MERCHANT', 'ROOT_ADMIN','ADMIN']}},
  { path: 'newsletter', component: NewsletterComponent, canActivate: [AuthGuard], data:{permission: ['ADMIN']}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
