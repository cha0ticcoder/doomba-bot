import mongoose from 'mongoose';

const guildsSchema = new mongoose.Schema({
    guildId: {type: String, required: true},
    modules: [{
        module: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Modules'
        },
        isActive: Boolean,
        guildSettings: {
            type: Map,
            of: mongoose.Schema.Types.Mixed,
        },
    }],
});