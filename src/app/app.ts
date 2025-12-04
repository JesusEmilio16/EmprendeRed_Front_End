import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./view/header/header";
import { ReporteComponent } from "./view/reporte/reporte";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, ReporteComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'emprendered-frontend';
}
