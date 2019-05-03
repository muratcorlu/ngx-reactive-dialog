import { Component, ViewEncapsulation } from '@angular/core';

/**
 * Component being used for creating dialogs inside components
 * Should be used together with pipe
 *
 * ```html
 * <im-dialog *imDialogState="state">
 *  <im-dialog-title> Title </im-dialog-title>
 *  <im-dialog-content> Content </im-dialog-content>
 *  <im-dialog-footer>
 *    <button (click)="state.cancel()">Cancel</button>
 *    <button (click)="state.resolve(true)">Ok</button>
 *  </im-dialog-footer>
 * </im-dialog>
 * ```
 */
@Component({
  selector: 'im-dialog',
  template: '<ng-content></ng-content>',
  styleUrls: ['./dialog.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DialogComponent {
}
