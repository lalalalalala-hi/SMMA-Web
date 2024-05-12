import { Component } from '@angular/core';

@Component({
  selector: 'app-wifi-data',
  templateUrl: './wifi-data.component.html',
  styleUrl: './wifi-data.component.scss',
})
export class WifiDataComponent {
  wifiName: string | null = null;

  constructor() {}

  ngOnInit(): void {}

  // get wifi info
  getWifiInfo(): void {}
}
