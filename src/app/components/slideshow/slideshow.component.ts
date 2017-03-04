import {Component, Input, ElementRef} from '@angular/core';

@Component({
  selector: 'ps-slideshow',
  templateUrl: 'slideshow.component.html',
  styleUrls: ['slideshow.component.scss']
})
export class SlideshowComponent {

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
   * @constructor
   * @public
   * @param elementRef
   */
  constructor(private elementRef: ElementRef) { }

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
  }

  /**
   * Updates current image
   *
   * @private
   * @returns void
   */
  private updateImage(): void {
    const wrapper = this.elementRef.nativeElement.querySelector('.image-slideshow-container .image');
    const container = wrapper.querySelector('.image-slideshow-container .image .content-image');
    const oldReference = container.src;

    wrapper.classList.add("slide");
    container.classList.remove('ng2-lazyloaded');
    container.src = "";

    let img = new Image();
    img.src = this.images[this.index];

    img.addEventListener('load', this.onImageLoaded.bind(this, img, wrapper, container));
    img.addEventListener('error', this.onImageError.bind(this, wrapper, container, oldReference));
  }

  /**
   * On image loaded
   *
   * @private
   * @param img
   * @param wrapper
   * @param container
   * @returns void
   */
  private onImageLoaded(img, wrapper, container): void {
    container.src = img.src;
    wrapper.classList.remove("slide");
    container.classList.add('ng2-lazyloaded');
  }

  /**
   * On image load error
   *
   * @private
   * @param wrapper
   * @param container
   * @param oldReference
   * @returns void
   */
  private onImageError(wrapper, container, oldReference): void {
    container.src = oldReference;
    wrapper.classList.remove("slide");
    container.classList.add('ng2-lazyloaded');
  }
}
