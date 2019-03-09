import { Component, OnInit } from '@angular/core';

import { MatSnackBar } from '@angular/material';

import { Ff4Service } from '../../ff4.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  dataLoaded: boolean;

  constructor(private snackBar: MatSnackBar, private ff4Service: Ff4Service) {
    ff4Service.getDataLoaded().subscribe(loaded => {
      this.dataLoaded = loaded;
    });
    ff4Service.getErrorMessage().subscribe(msg => {
      if (msg !== '') {
        this.snackBar.open(msg, 'OK');
      }
    });
  }

  ngOnInit() {
  }

  handleRomUpload(files: FileList) {
    this.ff4Service.uploadRom(files[0]);
  }
}
