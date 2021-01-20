exports.get = (target, keyPath, defaultValue) => {
  if (
    !target
      || typeof keyPath !== 'string'
      || typeof target !== 'object'
  ) {
    return defaultValue;
  }

  const normalizedKeyPath = exports.normalizeKeyPath(keyPath);

  let prevValue = target;
  for (let i = 0; i < normalizedKeyPath.length; i++) {
    prevValue = prevValue[normalizedKeyPath[i]];
    if (typeof prevValue !== 'object') {
      return prevValue === undefined ? defaultValue : prevValue;
    }
  }

  return prevValue === undefined ? defaultValue : prevValue;
};

/**
 *    '[0].foo[1].bar[2]'
 * => '0.foo.1.bar.2'
 *
 * @param {string} keyPath
 * @return {string[]}
 */
exports.normalizeKeyPath = keyPath => {
  return keyPath
    .replace(/\[(\d+)]/g, '.$1.')
    .split('.')
    .filter(Boolean);
};
