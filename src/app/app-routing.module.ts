import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import {EmployeeComponent} from './employee/employee.component'
import {ManagerComponent} from './manager/manager.component'
import {MerchantComponent} from './merchant/merchant.component'
import {FarmerComponent} from './farmer/farmer.component'
import {AdministratorComponent} from './administrator/administrator.component'
import {ItemDetailComponent} from './item-detail/item-detail.component'
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './guard/auth.guard';
import {CreateBazarComponent} from './create-bazar/create-bazar.component';
import {TransactionHistoryComponent} from './transaction-history/transaction-history.component';
import {ProfileComponent} from './profile/profile.component';
import {DetailGroupComponent} from './manager/detail-group/detail-group.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'about', component: AboutComponent, canActivate: [AuthGuard]},
  { path: 'contact', component: ContactComponent, canActivate: [AuthGuard]},
  { path: 'employee', component: EmployeeComponent, canActivate: [AuthGuard]},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  { path: 'manager', component: ManagerComponent, canActivate: [AuthGuard]},
  { path: 'merchant', component: MerchantComponent, canActivate: [AuthGuard]},
  { path: 'farmer', component: FarmerComponent, canActivate: [AuthGuard]},
  { path: 'administrator', component: AdministratorComponent, canActivate: [AuthGuard]},
  { path: 'item-detail/:id', component: ItemDetailComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard]},
  { path: 'create-bazar', component: CreateBazarComponent, canActivate: [AuthGuard]},
  { path: 'edit-bazar/:id', component: CreateBazarComponent, canActivate: [AuthGuard]},
  { path: 'transaction-histories', component: TransactionHistoryComponent, canActivate: [AuthGuard]},
  { path: 'detail-group/:id', component: DetailGroupComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
