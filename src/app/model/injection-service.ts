import {InjectionToken} from '@angular/core';
import {ShopService} from './shop-service.model';

export let SERVICE = new InjectionToken<ShopService>('service');
