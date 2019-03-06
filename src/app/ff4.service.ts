import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class Ff4Service {
  module: any;

  constructor() {
import('../../crate/pkg').then(m => {console.log(m); m.run(); this.module = m;
});
  }

  uploadRom(file: File) {
    let reader = new FileReader()
    reader.onloadend = (e) => {
      this.module.load_rom(new Uint8Array(reader.result as ArrayBuffer));
    };
    reader.readAsArrayBuffer(file);
  }
}
