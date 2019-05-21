'use strict';

const https = require('https');

const body = JSON.stringify({
    login: process.env.EMAIL,
    password: process.env.PASSWORD
})

const requestOptions = {
    host: "prod-api.sleepiq.sleepnumber.com",
    port: 443,
    path: "/rest/login",
    method: "PUT",
    headers: {
        'Content-Type': 'application/json',
        "Content-Length": Buffer.byteLength(body)
    }
}

exports.handler = async (event, context) => {

    // validate the query string secret
    if(event.queryStringParameters.secret != process.env.SECRET) {
        return await {
                statusCode: '403',
                body: "You are not permitted to access this resource"
            };
    }

    // make a http request to the endpoint to retrieve the data

    return await new Promise( (resolve, reject) => {

        const req = https.request( requestOptions, (res) => {
 
            const receivedCookies = res.headers["set-cookie"];

            // strip the cookie domain
            const sendCookies = receivedCookies.map( cookie =>
                
                cookie.split("; ").map( (item) => {
                    if(item.substr(0,"domain=".length).toLowerCase() == "domain=") {
                        return false;
                    } else {
                        return item;
                    }
                }).join("; ")
            )

            let parts = '';

            res.on('data', (chunk) => { parts += chunk; });
            res.on('end', () => {
                try {

                    const content = JSON.parse(parts);
        
                    resolve({
                        statusCode: '200',
                        body: JSON.stringify(content),
                        headers: {
                            "content-type": "application/json"
                        },
                        multiValueHeaders: {
                            "set-cookie": sendCookies
                        }
                    });

                } catch(err) {
                    reject({
                        statusCode: '500',
                        body: JSON.stringify(err)
                    })
                }              
            });
        });

        req.on('error', function(e) {
            console.log('problem with request: ' + e.message);
            reject(e.message)
        });

        req.end(body);
    })
};
