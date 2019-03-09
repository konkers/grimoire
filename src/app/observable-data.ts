import { BehaviorSubject, Observable, combineLatest } from 'rxjs';

export class ObservableData<T> {
  data: T;
  private dataSubject: BehaviorSubject<T>;
  data$: Observable<T>;

  constructor(initialData: T) {
    this.data = initialData;
    this.dataSubject = new BehaviorSubject(this.data);
    this.data$ = this.dataSubject.asObservable();
  }

  next() {
    this.dataSubject.next(this.data);
  }

  nextData(data: T) {
    this.data = data;
    this.dataSubject.next(this.data);
  }
}
