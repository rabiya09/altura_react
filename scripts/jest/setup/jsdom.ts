import { JSDOM } from 'jsdom';

const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
const { window } = jsdom;

const matchMedia = () => ({
  addListener: () => 0,
  matches: false,
  media: null,
  removeListener: () => 0,
});
window.matchMedia = window.matchMedia || matchMedia;

const globalAny: any = global;
globalAny.window = window;
globalAny.document = window.document;
globalAny.navigator = {
  userAgent: 'node.js',
};
globalAny.grecaptcha = {
  reset: jest.fn(),
};
globalAny.EventTarget = window.EventTarget;

window.requestAnimationFrame = jest.fn();
