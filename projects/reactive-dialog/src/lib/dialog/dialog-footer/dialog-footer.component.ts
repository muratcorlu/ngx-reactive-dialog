import { Component, ViewEncapsulation } from '@angular/core';

/**
 * Dialog footer container
 *
 * (!) Nested buttons are aligned on right
 */
@Component({
  selector: 'im-dialog-footer',
  template: '<ng-content></ng-content>',
  styleUrls: ['./dialog-footer.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DialogFooterComponent {
}
