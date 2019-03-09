import {Injectable} from '@angular/core';
import {Ff4Service as ff4s} from '../../crate/pkg/rust_grimoire';

@Injectable({providedIn: 'root'})
export class Ff4Service {
  module: any;
  ff4: ff4s;

  constructor() {
import('../../crate/pkg').then(m => {console.log(m); m.run(); this.module = m;});
  }

  uploadRom(file: File) {
    let reader = new FileReader()
    reader.onloadend = (e) => {
      this.ff4 =
          this.module.load_rom(new Uint8Array(reader.result as ArrayBuffer));
      console.log(this.ff4);
      console.log(this.ff4.get_monsters());
    };
    reader.readAsArrayBuffer(file);
  }
}
