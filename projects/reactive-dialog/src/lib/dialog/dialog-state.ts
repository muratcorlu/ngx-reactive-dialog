import { Subject, Observable, ReplaySubject } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';

/**
 * State manager for dialogs
 *
 * Should be used as a value for *imDialogState structural directive
 *
 * ```ts
 * // template.html
 * <im-dialog *imDialogState="myDialogState"> ... </im-dialog>
 *
 * // component.ts
 * public myDialogState = new DialogState<ReturnType, ContextDataType>({ closable: false });
 *
 * or
 *
 * public myDialogState = new DialogState<ReturnType, ContextDataType>({ rejectOnClose: true })
 *
 * // Open a dialog
 * myDialogState.open(contextData)
 *
 * * Setting contextData is optional
 *
 * // Open a dialog and subscribe to the result
 * myDialogState.open(contextData).subscribe(result => {
 *  do.something.with(result);
 * })
 *
 * // The config is immutable, so when changing it, reconfigure the full object
 * myDialogState.config = { closable: false };
 *
 * // In case you set rejectOnClose to true you should handle rejection like
 *
 * * myDialogState.open(contextData).subscribe({
 *     next: (result) => {
 *       do.something.with(result);
 *     },
 *     error: (error) => {
 *       console.log(error);
 *     })
 *
 * // Close the dialog
 * myDialogState.cancel();
 * ```
 */
export class DialogState<T = any, P = any> {
  /** Stream of the dialog context. */
  public stream: Subject<T> = new Subject();
  /** State of the dialog(points is it opened or closed) */
  public state = new ReplaySubject<boolean>(1);
  /** Context data for dialog */
  public data: P;
  /** Get current dialog config */
  public get config(): { closable?: boolean, rejectOnClose?: boolean }  {
    return this._config;
  }
  /** Set dialog config **/
  public set config(config: { closable?: boolean, rejectOnClose?: boolean } ) {
    this._config = Object.freeze({...this._config, ...config});
    this.configChange.next(this._config);
  }
  /** Triggered when config changes */
  public configChange: Subject<{ closable?: boolean, rejectOnClose?: boolean }> = new Subject();
  /** Internal reference to config of dialog */
  private _config: { closable: boolean, rejectOnClose: boolean } = Object.freeze({ closable: true, rejectOnClose: false });


  /** Accepts config for dialog */
  constructor(config?: { closable?: boolean, rejectOnClose?: boolean }) {
    if (config) {
      this.config = config;
    }
  }

  /** Opens a dialog and returns an observable of it's stream */
  public open(data?: P): Observable<T> {
    this.data = data;
    this.state.next(true);
    return Observable.create((observer) => {
      this.stream
        .pipe(
          takeUntil(this.state.pipe(filter(s => !s)))
        )
        .subscribe(observer);
    });
  }

  /** Cancels(Closes) the dialog */
  public cancel(): void {
    if (this.config.rejectOnClose) {
      this.stream.error('Cancelled');
      this.stream = new Subject();
    }
    this.closeDialog();
  }

  /** Resolves the dialog with a value */
  public resolve(v: T): void {
    this.stream.next(v);
    this.closeDialog();
  }

  /** Sets state to false, so dialog closes. */
  private closeDialog() {
    this.state.next(false);
  }
}
