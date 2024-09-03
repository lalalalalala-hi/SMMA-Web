import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  public readonly baseUrl: string =
    'https://smma-ame6hmdmddc6hsc0.koreasouth-01.azurewebsites.net/api';

  constructor() {}
}
