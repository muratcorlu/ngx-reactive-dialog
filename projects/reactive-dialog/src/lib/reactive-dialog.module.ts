import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogContainerComponent } from './dialog-container/dialog-container.component';
import { DialogDirective } from './dialog/dialog.directive';
import { DialogComponent } from './dialog/dialog.component';
import { DialogTitleComponent } from './dialog/dialog-title/dialog-title.component';
import { DialogContentComponent } from './dialog/dialog-content/dialog-content.component';
import { DialogFooterComponent } from './dialog/dialog-footer/dialog-footer.component';

/**
 * Reactive Dialog Module
 */
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    DialogContainerComponent,
    DialogComponent,
    DialogDirective,
    DialogTitleComponent,
    DialogContentComponent,
    DialogFooterComponent
  ],
  exports: [
    DialogContainerComponent,
    DialogComponent,
    DialogDirective,
    DialogTitleComponent,
    DialogContentComponent,
    DialogFooterComponent
  ],
  entryComponents: [ DialogContainerComponent ]
})
export class ReactiveDialogModule { }
