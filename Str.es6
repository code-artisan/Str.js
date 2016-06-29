import _ from 'underscore';

class Str {

  static VERSION = '1.0.0';

  static replace(replacers, replacement, target) {
    if (! _.isString(target)) {
      throw Error('Target type error.');
    }

    let message = target, increment = 0;

    if (_.isString(replacers)) {
      if (_.isString(replacement) || _.isRegExp(replacement)) { // Normal.
        message = message.replace(replacers, replacement);
      } else if (_.isFunction(replacement)) {
        message = message.replace(replacers, (matched) => {
          return replacement(matched);
        });
      } else if (_.isArray(replacement)) {
        message = message.replace(replacers, () => {
          return replacement[increment];
        });
      } else if (_.isObject(replacement)) {
        message = message.replace(replacers, (matchKey) => {
          return replacement[matchKey];
        });
      }
    } else if (_.isArray(replacers)) {
      let regexp = new RegExp('('+ replacers.join('|') +')', 'g');

      if (_.isString(replacement)) {
        message = message.replace(regexp, replacement);
      } else if (_.isArray(replacement)) {
        message = message.replace(regexp, (matched) => {
          let index = replacers.indexOf(matched);

          return replacement[index] ? replacement[index] : matched;

        });
      } else if (_.isObject(replacement)) {
        regexp = new RegExp('('+ replacers.join('|') +')');

        message = message.replace(regexp, (matchedKey) => {
          return replacement[matchedKey] || 'null';
        });
      }
    }

    return message;
  }

  /**
   * 获取字符串的实际长度.
   *
   * @param  {string} str     目标字符
   * @param  {string} charset 字符编码
   * @return {number}         字符串实际总长度
   */
  static size(str, charset = 'utf-8') {
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
  }

  /**
   * Determine if a given string contains a given substring.
   *
   * @param  string  $haystack
   * @param  string|array  $needles
   * @return bool
   */
  static contains(haystack, needles) {
    needles = Array(needles);

    for (var i = needles.length - 1; i >= 0; i--) {
      if (needles[i] !== '' && haystack.indexOf(needles[i]) !== -1) {
        return true;
      }
    }

    return false;
  }

  /**
   * Determine if a given string starts with a given substring.
   *
   * @param  string  $haystack
   * @param  string|array  $needles
   * @return bool
   */
  static startsWith(haystack, needles) {
    needles = Array(needles);

    for (var i = needles.length - 1; i >= 0; i--) {
      if (needles[i] !== '' && haystack.indexOf(needles[i]) === 0) {
        return true;
      }
    }

    return false;
  }

  /**
   * Determine if a given string ends with a given substring.
   *
   * @param  string  $haystack
   * @param  string|array  $needles
   * @return bool
   */
  static endsWith(haystack, needles) {
    needles = Array(needles);

    for (var i = needles.length - 1; i >= 0; i--) {
      if (String(needle[0]) === haystack.substr(0, needle[0].length)) {
        return true;
      }
    }

    return false;
  }

  /**
   * Make a string's first character uppercase.
   *
   * @param  string  $string
   * @return string
   */
  static ucfirst(string) {
    return Str.upper(string.substr(0, 1)) + string.substr(1);
  }

  /**
   * Convert the given string to upper-case.
   *
   * @param  string  $value
   * @return string
   */
  static upper(string) {
    return String(string).toUpperCase();
  }

  /**
   * Convert the given string to lower-case.
   *
   * @param  string  $value
   * @return string
   */
  static lower(string) {
    return String(string).toLowerCase();
  }

  /**
   * Generate a "random" alpha-numeric string.
   *
   * Should not be considered sufficient for cryptography, etc.
   *
   * @param  int  $length
   * @return string
   */
  static quickRandom(length) {
    return _.shuffle('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''))
            .join('').slice(0, length || 16);
  }
}

export default Str;
