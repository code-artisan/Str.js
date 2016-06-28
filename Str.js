(function () {
  // Baseline setup
  // --------------

  // Establish the root object, `window` (`self`) in the browser, `global`
  // on the server, or `this` in some virtual machines. We use `self`
  // instead of `window` for `WebWorker` support.
  var root = typeof self === 'object' && self.self === self && self ||
            typeof global === 'object' && global.global === global && global ||
            this;

  var Str = function (obj) {
    if (obj instanceof Str) {
      return obj;
    }
    if (!(this instanceof Str)) return new Str(obj);
    this._wrapped = obj;
  };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for their old module API. If we're in
  // the browser, add `_` as a global object.
  // (`nodeType` is checked to ensure that `module`
  // and `exports` are not HTML elements.)
  if (typeof exports !== 'undefined' && !exports.nodeType) {
    if (typeof module !== 'undefined' && !module.nodeType && module.exports) {
      exports = module.exports = Str;
    }
    exports.Str = Str;
  } else {
    root.Str = Str;
  }

  Str.VERSION = '1.0.0';

  Str.replace = function (replacers, replacement, target) {
    if (! _.isString(target)) {
      throw Error('Target type error.');
    }

    let message = target, increment = 0;

    if (_.isString(replacers)) {
      if (_.isString(replacement) || _.isRegExp(replacement)) { // Normal.
        message = message.replace(replacers, replacement);
      } else if (_.isFunction(replacement)) {
        message = message.replace(replacers, function (matched) {
          return replacement(matched);
        });
      } else if (_.isArray(replacement)) {
        message = message.replace(replacers, function () {
          return replacement[increment];
        });
      } else if (_.isObject(replacement)) {
        message = message.replace(replacers, function (matchKey) {
          return replacement[matchKey];
        });
      }
    } else if (_.isArray(replacers)) {
      let regexp = new RegExp('('+ replacers.join('|') +')', 'g');

      if (_.isString(replacement)) {
        message = message.replace(regexp, replacement);
      } else if (_.isArray(replacement)) {
        message = message.replace(regexp, function (matched) {
          return replacement[increment] ? replacement[increment++] : matched;
        });
      } else if (_.isObject(replacement)) {
        regexp = new RegExp('('+ replacers.join('|') +')');

        message = message.replace(regexp, function (matchedKey) {
          return replacement[matchedKey] || 'null';
        });
      }
    }

    return message;
  };

  /**
   * 获取字符串的实际长度.
   *
   * @param  {string} str     目标字符
   * @param  {string} charset 字符编码
   * @return {number}         字符串实际总长度
   */
  Str.size = function(str, charset) {
    charset = charset || 'utf-8';
    var length = 0, len = str.length, charCode = -1;

    for (var i = 0; i < len; i++) {
      charCode = str.charCodeAt(i);

      if (charCode >= 0 && charCode <= 128) {
        length += 1;
      } else {
        length += charset === 'utf-8' ? 3 : 2;
      }
    }
    return length;
  };

  /**
   * Determine if a given string contains a given substring.
   *
   * @param  string  $haystack
   * @param  string|array  $needles
   * @return bool
   */
  Str.contains = function (haystack, needles) {
    needles = Array(needles);

    for (var i = needles.length - 1; i >= 0; i--) {
      if (needles[i] !== '' && haystack.indexOf(needles[i]) !== -1) {
        return true;
      }
    }

    return false;
  };

  /**
   * Determine if a given string starts with a given substring.
   *
   * @param  string  $haystack
   * @param  string|array  $needles
   * @return bool
   */
  Str.startsWith = function (haystack, needles) {
    needles = Array(needles);

    for (var i = needles.length - 1; i >= 0; i--) {
      if (needles[i] !== '' && haystack.indexOf(needles[i]) === 0) {
        return true;
      }
    }

    return false;
  };

  /**
   * Determine if a given string ends with a given substring.
   *
   * @param  string  $haystack
   * @param  string|array  $needles
   * @return bool
   */
  Str.endsWith = function (haystack, needles) {
    needles = Array(needles);

    for (var i = needles.length - 1; i >= 0; i--) {
      if (String(needle[0]) === haystack.substr(0, needle[0].length)) {
        return true;
      }
    }

    return false;
  };

  /**
   * Make a string's first character uppercase.
   *
   * @param  string  $string
   * @return string
   */
  Str.ucfirst = function (string) {
    return Str.upper(string.substr(0, 1)) + string.substr(1);
  };

  /**
   * Convert the given string to upper-case.
   *
   * @param  string  $value
   * @return string
   */
  Str.upper = function (string) {
    return String(string).toUpperCase();
  };

  /**
   * Convert the given string to lower-case.
   *
   * @param  string  $value
   * @return string
   */
  Str.lower = function (string) {
    return String(string).toLowerCase();
  };

  /**
   * Generate a "random" alpha-numeric string.
   *
   * Should not be considered sufficient for cryptography, etc.
   *
   * @param  int  $length
   * @return string
   */
  Str.quickRandom = function (length) {
    return _.shuffle('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''))
            .join('').slice(0, length || 16);
  };

  if (typeof define === 'function' && define.amd) {
    define('Str', [], function () {
      return Str;
    });
  }
}());
