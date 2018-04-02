Array.prototype.next = function () {
    var i = ++this.current;
    if (i >= this.length) {
        this.current = 0;
    }
    return this[this.current];
};
Array.prototype.current = -1;