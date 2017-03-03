import {Component, Input} from '@angular/core';

@Component({
  selector: 'ps-loader',
  templateUrl: 'loader.component.html',
  styleUrls: ['loader.component.scss']
})
export class LoaderComponent {
  @Input() className: string;
}
