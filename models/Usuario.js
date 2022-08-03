const { Schema, model } = require('mongoose');

const UsuarioSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

// remover version del documento y password
UsuarioSchema.methods.toJSON = function() {
    const {__v, password, _id, ...usuario } = this.toObject();
    usuario.uid = _id; // es solo un cambio de nombre
    return usuario;
}

module.exports = model('Usuario', UsuarioSchema);


