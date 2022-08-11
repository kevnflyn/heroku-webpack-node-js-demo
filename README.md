

## Installation

Use the package manager [pip](https://pip.pypa.io/en/stable/) to install foobar.

```bash
npm install
```

## Secret Key Generation

Use Node's bundled module for cryptotographic functionality to generate crypto codes:

https://nodejs.org/api/crypto.html

To enter node:

```bash
node
```

And to generate cryptographically strong pseudo-random data:

```
const crypto = require('crypto')
crypto.randomBytes(64).toString('hex')
```

## Website Server using Node Express framework

Package: https://expressjs.com/

Description: Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.

-- Route Paths --

Express uses https://www.npmjs.com/package/path-to-regexp for matching the route paths; see the path-to-regexp documentation for all the possibilities in defining route paths



## Cron Jobs

Package: https://www.npmjs.com/package/node-cron

To set the timing of the cron job use the cron sytax reprenting second minute hour day month year
e.g. * * 9 * * * (9am every day)
e.g. * * */1 * * * (once every hour)
e.g. * * * * January Sunday (in January on a sunday)

 # ┌────────────── second (optional)
 # │ ┌──────────── minute
 # │ │ ┌────────── hour
 # │ │ │ ┌──────── day of month
 # │ │ │ │ ┌────── month
 # │ │ │ │ │ ┌──── day of week
 # │ │ │ │ │ │
 # │ │ │ │ │ │
 # * * * * * *



## Cron Jobs

curl -XGET https://139.59.210.36:9200/clean_compliance/_search -H 'Content-Type: application/json' -d '{"query": { "multi_match": { "query": "Single resolution mechanism - Regulation (EU) No 806/2014", "fields": [ "header_english", "summary_english" ]}} }' -u 'admin:admin' -k
