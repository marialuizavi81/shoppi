import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../service/service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loja',
  imports: [CommonModule],
  templateUrl: './loja.component.html',
  styleUrl: './loja.component.css'
})
export class LojaComponent implements OnInit{

  clik: boolean = false;
  mensagem: string = 'exibir';

  listaCompras: any = [];
  constructor(private service: ServiceService){}

  ngOnInit(): void {
    this.service.getproducts().subscribe(dados => {
      this.listaCompras = dados;
      console.log(this.listaCompras)
    })
  }

  detlhes(){
    this.clik = !this.clik
    if(this.clik) {
      this.mensagem = 'ocultar'
    } else {
      this.mensagem = 'exibir'
    }
  }

}
