import {Component, OnInit} from '@angular/core';
import {CatinfoService} from "../catinfo.service";
import {CatInfos} from "../catinfo.model";

@Component({
  selector: 'app-house',
  templateUrl: './house.component.html',
  styleUrls: ['./house.component.css']
})
export class HouseComponent implements OnInit {

  public allCats: CatInfos;

  constructor(private catInfoService: CatinfoService) {
  }

  ngOnInit() {
    this.catInfoService.getCatInfos().subscribe((kitties) => {
      this.allCats = kitties;
    });
  }

}
