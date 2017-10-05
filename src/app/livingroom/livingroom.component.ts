import {Component, OnInit} from '@angular/core';
import {CatinfoService} from "../catinfo.service";
import {CatInfos} from "../catinfo.model";

@Component({
  selector: 'app-livingroom',
  templateUrl: './livingroom.component.html',
  styleUrls: ['./livingroom.component.css']
})
export class LivingroomComponent implements OnInit {

  public allCats: CatInfos;

  constructor(private catInfoService: CatinfoService) {
  }

  ngOnInit() {
    this.catInfoService.getCatInfos().subscribe((kitties) => {
      this.allCats = kitties;
    });
  }

  public addCat(): void {
    this.catInfoService.addCat({name: "Garfield", sleeping: true});
  }

}
