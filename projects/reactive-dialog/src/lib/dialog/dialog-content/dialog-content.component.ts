import { Component, ViewEncapsulation } from '@angular/core';

/**
 * Dialog content container
 */
@Component({
  selector: 'im-dialog-content',
  template: '<ng-content></ng-content>',
  styleUrls: ['./dialog-content.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DialogContentComponent {
}
