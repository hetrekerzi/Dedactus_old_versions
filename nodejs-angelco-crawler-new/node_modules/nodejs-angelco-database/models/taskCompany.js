module.exports = function (mongoose) {
    var taskCompanySchema = mongoose.Schema({
        companyId: {
            type: String
        },
        companyNumericId: {
            type: String,
            unique: true
        },
        taskId: {
            type: String
        },
        dateModified: {
            type: Date,
            "default": Date.Now
        }
    });
    return mongoose.model('taskCompany', taskCompanySchema);
};