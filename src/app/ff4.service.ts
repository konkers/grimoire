import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { hash } from 'fast-sha256';
import { decode, encode } from 'typescript-base64-arraybuffer';

import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';

import { Ff4Service as ff4s } from '../../crate/pkg/rust_grimoire';

import { ObservableData } from './observable-data';

const ROM_KEY = 'ff4rom';

@Injectable({providedIn: 'root'})
export class Ff4Service {
  module: any;
  ff4: ff4s;

  private dataLoaded: ObservableData<boolean>;
  private errorMessage: ObservableData<string>;
  private monsterData: ObservableData<any>;

  readonly romSha256 =
    '414bacc05a18a6137c0de060b4094ab6d1b75105342b0bb36a42e45d945a0e4d';

  constructor(@Inject(SESSION_STORAGE) private storage: StorageService) {
    this.dataLoaded = new ObservableData<boolean>(false);
    this.monsterData = new ObservableData<any>(null);
    this.errorMessage = new ObservableData<string>('');

    import('../../crate/pkg').then(m => {
      m.run();
      this.module = m;

      const data64 = storage.get(ROM_KEY);
      const data = decode(data64);
      this.loadRom(data);
     });
  }

  uploadRom(file: File) {
    // TODO: gate loading on module loading
    const reader = new FileReader();
    reader.onloadend = (e) => {
      const data = new Uint8Array(reader.result as ArrayBuffer);
      const success = this.loadRom(data);
      if (success) {
        const data64 = encode(data);
        this.storage.set(ROM_KEY, data64);
      }
    };
    reader.readAsArrayBuffer(file);
  }

  loadRom(data: Uint8Array): boolean {
    const sha = Array.from(hash(data))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');

    if (sha !== this.romSha256) {
      this.errorMessage.nextData('This rom does not match the expected rom');
      return false;
    }

    this.ff4 =
      this.module.load_rom(data);
    this.dataLoaded.nextData(true);
    this.monsterData.nextData(this.ff4.get_monsters());
    return true;
  }


  getDataLoaded(): Observable<boolean> {
    return this.dataLoaded.data$;
  }

  getMonsterData(): Observable<any> {
    return this.monsterData.data$;
  }

  getErrorMessage(): Observable<string> {
    return this.errorMessage.data$;
  }
}
