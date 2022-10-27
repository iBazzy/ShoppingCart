import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: 'agregar',
    loadChildren: () => import('./producto/agregar/agregar.module').then( m => m.AgregarPageModule)
  },
  {
    path: 'modificar',
    loadChildren: () => import('./producto/modificar/modificar.module').then( m => m.ModificarPageModule)
  },
  {
    path: 'eliminar/:idProducto',
    loadChildren: () => import('./producto/eliminar/eliminar.module').then( m => m.EliminarPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./producto/listar/listar.module').then( m => m.ListarPageModule)
  },
  {
    path: 'carrito',
    loadChildren: () => import('./producto/carrito-de-compra/carrito-de-compra.module').then( m => m.CarritoDeCompraPageModule)
  },
  {
    path: 'detalle/:idProducto',
    loadChildren: () => import('./producto/detalle/detalle.module').then( m => m.DetallePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
