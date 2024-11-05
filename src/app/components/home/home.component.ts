import { Component, OnInit, AfterViewInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit,AfterViewInit {
  title = 'Welcome to Chess.com!';
  titleArray = this.title.split('')
  printElement(titleArray:string[], index:number) {
    
    if (index < titleArray.length ) {
      setTimeout(() => {
          this.printElement(titleArray, index + 1);
          this.title += this.titleArray[index];
      }, 200);
    }
    else {
      setTimeout(() => {
        this.title = ' ';
        this.printElement(this.titleArray, 0);
      }, 1500);
    }
  }
  ngOnInit(): void {
    this.title = '';
  }
  ngAfterViewInit() {
    this.printElement(this.titleArray, 0)
  };
}
