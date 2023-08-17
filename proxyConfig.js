// this file contains configurations for dev proxy
module.exports = {
    "/rest": {
        target: "https://dev.mapstore.geo-solutions.it/mapstore",
        secure: false,
        headers: {
            host: "dev.mapstore.geo-solutions.it",
        },
    },
    "/pdf": {
        target: "https://dev.mapstore.geo-solutions.it/mapstore",
        secure: false,
        headers: {
            host: "dev.mapstore.geo-solutions.it",
        },
    },
    "/mapstore/pdf": {
        target: "https://dev.mapstore.geo-solutions.it",
        secure: false,
        headers: {
            host: "dev.mapstore.geo-solutions.it",
        },
    },
    "/proxy": {
        target: "localhost/",
        secure: false,
        headers: {
            host: "http://localhost:8082",
        },
    },
    "/files": {
        target: "http://localhost:8081",
        secure: false,
        headers: {
            host: "http://localhost:8082",
        },
    },
};
