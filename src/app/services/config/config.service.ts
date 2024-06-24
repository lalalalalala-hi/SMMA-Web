import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  public readonly baseUrl: string = 'http://10.160.36.176:5184/api';

  constructor() {}
}
