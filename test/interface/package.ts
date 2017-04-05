import _Pjax, { Pjax, Config } from 'pjax-api';

describe('Interface: Package', function () {
  describe('default', function () {
    it('default', function () {
      assert(_Pjax === Pjax);
    });

  });

  describe('function', function () {
    it('assign', function () {
      assert(typeof Pjax.assign === 'function');
    });

    it('replace', function () {
      assert(typeof Pjax.replace === 'function');
    });

  });

  describe('method', function () {
    it('new', function () {
      assert(new Pjax(<Config>{}) instanceof Object);
    });

    it('assign', function () {
      assert(typeof new Pjax({}).assign === 'function');
    });

    it('replace', function () {
      assert(typeof new Pjax({}).replace === 'function');
    });

  });

});
