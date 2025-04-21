import * as dotenv from "dotenv";
dotenv.config();

import app from './server'
const port = 3000

app.listen(port, () => console.log(`Example app listening on port http://localhost:${port}`))