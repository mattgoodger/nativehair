import { Component, OnInit } from '@angular/core';
import { moveIn, fallIn } from "../router.animation";

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [moveIn(), fallIn()],
  host: {'@moveIn': '' }
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
