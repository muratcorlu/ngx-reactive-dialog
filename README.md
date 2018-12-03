# ngx-reactive-dialog (WIP)

Reactive and declarative dialogs for Angular

## Installation

```bash
npm install --save ngx-reactive-dialog
```

Import `ReactiveDialogModule` in your module file(`app.module.ts`):

```ts
import { ReactiveDialogModule } from 'ngx-reactive-dialog';

@NgModule({
    imports: [
        ReactiveDialogModule
    ]
})
```

## Usage

```html
<im-dialog *imDialogState="myDialogState">
    <im-dialog-title>My Title</im-dialog-title>
    <im-dialog-content>Some content</im-dialog-content>
    <im-dialog-footer>
        <button (click)="myDialogState.resolve()">Close</button>
    </im-dialog-footer>
</im-dialog>
```