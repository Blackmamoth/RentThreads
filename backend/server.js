require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { connectDB } = require("./config/db.config");
const PORT = process.env.PORT || 5000;

const app = express();

connectDB();
app.use(cors());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/tl/auth", require("./routes/TL/tlAuth/tlAuth.route"));
app.use("/tl/clothes", require("./routes/TL/crud/tlInventory"));
app.use("/renter/auth", require("./routes/renter/auth/renterAuth.route"));
app.use("/renter/clothes", require("./routes/renter/rent/rent.route"));

app.listen(PORT, () => console.log(`Application running on port ${PORT}`));
