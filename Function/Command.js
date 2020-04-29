module.exports = class command {
    static parse(message, prefix, db) {
        if (this.match(message, prefix, db)) {
            this.action(message, prefix, db);
            return true
        };
        return false
    };

    static match(message, prefix, db) {}

    static action(message, prefix, db) {}
}