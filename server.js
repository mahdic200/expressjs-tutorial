// The address of this server connected to the network is :
// URL -> http://localhost:8383
// 127.0.0.1:8383
const express = require('express');
const app = express();
const PORT = 8383;

app.use(express.json())

// HTTP VERBS && Routes (or paths)
// The method informs the nature of request and the route is a further subdirectory (basically we direct the request to the body of code to respond appropriately, and these locations or routes are called endpoints)
app.get('/', (req, res) => {
    console.log(req.method)
    res.send({
        message: "kos nanat",
        data: {
            id: 1,
            name: "hassan",
        },
    })
});

app.listen(PORT, () => {
    console.log(`Server has started on: ${PORT}`);
});

