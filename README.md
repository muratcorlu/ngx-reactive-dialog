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

Reactive Dialogs can be open/close from templates.

```html
<button (click)="myDialogState.open()">Open Dialog</button>
<im-dialog *imDialogState="myDialogState">
  <im-dialog-title>My Title</im-dialog-title>
  <im-dialog-content>Some content</im-dialog-content>
  <im-dialog-footer>
    <button (click)="myDialogState.resolve()">Close</button>
  </im-dialog-footer>
</im-dialog>
```

```ts
import { ReactiveDialogState } from 'ngx-reactive-dialog';

class MyComponent {
  myDialogState = new ReactiveDialogState();
}
```

Also can be open by controllers:

```ts
class MyComponent {
  myDialogState = new ReactiveDialogState();

  someAction() {
    this.myDialogState.open();
  }
}
```

If you need, you can subscribe to result of a dialog.

```ts
class MyComponent {
  askForNameDialog = new ReactiveDialogState<string>();

  someAction() {
    this.askForNameDialog.open().subscribe({
      next: (name) => {
        // Dialog resolved
        console.log(`Hello ${name}`);
      },
      error: () => {
        // Dialog rejected
        console.log('Hello anonymous');
      }
    });
  }
}
```

Dialogs can also have context data.

```ts
class MyComponent {
  // ReactiveDialogState<{result type}, {context type}>
  updateUserInfoDialog = new ReactiveDialogState<User, User>();

  someAction() {
    this.updateUserInfoDialog.open(this.currentUser).subscribe((editedUser) => {
      this.currentUser = editedUser;
    })
  }
}
```

```html
<im-dialog *imDialogState="updateUserInfoDialog">
  <im-dialog-title>Edit User</im-dialog-title>
  <im-dialog-content>
    <input [(ngModel)]="updateUserInfoDialog.data.username" name="username" placeholder="Username">
  </im-dialog-content>
  <im-dialog-footer>
    <button (click)="updateUserInfoDialog.resolve(updateUserInfoDialog.data)">Save</button>
    <button (click)="updateUserInfoDialog.cancel()">Cancel</button>
  </im-dialog-footer>
</im-dialog>
```
