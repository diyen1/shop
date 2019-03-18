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

  {path: 'admin', loadChildren: 'src/app/modules/admin/dmfb-admin.module#DmfbAdminModule'}
];
