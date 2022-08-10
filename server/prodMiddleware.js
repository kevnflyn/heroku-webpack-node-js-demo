const fs = require('fs')
const path = require('path')

const express = require('express')

// const commonMiddlware = require('./commonMiddleware.js')

const PORT = process.env.PORT || 3000

module.exports = app => {
  // the __dirname is the current directory from where the script is // running
  app.use(express.static(path.resolve(__dirname,  '..'))); 

  // commonMiddlware(app)

  // send the user to index html page inspite of the url
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'index.html'));
  }); 

  // app.get('*', (req, res) => {
  //   console.log(`
  //     sendFile to ${path.resolve('.', 'dist', 'index.html')}
  //   `)

  //   app.use(express.static('.')) 
  //   res.sendFile(path.resolve('.', 'dist', 'index.html'))
  // })

  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`)

    setInterval(() => {
      const used = process.memoryUsage().heapUsed / 1024 / 1024
      console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`)
    }, 1000)
  })
}
