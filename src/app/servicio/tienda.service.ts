import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, pipe } from 'rxjs';
import { idProducto, NotebookModificar, Productos } from '../producto/modelo/productos';
@Injectable({
  providedIn: 'root'
})
export class TiendaService {
  private urlProductos= "http://localhost:3000/productos";
  private comLista = new BehaviorSubject<Array<idProducto>>([]);
  private paginaActual = 1;
  public listaProductos$ = this.comLista.asObservable();
  private carrito =[];
  private CarritoItemCount= new BehaviorSubject(0);
  public cartItemList:any =[];
  public productList = new BehaviorSubject<any>([]);
  constructor(private http: HttpClient) { }

  public agregarNotebook(producto:Productos){
    return this.http.post(this.urlProductos,producto,{
      headers:{
        'Content-Type': 'application/json;charset=utf-8'
      }
    })
  }

  public obternerTodo(){
    return this.http.get<Array<idProducto>>(`${this.urlProductos}?
    _page=1`)
    .subscribe(datos =>{
      this.paginaActual= this.paginaActual+1;
      this.comLista.next(datos);
    });
  }

  public obtenerProductoporID(id:number):
  Observable<idProducto| null>{
    return this.http.get<idProducto | null>
    (`${this.urlProductos}/${id}`);
  }
  public eliminarProduct(id:number):Observable<any>{
    return this.http.delete(`${this.urlProductos}/${id}`)

  }

  public modificarProducto(id: number, playload: NotebookModificar): Observable<any>{
    return this.http.patch(`${this.urlProductos}/${id}`,playload,{
      headers:{
        'Content-Type': 'application/json;charset=utf-8'
      }
    })
  }

  public AgregarCarrito(product : Productos){
    this.cartItemList.push(product);
    this.productList.next(this.cartItemList);
    this.getTotalPrice();
    console.log(this.cartItemList);

  }
  getTotalPrice():number{
    let grandTotal = 0;
    this.cartItemList.map((a:Productos)=>{
      grandTotal += a.precio;
    })
    return grandTotal;
  }

  removeAllCart(){
    this.cartItemList = [];

    this.productList.next(this.cartItemList);
  }

}
