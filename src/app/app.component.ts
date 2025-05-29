import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LojaComponent } from "./components/loja/loja.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Shoppi';
}
