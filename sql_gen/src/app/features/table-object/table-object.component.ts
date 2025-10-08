import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';
import { TableObjectInterface } from './table-object.interface';

@Component({
  selector: 'app-table-object.component',
  imports: [FormsModule, InputTextModule, FloatLabel],
  templateUrl: './table-object.component.html',
  styleUrl: './table-object.component.css',
  standalone: true,
})
export class TableObjectComponent {
  tableobject!:TableObjectInterface;


}
