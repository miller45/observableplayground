import {Component, OnInit} from '@angular/core';
import {CatinfoService} from "../catinfo.service";
import {CatInfos} from "../catinfo.model";

@Component({
  selector: 'app-bathroom',
  templateUrl: './bathroom.component.html',
  styleUrls: ['./bathroom.component.css']
})
export class BathroomComponent implements OnInit {

  public allCats: CatInfos;

  constructor(private catInfoService: CatinfoService) {
  }

  ngOnInit() {
    this.catInfoService.getCatInfos().subscribe((kitties) => {
      this.allCats = kitties;
    });
  }

}
