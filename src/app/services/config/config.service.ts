import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  public readonly baseUrl: string = 'http://192.168.1.115:5184/api';

  constructor() {}
}
