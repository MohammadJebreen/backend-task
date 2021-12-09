import sequelize from "../src/sequelizeConnection/connection.mjs";

module.exports.mochaGlobalSetup = async () => {
    //global setup fixture
    // await import('../src/registerEventHandlers'); ==> if global events needs to be registered
    // const { sequelize } = await import('../src/dataAccess');
    await sequelize.sync();
};