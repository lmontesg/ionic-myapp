import { Injectable } from '@angular/core';
import { Producto } from '../interfaces/producto';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private api="http://localhost:8080";


  constructor(
      private httpclient:HttpClient
  ) { }

  getAllProducto(){
    const path=`${this.api}/productos`;
    return this.httpclient.get<Producto[]>(path);
  }

  createProducto(producto:Producto){
    const path=`${this.api}/producto`;
    return this.httpclient.post(path,producto);
  }
  updateProducto(producto:Producto){
    const path=`${this.api}/producto/${producto.id}`;
    return this.httpclient.put<Producto>(path,producto);
  }

  deleteProducto(id:number){
    const path=`${this.api}/producto/${id}`;
    return this.httpclient.delete(path);
  }

}
