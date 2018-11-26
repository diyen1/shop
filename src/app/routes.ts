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
import {AuthGuard} from './auth.guard';
import {EditServiceComponent} from './edit-service/edit-service.component';

export const routes: Routes = [
  {path: '', redirectTo: 'shop', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'shop', component: ShopComponent},
  {path: 'add-service', component: AddServiceComponent, canActivate: [AuthGuard]},
  {path: 'edit-service/:id', component: EditServiceComponent, canActivate: [AuthGuard]},
  {path: 'service/:id', component: ServiceSingleComponent},
  {path: 'search', component: SearchComponent},
  {path: 'chat', component: ChatComponent, canActivate: [AuthGuard]},
  {path: 'chat/:userId', component: ChatComponent, canActivate: [AuthGuard]},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'seller-profile/:id', component: SellerProfileComponent},
];
