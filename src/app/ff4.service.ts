import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Ff4Service {
  constructor() {
    import("../../crate/pkg").then(m => console.log(m.run()));
  }
}
