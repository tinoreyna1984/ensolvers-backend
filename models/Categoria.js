const { Schema, model } = require('mongoose');

const CategoriaSchema = Schema({
    nombre: {
        type: String,
        required: true,
        default: 'no-category',
        unique: true
    },
});


CategoriaSchema.methods.toJSON = function() {
    const { __v,  _id, ...data  } = this.toObject();
    data.id = _id;
    return data;
}


module.exports = model( 'Categoria', CategoriaSchema );