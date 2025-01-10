const { v7: uuidv7 } = require('uuid');

const NewUUID = () => {
    return uuidv7();
}

module.exports = NewUUID

