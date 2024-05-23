class StorageMock implements Storage {
  private store = new Map();

  get length() {
    return this.store.size;
  }

  public clear() {
    this.store = new Map();
  }

  public removeItem(key: string) {
    this.store.delete(key);
  }

  public getItem(key: string) {
    return this.store.get(key) || null;
  }

  public key(index: number) {
    return this.store.values()[index] || null;
  }

  public setItem(key: string, value: string) {
    this.store.set(key, value);
  }
}

localStorage = new StorageMock();

sessionStorage = new StorageMock();
