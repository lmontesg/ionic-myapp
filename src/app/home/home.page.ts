import { Component, OnInit } from '@angular/core';
import { Producto } from '../interfaces/producto';
import { ProductoService } from '../services/producto.service';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  productos: Producto[] = [];
  constructor(
    private productoService: ProductoService,
    private alertController: AlertController,
    private toastController:ToastController
  ) { }
  ngOnInit(): void {
    this.getAllProductos();
  }
  getAllProductos() {
    this.productoService.getAllProducto()
      .subscribe(productos => {
        this.productos = productos;
      })
  }

  async openAlert() {
    const alert = await this.alertController.create({
      header: 'Nuevo Producto',
      inputs: [{
        name: 'id',
        type: 'number',
        placeholder: 'ID'
      },
      {
        name: 'nombre',
        type: 'text',
        placeholder: 'Nombre del producto'
      }
        ,
      {
        name: 'descripcion',
        type: 'textarea',
        placeholder: 'Descripción del producto'
      }
        ,
      {
        name: 'precio',
        type: 'number',
        placeholder: 'Precio del producto'
      }
      ],
      buttons: [{
        text: 'Cancelar',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
          console.log('Confirm Cancel');
        }
      }, {
        text: 'Crear',
        handler: (data) => {
          this.addProducto(data.id,data.nombre,data.descripcion,data.precio);
          console.log('Confirm Ok');
        }
      }

      ]
    });
    await alert.present();
  }

  addProducto(id:number,nombre:string,descripcion:string,precio:number){
    const producto={
      id,nombre,descripcion,precio
    };
    this.productoService.createProducto(producto)
    .subscribe((data)=>{
      this.getAllProductos();
      this.presentToast('Su producto fué creado correctamente');
    })
  }

  deleteProducto(id:number,index:number){
    this.productoService.deleteProducto(id)
    .subscribe(()=>{
      this.productos.splice(index,1);
      this.presentToast('Su producto fué eliminado correctamente');

    })
  }

  async presentToast(message:string){
    const toast=await this.toastController.create({
      message:message,
      duration:3000
    });
    toast.present();
  }

}
