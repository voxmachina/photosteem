import {Component, Input, ElementRef, OnChanges, SimpleChanges} from '@angular/core';
import {GoogleAnalyticsService} from "../../services/analytics/google-analytics.service";

@Component({
  selector: 'ps-slideshow',
  templateUrl: 'slideshow.component.html',
  styleUrls: ['slideshow.component.scss']
})
export class SlideshowComponent implements OnChanges {

  /**
   * A set of image links
   *
   * @type Array<string>
   */
  @Input() images: Array<string>;

  /**
   * Current image index
   *
   * @type number
   */
  public index: number = 0;

  /**
   * Current image wrapper element
   *
   * @type number
   */
  private imageWrapper: any;

  /**
   * Current image container element
   *
   * @type number
   */
  private imageContainer: any;

  /**
   * @constructor
   * @public
   * @param elementRef
   */
  constructor(private elementRef: ElementRef) { }

  /**
   * On input data change events
   *
   * @param changes
   */
  ngOnChanges(changes: SimpleChanges) {
    if (changes['images'] && changes['images'].currentValue) {
     setTimeout(this.loadContainers.bind(this), 300);
    }
  }

  /**
   * Loads image containers
   *
   * @private
   * @returns void
   */
  private loadContainers(): void {
    this.imageWrapper = this.elementRef.nativeElement.querySelector('.image-slideshow-container .image');
    this.imageContainer = this.imageWrapper.querySelector('.image-slideshow-container .image .content-image');
  }

  /**
   * Goes to page number provided
   *
   * @param number
   * @returns void
   */
  public page(number: number): void {
    this.index = number;
    this.updateImage();
    GoogleAnalyticsService.trackEvent('Slideshow', 'click', 'circle');
  }

  /**
   * Show previous image
   *
   * @returns void
   */
  public previous(): void {
    if (this.index <= 0) {
      this.index = this.images.length - 1;
    } else {
      this.index--;
    }

    this.updateImage();
    GoogleAnalyticsService.trackEvent('Slideshow', 'click', 'previous');
  }

  /**
   * Show next image
   *
   * @public
   * @returns void
   */
  public next(): void {
    if (this.index > this.images.length - 1) {
      this.index = 0;
    } else {
      this.index++;
    }

    this.updateImage();
    GoogleAnalyticsService.trackEvent('Slideshow', 'click', 'next');
  }

  /**
   * Updates current image
   *
   * @private
   * @returns void
   */
  private updateImage(): void {
    const oldReference = this.imageContainer.src;
    this.imageWrapper.classList.add("slide");
    this.imageContainer.classList.remove('ng2-lazyloaded');
    this.imageContainer.src = "";

    let img = new Image();
    img.src = this.images[this.index];

    img.addEventListener('load', this.onImageLoaded.bind(this, img));
    img.addEventListener('error', this.onImageError.bind(this, oldReference));
  }

  /**
   * On image loaded
   *
   * @private
   * @param img
   * @returns void
   */
  private onImageLoaded(img): void {
    this.imageContainer.src = img.src;
    this.imageWrapper.classList.remove("slide");
    this.imageContainer.classList.add('ng2-lazyloaded');
  }

  /**
   * On image load error
   *
   * @private
   * @param oldReference
   * @returns void
   */
  private onImageError(oldReference): void {
    this.imageContainer.src = oldReference;
    this.imageWrapper.classList.remove("slide");
    this.imageContainer.classList.add('ng2-lazyloaded');
    GoogleAnalyticsService.trackEvent('Slideshow', 'error', 'image_load');
  }
}
