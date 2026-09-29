require("dotenv").config();

const connectDB = require("./config/db");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const contactRoutes = require("./routes/contactRoutes");


const app = express();
connectDB();

/* PORT */

const PORT =
    process.env.PORT || 5000;


/* SECURITY */

app.use(
    helmet()
);


/* CORS */

app.use(
    cors({
        origin: true,
        methods: [
            "GET",
            "POST",
            "DELETE"
        ],
        allowedHeaders: [
            "Content-Type"
        ]
    })
);


/* JSON */

app.use(
    express.json({
        limit: "10kb"
    })
);


/* URL ENCODED */

app.use(
    express.urlencoded({
        extended: true,
        limit: "10kb"
    })
);


/* RATE LIMIT */

const contactLimiter =
    rateLimit({

        windowMs: 15 * 60 * 1000,

        max: 10,

        message: {
            success: false,
            message:
                "Too many requests. Please try again later."
        }

    });


/* HOME ROUTE */

app.get(
    "/",
    (req, res) => {

        res.json({

            success: true,

            message:
                "Jayakavitha Portfolio Backend API is running.",

            version: "1.0.0"

        });

    }
);


/* HEALTH CHECK */

app.get(
    "/api/health",
    (req, res) => {

        res.json({

            success: true,

            status: "healthy",

            timestamp:
                new Date().toISOString()

        });

    }
);


/* CONTACT API */

app.use(
    "/api/contact",
    contactLimiter,
    contactRoutes
);


/* 404 */

app.use(
    (req, res) => {

        res.status(404).json({

            success: false,

            message:
                "API endpoint not found."

        });

    }
);


/* ERROR HANDLER */

app.use(
    (error, req, res, next) => {

        console.error(error);

        res.status(500).json({

            success: false,

            message:
                "Internal server error."

        });

    }
);


/* START SERVER */

app.listen(
    PORT,
    () => {

        console.log(
            `Backend server running on http://localhost:${PORT}`
        );

    }
);