const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: {type: String, required: true},
    cpf: {type: Number, required: true},
    email: { type: String, required: true, unique: true },
    cep: {type: Number},
    street: {type: String},
    district: {type: String},
    city: {type: String},
    state: {type: String},
    number: {type: Number},
    complement: {type: String},    
    password: { type: String, required: true},
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Orders' }]
});

userSchema.methods.comparePassword = async function(password) {
    return bcrypt.compareSync(password, this.password)
};

userSchema.pre('save', async function(next) {
    if(this.isModified('password') || this.isNew) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hashSync(this.password, salt);
    };
    next();
});

const User = mongoose.model('UsersDB', userSchema);
module.exports = User;