import { ApplicationRef, ComponentFactoryResolver, ComponentRef, SimpleChanges, SimpleChange,
         Directive, DoCheck, EmbeddedViewRef, Inject, Input, TemplateRef, ViewContainerRef, NgZone, OnDestroy
       } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { DialogContainerComponent } from '../dialog-container/dialog-container.component';
import { DialogState } from './dialog-state';

/**
 * Structural Directive for creating dialogs inside components
 * Should be used together with im-dialog component
 *
 * Directive takes DialogState as an argument and manages the dialog by listenting to it.
 * see {@link DialogState}
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
@Directive({
  selector: '[imDialogState]'
})
export class DialogDirective implements DoCheck, OnDestroy {
  /**
   * Input for reading dialogState. Dialog will be injected and removed depending to state stream of
   * this DialogState object
   */
  @Input() set imDialogState(dialogState: DialogState) {
    this.state = dialogState;
    dialogState.state
      .subscribe(state => {
        if (state && !this.hasView) {
          this.show();
        } else if (state === false && this.hasView) {
          this.hide();
        }
      });
  }

  /** Points if we already injected the dialog or not */
  private hasView = false;
  /** template content of directive */
  private templateView: EmbeddedViewRef<any>;
  /** Component referance for injected DialogContainer */
  private componentRef: ComponentRef<DialogContainerComponent>;
  /** state of the dialog */
  private state: DialogState;

  /** Constructor method. Injects needed modules */
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private resolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private ngZone: NgZone,
    @Inject(DOCUMENT) private document: any
  ) { }
  /** On destroy it will hide dialog. */
  public ngOnDestroy(): void {
    if (this.hasView) {
      this.hide();
    }
  }
  /** Rerender inner template on every change */
  public ngDoCheck() {
    if (this.templateView && !this.templateView.destroyed) {
      this.templateView.detectChanges();
    }
  }

  /** Hides(removes) the dialog from dom */
  public hide() {
    this.componentRef.destroy();
    this.templateView.destroy();
    this.hasView = false;
  }

  /** Injects and renders the content of the directive inside a new DialogContainerComponent */
  private show() {

    this.ngZone.run(() => {
      this.templateView = this.templateRef.createEmbeddedView({});
      const compFactory = this.resolver.resolveComponentFactory(DialogContainerComponent);
      this.componentRef = compFactory.create(this.viewContainer.injector, [this.templateView.rootNodes]);
      this.componentRef.instance.state = this.state;
      this.componentRef.instance.ngOnChanges(
        {state: {previousValue: null, currentValue: this.state, firstChange: true} as SimpleChange} as SimpleChanges
      );

      const componentRootNode = (this.componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;

      this.appRef.attachView(this.componentRef.hostView);

      this.componentRef.onDestroy(() => {
        this.appRef.detachView(this.componentRef.hostView);
      });

      this.document.body.appendChild(componentRootNode);

      this.hasView = true;
    });
  }
}
