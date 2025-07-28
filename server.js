const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, '/client')));

app.listen(process.env.PORT || 8000, () => {
    console.log(`Server is running on port: ${process.env.PORT ? process.env.PORT : 8000}`);
});
