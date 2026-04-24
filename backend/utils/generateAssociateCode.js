const Associates = require("../models/AssociateModel.js");

const generateAssociateCode = async () => {
    const lastUser = await Associates.findOne({
        order: [["id", "DESC"]],
        attributes: ["associate_code"]
    });

    let nextNumber = 10001;

    if (lastUser && lastUser.associate_code) {
        const lastNumber = parseInt(
            lastUser.associate_code.replace("AH", "")
        );
        nextNumber = lastNumber + 1;
    }

    return `AH${nextNumber}`;
};

module.exports = generateAssociateCode;