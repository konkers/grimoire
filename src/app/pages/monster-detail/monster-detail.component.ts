import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { Ff4Service } from '../../ff4.service';

@Component({
  selector: 'app-monster-detail',
  templateUrl: './monster-detail.component.html',
  styleUrls: ['./monster-detail.component.scss']
})
export class MonsterDetailComponent implements OnInit {

  dataLoaded: boolean;
  monsterData: any;

  id$: Observable<string>;
  id: number;
  monster: any;
  name: any;
  physicalAttack: any;
  physicalDefense: any;
  magicalDefense: any;
  speed: any;
  dropTable: any;
  xp: any;
  gp: any;

  constructor( private route: ActivatedRoute, private router: Router, private ff4Service: Ff4Service) {
    this.monsterData = null;
    ff4Service.getDataLoaded().subscribe(loaded => {
      this.dataLoaded = loaded;
    });

    this.id$ = this.route.paramMap.pipe(
      map((params: ParamMap) => {
        const id = params.get('id');
        console.log('rawid', id);

        return id;
      })
    );
    this.id$.subscribe((id) =>
      console.log('id', id)
    );
    combineLatest(
      ff4Service.getMonsterData(),
      this.id$
    ).subscribe(v => {
      const d = this.monsterData = v[0];
      const id = this.id = Number(v[1]);

      if (d) {
        console.log(d);
        console.log(id);
        this.monster = d.monsters[id];
        this.name = d.name_table[id];
        this.xp = d.xp_table[id];
        this.gp = d.gp_table[id];
        this.physicalAttack = d.stat_table[this.monster.physical_attack_index];
        this.physicalDefense = d.stat_table[this.monster.physical_defense_index];
        this.magicalDefense = d.stat_table[this.monster.magical_defense_index];
        this.speed = d.speed_table[this.monster.speed_index];
        this.dropTable = d.drop_tables[this.monster.drop_table_index];
      }
    });
  }

  ngOnInit() {
  }

}
