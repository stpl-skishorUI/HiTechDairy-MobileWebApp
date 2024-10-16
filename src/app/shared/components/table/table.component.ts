import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { CommonMethodService } from 'src/app/core/services/common-method.service';
import { DirectivesModule } from '../../directives/directives.module';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import {  RouterModule } from '@angular/router';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, DirectivesModule, MatButtonModule, MatSlideToggleModule, MatPaginatorModule, MatTooltipModule, RouterModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  @Input() receivedTableData!: any;
  @Output() public actionObj = new EventEmitter<any>();

  constructor(public commonMethodService: CommonMethodService) {
  }

  ngAfterViewInit() {
    console.log()
  }

  action(obj: any, label: string, i?: any) {
    obj.index = i;
    obj.label = label;
    label == 'pagination' ? obj.pageNumber = obj.pageIndex + 1 : '';
    this.actionObj.emit(obj);
  }
}
