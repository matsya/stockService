var ns = require('./exception');
DuplicateException = function(message) {
    this.name = 'Duplicate Stock';
    this.message = message;
};

DuplicateException.prototype = new ns.Exception();
module.exports.DuplicateException = DuplicateException;

// class DuplicateException extends Exception {
//   constructor(title, message, errorCode) {
//     this._title = title || 'unknown';;
//     this._message = message || 'no description';;
//     this._errorCode = errorCode;
//   }

//   setError(message,errorCode) {
//   	this._message = message;
//   	this._errorCode = errorCode;
//   }

//   getError() {
//     return this;
//   }
// }