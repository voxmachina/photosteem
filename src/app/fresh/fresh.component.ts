import {Component, OnInit} from '@angular/core';
import {ContentComponent} from "../components/content/content.component";

@Component({
  selector: 'ps-fresh',
  templateUrl: '../components/content/content.component.html',
  styleUrls: ['../components/content/content.component.scss']
})
export class FreshComponent extends ContentComponent implements OnInit {
  /**
   * Upon component initialization
   */
  ngOnInit() {
    super.trackView('fresh');
    super.getNew();
  }
}
