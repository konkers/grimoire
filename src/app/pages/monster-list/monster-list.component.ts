import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { Router, Scroll } from '@angular/router';
import { filter } from 'rxjs/operators';

import { Ff4Service } from '../../ff4.service';

@Component({
  selector: 'app-monster-list',
  templateUrl: './monster-list.component.html',
  styleUrls: ['./monster-list.component.scss']
})
export class MonsterListComponent implements OnInit, AfterViewInit {
  scrollPosition: [number, number];
  dataLoaded: boolean;
  monsterData: any;

  constructor(private router: Router, private viewportScroller: ViewportScroller, private ff4Service: Ff4Service) {
    // This is to handle maintaining position on back events.
    this.router.events.pipe(
      filter(e => e instanceof Scroll)
    ).subscribe(e => {
      if ((e as Scroll).position) {
        this.scrollPosition = (e as Scroll).position;
      } else {
        this.scrollPosition = [0, 0];
      }
    });

    this.monsterData = null;
    ff4Service.getDataLoaded().subscribe(loaded => {
      this.dataLoaded = loaded;
    });
    ff4Service.getMonsterData().subscribe(data => {
      console.log(data);
      this.monsterData = data;
    });
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.viewportScroller.scrollToPosition(this.scrollPosition);
  }
}
