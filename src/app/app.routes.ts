import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { NotificationsComponent } from './pages/notifications/notifications.component';


export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'about', component: AboutComponent},
    {path: 'catalog', component: CatalogComponent},
    {path: 'catalog/:id', component: ProductDetailComponent},
    {path: 'checkout', component: CheckoutComponent},
    {path: 'notifications/:notification', component: NotificationsComponent}

];
