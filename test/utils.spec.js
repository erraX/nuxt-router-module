const { get,normalizeKeyPath } = require('../lib/utils');

describe('test utils', () => {
  describe('utils#normalizeKeyPath', () => {
    it('should normalize string keys', () => {
      expect(normalizeKeyPath('a.b.c')).toEqual(['a', 'b', 'c']);
      expect(normalizeKeyPath('a')).toEqual(['a']);
    });

    it('should trim empty keys', () => {
      expect(normalizeKeyPath('.a..b.c..')).toEqual(['a', 'b', 'c']);
    });

    it('should index type keys work', () => {
      expect(normalizeKeyPath('a[0]b[1][2].c')).toEqual(['a', '0', 'b', '1', '2', 'c']);
    });
  });

  describe('utils#get', () => {
    it('should not get from invalid object', () => {
      expect(get('foo', 'foo')).toBe(undefined);
      expect(get(1, 'foo')).toBe(undefined);
      expect(get(function () {}, 'foo')).toBe(undefined);
    });

    it('should not get from empty value', () => {
      expect(get(null, 'foo')).toBe(undefined);
      expect(get(undefined, 'foo')).toBe(undefined);
    });

    it('should default value work', () => {
      expect(get({ bar: 'bar' }, 'foo', 1)).toBe(1);
    });

    it('should work when `keyPath` is deeply path', () => {
      const target = {
        foo: { bar: 1 },
      };
      expect(get(target, 'foo.bar')).toBe(target.foo.bar);
    });

    it('should work when `keyPath` is index type', () => {
      const target = [
        { foo: { bar: ['bar'] } },
      ];
      expect(get(target, '[0].foo.bar[0]')).toBe(target[0].foo.bar[0]);
    });
  });
});
