import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-speed',
  templateUrl: './speed.component.html',
  styleUrls: ['./speed.component.scss']
})
export class SpeedComponent implements OnInit {
  @Input() speed: any;

  constructor() { }

  ngOnInit() {
  }

}
