const express = require("express"); 
const morgan = require("morgan"); 
const cors = require("cors"); 
const { NotFoundError, BadRequestError } = require("./utils/errors")
const AuthorizationRoutes = require("./routes/auth")

const { PORT } = require("./config"); 
 
const app = express(); 

app.use(express.json()); 

app.use(morgan("tiny")); 

app.use((req, res ,next) => {
    return next(new NotFoundError()); 
}); 

app.use((err, req, res, next) => {
    const status = err.status || 500; 
    const message = err.message; 

    return res.status(200).json({
        error: {message, status}
    })
}); 

app.listen(PORT, () => {
    console.log(`🚀  Server running on: http://localhost:${PORT}`)
})