import {Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ShopComponent} from './shop/shop.component';
import {SearchComponent} from './search/search.component';
import {ChatComponent} from './modules/chat/chat/chat.component';
import {ProfileComponent} from './profile/profile.component';
import {ServiceSingleComponent} from './service-single/service-single.component';
import {LoginComponent} from './modules/auth/login/login.component';
import {RegisterComponent} from './modules/auth/register/register.component';
import {SellerProfileComponent} from './seller-profile/seller-profile.component';
import {AddServiceComponent} from './add-service/add-service.component';
import {EditServiceComponent} from './edit-service/edit-service.component';
import {EditProfileComponent} from './edit-profile/edit-profile.component';
import {DmfbAdminComponent} from './modules/admin/dmfb-admin.component';
import {AdminDashboardComponent} from './modules/admin/dashboard/admin-dashboard.component';
import {AdminShopComponent} from './modules/admin/shop/admin-shop.component';
import {AdminUsersComponent} from './modules/admin/users/admin-users.component';
import {AdminEditServiceComponent} from './modules/admin/admin-edit-profile/admin-edit-service.component';

export const routes: Routes = [
  {path: '', redirectTo: 'shop', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'shop', component: ShopComponent},
  {path: 'add-service', component: AddServiceComponent},
  {path: 'edit-service/:id', component: EditServiceComponent},
  {path: 'service/:id', component: ServiceSingleComponent},
  {path: 'search', component: SearchComponent},
  {path: 'chat', component: ChatComponent},
  {path: 'chat/:userId', component: ChatComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'edit-profile', component: EditProfileComponent},
  {path: 'seller-profile/:id', component: SellerProfileComponent},

  // {path: 'admin', loadChildren: './modules/admin/dmfb-admin.module#DmfbAdminModule'},
  {
    path: 'admin',
    component: DmfbAdminComponent,
    children: [
      {path: 'dashboard', component: AdminDashboardComponent},
      {path: 'services', component: AdminShopComponent},
      {path: 'users', component: AdminUsersComponent},
      {path: 'edit-service/:id', component: AdminEditServiceComponent},
      {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      {path: '**', component: AdminDashboardComponent},
    ],
  },

  {path: '', redirectTo: 'shop', pathMatch: 'full'},
  {path: '**', redirectTo: 'shop'},
];
