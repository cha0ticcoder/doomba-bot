import mongoose from 'mongoose';

const modulesSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    defaults: {
        type: Map, // Either "Server" or "User"
        of: {
            type: Map, // Actual Default "Setting"
            of: mongoose.Schema.Types.Mixed,
        },
    }
});
