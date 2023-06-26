const Sequlize=require("sequelize");

const sequelize= new Sequlize("InfowareSystem","root","Apple@123",{
    host:"localhost",
    dialect:"mysql"
});

module.exports={
    sequelize
}