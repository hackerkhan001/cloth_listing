const express = require('express');
const routes = require('./Router/router');
const app = express();
const sequelize = require('./utlisFunction/dbFunction');
const cors = require('cors');
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(routes);


sequelize.authenticate().then(()=>{
    console.log("Database is connected");
}).catch(err=>console.log('authenticate failed', err));

(async ()=>{
    try {
        await sequelize.sync({force: false});
        console.log('Database synchronized');
    }catch(error){
        console.log('An error occurred while trying to sync the database: ', error);
    }
})();

app.listen(4001 , ()=>{
    console.log('server running on port 4001');
})