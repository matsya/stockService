Exception = function() {
}

Exception.prototype.toString = function() {
    var name = this.name || 'unknown';
    var message = this.message || 'no description';
    return '[' + name + '] ' + message;
};

module.exports.Exception = Exception;