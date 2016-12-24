import { Component } from '@angular/core';

export function generateToken(): any {
    return Math.random().toString(36).substr(2); // remove `0.`
};


export class StreamModel {
  name: string;
  token: string;
  constructor(name: string) {
    this.name = name;
    this.token = generateToken();
  }

}

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.css']
})
export class DashboardComponent {

  streams: StreamModel[];

  constructor() {
    this.streams = [];
  }

  startNewStream(inputName: HTMLInputElement) {
    this.streams.push(new StreamModel(inputName.value));
    console.log(`button clicked`);
    return false;
  }

  stopStream(stream: StreamModel): void {
  	// TODO: remove the stream item from array
  }
}
