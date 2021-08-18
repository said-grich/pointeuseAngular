import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {Attendence} from "../../modeles/attendence.model";

@Component({
  selector: 'app-list-collapse-rows',
  templateUrl: './list-collapse-rows.component.html',
  styleUrls: ['./list-collapse-rows.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ListCollapseRowsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  // dataSource = Attendence;
  // columnsToDisplay = ['name', 'weight', 'symbol', 'position'];
  // expandedElement: Attendence | null =new Attendence();
  //


}
