import { Component, OnInit } from '@angular/core';
import { moveIn, fallIn } from '../router.animation';

@Component({
  selector: 'footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  animations: [moveIn(), fallIn()],
  host: {'@moveIn': '' }
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
