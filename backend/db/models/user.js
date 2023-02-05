// modules
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    api: {
        key: String,
        secret: String
    }
});

UserSchema.pre('save', function (next) {
    const user = this;

    if (!(this.isModified('password') || this.isNew)) {
        return next();
    }

    bcrypt.genSalt(10, (saltError, salt) => {
        if (saltError) {
            return next(saltError);
        } else {
            bcrypt.hash(user.password, salt, (hashError, hash) => {
                if (hashError) {
                    return next(hashError);
                }

                user.password = hash;
                next();
            });
        }
    });
});

UserSchema.pre('updateOne', function (next) {
    const password = this.getUpdate().$set.password;

    if (!password) {
        return next();
    }

    try {
        bcrypt.genSalt(10, (saltError, salt) => {
            if (saltError) {
                return next(saltError);
            } else {
                bcrypt.hash(password, salt, (hashError, hash) => {
                    if (hashError) {
                        return next(hashError);
                    }

                    this.getUpdate().$set.password = hash;
                    next();
                });
            }
        });
    } catch (error) {
        return next(error);
    }
});

UserSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('users', UserSchema);

module.exports = User;
