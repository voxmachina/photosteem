import {Component, Input} from '@angular/core';

@Component({
  selector: 'ps-loader',
  templateUrl: 'loader.component.html',
  styleUrls: ['loader.component.scss']
})
export class LoaderComponent {

  /**
   * A optional class name
   *
   * @type string
   */
  @Input() className: string;
}
