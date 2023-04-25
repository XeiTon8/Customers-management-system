import { Injectable} from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class IsComponentLoadedService {

  constructor() { }

  isLoaded:boolean = false;

  ShowContent() {
    this.isLoaded = true;
  }

}
