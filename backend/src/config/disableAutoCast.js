const mongoose = require('mongoose')


const disableAutoCast = () => {
    mongoose.Schema.Types.String.cast(false);    
}

module.exports = disableAutoCast