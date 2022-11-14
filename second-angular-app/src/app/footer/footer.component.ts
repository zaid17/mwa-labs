import { Component, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  @Input()
  greeting: string = 'no';
  @Output()
  out: string = 'no';
  constructor() {
    this.out = this.greeting;
  }

  ngOnInit(): void {}
}
