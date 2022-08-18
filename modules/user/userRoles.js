const { accessRoles } = require("../../middleware/auth");

const userAPI = {
    getDetails:[accessRoles.Admin,accessRoles.User]
}

module.exports = userAPI;