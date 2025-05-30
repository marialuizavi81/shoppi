import { Routes } from '@angular/router';
import { LojaComponent } from './components/loja/loja.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';


export const routes: Routes = [
    {path:'', component:LojaComponent},
    { path: 'products', component: LojaComponent },
    { path: 'products/:id', component: ProductDetailComponent },
    { path: '', redirectTo: '/products', pathMatch: 'full' }
];
