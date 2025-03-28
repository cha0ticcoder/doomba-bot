import mongoose from 'mongoose';

const moduleDataSchema = new mongoose.Schema({
    module: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Modules',
    },
    userData: {
        type: Map,
        of: mongoose.Schema.Types.Mixed,
    }
});

const usersSchema = new mongoose.Schema({
    userId: String,
    guild: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Guilds'
    },
    modules: [moduleDataSchema],
});