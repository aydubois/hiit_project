import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isStarted:boolean
  constructor() { }

  ngOnInit(): void {
  }

  startEvent(event:boolean){
    this.isStarted = event
  }
}
