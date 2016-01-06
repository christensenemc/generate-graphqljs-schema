'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = writeText;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var StringBuilder = (function () {
  function StringBuilder(indentLevel) {
    _classCallCheck(this, StringBuilder);

    this.text = '';
    this.indentLevel = indentLevel;
  }

  _createClass(StringBuilder, [{
    key: 'line',
    value: function line(text) {
      this.text += '' + '\t'.repeat(this.indentLevel) + text + '\n';
    }
  }, {
    key: 'block',
    value: function block(open, buildBlock, close) {
      var blockStringBuilder = new StringBuilder(this.indentLevel + 1);
      buildBlock(blockStringBuilder);
      this.text += '' + '\t'.repeat(this.indentLevel) + open;
      this.text += '\n';
      this.text += blockStringBuilder.text;
      this.text += '' + '\t'.repeat(this.indentLevel) + close;
      this.text += '\n';
    }
  }]);

  return StringBuilder;
})();

function writeText(buildText) {
  var stringBuilder = new StringBuilder(0);
  buildText(stringBuilder);
  return stringBuilder.text;
}