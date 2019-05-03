import { Component, ViewEncapsulation} from '@angular/core';

/**
 * Dialog title container
 */
@Component({
  selector: 'im-dialog-title',
  template: '<ng-content></ng-content>',
  styleUrls: ['./dialog-title.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DialogTitleComponent {
}
