import { content, _split as split, _wait as wait } from './content';
import { parse } from '../../../../../lib/html';
import DOM from 'typed-dom';

describe('Unit: layer/domain/router/module/update/content', () => {
  describe('content', () => {
    it('body', () => {
      const src = parse('<body id="id" class="class"><hr></body>').extract();
      const dst = parse('<body></body>').extract();
      content({ src, dst }, ['body'])
        .extract();
      assert(dst.body.id === 'id');
      assert(dst.body.className === 'class');
      assert(dst.body.innerHTML === '<hr>');
    });

    it('multiple', () => {
      const src = parse('<div class="class"></div><div id="id">a</div><div class="class">c</div>').extract();
      const dst = parse('<div id="id"></div><div class="class">b</div><div class="class"></div>').extract();
      content({ src, dst }, ['_', '#id, .class', '.class', '_'])
        .extract();
      assert(dst.body.innerHTML === '<div id="id">a</div><div class="class"></div><div class="class">c</div>');
    });

    it('failure', done => {
      const src = parse('<div id="id">a</div><div class="class">c</div>').extract();
      const dst = parse('<div id="id"></div><div class="class">b</div><div class="class"></div>').extract();
      content({ src, dst }, ['_', '#id, .class', '.class', '_'])
        .extract(done);
    });

  });

  describe('split', () => {
    it('single', () => {
      assert.deepStrictEqual(
        split('body'),
        ['body']);
    });

    it('multiple', () => {
      assert.deepStrictEqual(
        split('#id, .class[data-pjax]'),
        ['#id', '.class[data-pjax]']);
    });

  });

  describe('wait', () => {
    it('img', done => {
      const el = DOM.img({ src: './' }, []).element;
      document.body.appendChild(el);
      wait(el)
        .then(() => (el.remove(), done()));
    });

    it('iframe', done => {
      const el = DOM.iframe({ src: './' }, []).element;
      document.body.appendChild(el);
      wait(el)
        .then(() => (el.remove(), done()));
    });

  });

});
