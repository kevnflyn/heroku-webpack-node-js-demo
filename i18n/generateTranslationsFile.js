const fs = require('fs')

const fetch = require('node-fetch')

const langs = ['de', 'fr']

const getFileLocation = locale => `./assets/translations/${locale}/translation.json`
// const getFileLocation = locale => `./assets/translations/${locale}/countries.json`
// const getFileLocation = locale => `./assets/translations/${locale}/sources.json`

const readTranslationSourceFile = (callback) => (
  fs.readFile(getFileLocation('en'), (error, buffer) => {
    if (error) {
      console.log('An error occured while reading the translation source file: ', error)
    }

    console.log('Read file succesfully translation source. ', 'Convert buffer to JSON.')

    callback(JSON.parse(buffer.toString()))
  })
)

readTranslationSourceFile(source => {
  langs.forEach(locale => {
    console.log('Read file for ', locale)
    fs.readFile(getFileLocation(locale), (error, buffer) => {
      if (error) {
        console.log('An error occured while reading JSON file: ', error)
      }

      console.log('Read file succesfully. ', 'Convert buffer to JSON.')

      const extractions = JSON.parse(buffer.toString())

      const untranslatedText = Object
        .keys(extractions)
        .filter(key => !extractions[key])

      if (untranslatedText.length > 0) {
        const unmadeRequests = untranslatedText.map(key => {
          const endpoint = 'https://api.deepl.com/v2/translate'
          const authKey = 'auth_key=c7c70873-924b-ee70-e9cd-b268f95bf521'
          const sourceLang = 'source_lang=en'
          const targetLang = `target_lang=${locale}`
          const formality = 'more'
          const text = `text=${source[key]}`
          const url = `${endpoint}?${authKey}&${sourceLang}&${targetLang}&${formality}&${text}`
          return () => new Promise((resolve, reject) => {
            console.log(`Request made to ${url}`)
            fetch(url)
              .then(response => response.json())
              .then(({
                translations: [{
                  text
                }]
              }) => {
                resolve({
                  [key]: text
                })
              })
              .catch(reject)
          })
        })

        new Promise((resolve, reject) => {
          let i = 0
          let currentRequest = null
          const finishedRequests = []
          const interval = setInterval(() => {
            console.log('finishedRequests.length, ', finishedRequests.length)
            console.log('unmadeRequests.length, ', unmadeRequests.length)
            if (!currentRequest && i < unmadeRequests.length) {
              currentRequest = unmadeRequests[i]()
                .then(response => {
                  finishedRequests.push(response)
                  i++
                  currentRequest = null
                })
                .catch(err => {
                  clearInterval(interval)
                  reject(err)
                })
            }
            if (finishedRequests.length === unmadeRequests.length) {
              clearInterval(interval)
              resolve(finishedRequests)
            }
          }, 1000)
        }).then(thirdPartyTranslations => {
          console.log('Successfully received translations from service provider: ', thirdPartyTranslations)

          const newTranslationsMap = thirdPartyTranslations
            .reduce((translationMap, translation) => ({
              ...translationMap,
              ...translation
            }), {})

          const origAndNewTranslationsMap = {
            ...extractions,
            ...newTranslationsMap
          }

          fs.writeFile(
            getFileLocation(locale),
            JSON.stringify(origAndNewTranslationsMap, null, '\t'),
            'utf8',
            err => {
              if (err) {
                console.log('An error occured while writing JSON Object to File.')
                return console.log(err)
              }

              console.log(`JSON for ${locale} file has been saved.`)
            }
          )
        })
      }
    })
  })
})
