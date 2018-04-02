module.exports = function (mongoose) {
    var downloadTaskSchema = mongoose.Schema({
        filters: {
            type: Array,
            "default": []
        },
        dateModified: {
            type: Date,
            "default": Date.Now
        }
    });
    return mongoose.model('DownloadTask', downloadTaskSchema);
};