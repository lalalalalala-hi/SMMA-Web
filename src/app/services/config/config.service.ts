import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  public readonly baseUrl: string = 'http://10.202.101.91:5184/api';

  constructor() {}
}
