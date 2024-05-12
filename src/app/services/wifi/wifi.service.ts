import { Injectable } from '@angular/core';

declare var WifiInfo: any;

@Injectable({
  providedIn: 'root',
})
export class WifiService {
  constructor() {}

  getWifiInfo(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (typeof WifiInfo !== 'undefined') {
        WifiInfo.getInfo(
          (info: any) => {
            resolve(info);
          },
          (error: any) => {
            reject(error);
          }
        );
      } else {
        reject('WifiInfo plugin is not available');
      }
    });
  }
}
