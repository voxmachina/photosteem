import {Component, OnInit} from '@angular/core';
import {ContentComponent} from "../components/content/content.component";

@Component({
  selector: 'ps-home',
  templateUrl: '../components/content/content.component.html',
  styleUrls: ['../components/content/content.component.scss']
})
export class HomeComponent extends ContentComponent implements OnInit {
  /**
   * Upon component initialization
   */
  ngOnInit() {
    this.getHot();
  }
}
