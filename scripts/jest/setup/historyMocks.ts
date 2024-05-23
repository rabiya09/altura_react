class HistoryMock implements History {
  public scrollRestoration: ScrollRestoration = 'auto';
  public state = '';

  get length() {
    return this.state.length;
  }

  public back() {
    return this.state;
  }
  public forward() {
    return this.state;
  }

  public go(delta?: number) {
    return delta || null;
  }
  public pushState(data: any, title: string, url?: string | null) {
    return null;
  }
  public replaceState(data: any, title: string, url?: string | null) {
    return null;
  }
}

history = new HistoryMock();
