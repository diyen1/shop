import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {AdminShopComponent} from './shop/admin-shop.component';
import {DmfbAdminComponent} from './dmfb-admin.component';
import {AdminUsersComponent} from './users/admin-users.component';
import {AdminDashboardComponent} from './dashboard/admin-dashboard.component';


const routes: Routes = [{
  path: '',
  component: DmfbAdminComponent,
  children: [
    {
      path: 'dashboard',
      component: AdminDashboardComponent,
    },
    {
      path: 'services',
      component: AdminShopComponent,
    },
    {
      path: 'users',
      component: AdminUsersComponent,
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    // { path: '**', component: AdminDashboardComponent },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {
}
