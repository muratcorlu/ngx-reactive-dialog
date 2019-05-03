import { DialogState } from './dialog-state';

describe('Dialog State', function () {

  let state: DialogState<string>;

  beforeEach(() => {
    state = new DialogState<string>();
  });

  it('should initialize correctly',  () => {
    expect(state.open).toBeFunction();
    expect(state.cancel).toBeFunction();
  });

  it('should trigger open', (done) => {

    state.state.subscribe(v => {
      expect(v).toBeTrue();
      done();
    });
    state.open();

  });

  it('should trigger close', (done) => {

    state.state.subscribe(v => {
      expect(v).toBeFalse();
      done();
    });
    state.cancel();

  });

  it('should resolve the dialog with the value', (done) => {

    state.open().subscribe(v => {
      expect(v).toBe('test');
      done();
    });
    state.resolve('test');

  });


  it('should have an immutable config', (done) => {
    state.configChange.subscribe(v => {
      expect(v.closable).toBe(true);
      done();
    });
    expect(() => {
      state.config.closable = true;
    }).toThrow();
    state.config = { closable: true };
  });

  it('should set context data for dialog', () => {
    const someData = {'uuid': 'uuid-1'};
    const newState = new DialogState<boolean, any>();
    newState.open(someData).subscribe();
    expect(newState.data.uuid).toBe('uuid-1');
  });
  describe('rejectOnClose', () => {
    let rejectableState;
    beforeEach(() => {
      rejectableState = new DialogState({ closable: true, rejectOnClose: true});
    });
    it('should reject on close', () => {
      rejectableState.open().subscribe({
        error: (message) => {
          expect(message).toBe('Cancelled');
        }
      });
      rejectableState.cancel();
    });
  });
});
