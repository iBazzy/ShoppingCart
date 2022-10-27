import { Component, OnInit, ViewChild } from '@angular/core';
import { TiendaService } from 'src/app/servicio/tienda.service';
import { idProducto } from '../modelo/productos';
import { IonInfiniteScroll } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-carrito-de-compra',
  templateUrl: './carrito-de-compra.page.html',
  styleUrls: ['./carrito-de-compra.page.scss'],
})
export class CarritoDeCompraPage implements OnInit {
  @ViewChild(IonInfiniteScroll)
  public scroll: IonInfiniteScroll;
  public productos: Array<idProducto>=[];
  constructor(private notebookApi:TiendaService,private router: Router) { }

  ngOnInit() {
    this.notebookApi.obternerTodo()
    this.notebookApi.listaProductos$.subscribe(datosActuales =>
      {
      this.productos=datosActuales;
      if(this.scroll){
        this.scroll.complete();
      }
    })
  }

}
