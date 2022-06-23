const express = require('express')
const mysql = require('mysql')
const app = express()

const port = 3000

const config = {
    user: 'root',
    password: 'root',
    host: 'db',
    database: 'mysql'
}

let connection = mysql.createConnection(config)

const SQL = `INSERT INTO people (name) VALUES ('João');`
connection.query(SQL)
connection.end()

function makeHTML(rows) {
    return `
        <html>
            <body>
                <br/>
                <h1>Full Cycle Rocks!</h1>
                <ul>
                    ${rows.map((item) => `<li><h2>${item.name}</h2></li>`).join('')}
                </ul>
            </body>
        </html>
        `
}

app.get('/', (req, res) => {
    connection = mysql.createConnection(config)
    connection.connect((err) => {
        connection.query("SELECT name FROM people", (err, result) => {
            if (err) res.send(makeHTML([]))
            else res.send(makeHTML(result))
          });
    })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
