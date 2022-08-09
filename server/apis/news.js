const { Client } = require('@elastic/elasticsearch')
const chalk = require('chalk')
const debug = require('debug')
const { body } = require('express-validator')

const cleanDatabase = require('../../db/cleanDatabase')
const defaultDatabase = require('../../db/defaultDatabase')
const toCamelCaseObjectList = require('../../db/toCamelCaseObjectList')
const auth = require('../middleware/auth')
const internalAuth = require('../middleware/internalAuth')
const newsMock = require('../mocks/responses/newsMock.json')

const debugNews = debug('news')

const getDefaultToPublishedDate = () => {
  const to = new Date()
  to.setHours(23, 59, 59, 999)
  return to.toISOString()
}

const translateJsDateToSql = date => (
  date
    .replace(/T/, ' ')
    .replace(/.[0-9]+Z/, '')
)

const localeNewsColumnsMap = locale => {
  const common = {
    id: 'id',
    published: 'published',
    author: 'author',
    corpus_orig: 'corpus_orig',
    link: 'link',
    source: 'source',
    country: 'country',
    pdf_link: 'pdf_link'
  }

  if (locale === 'fr') {
    return {
      ...common,
      header: 'header_french',
      summary: 'summary_french',
      tag_1: 'tag_fr1',
      tag_2: 'tag_fr2',
      tag_3: 'tag_fr3',
      tag_4: 'tag_fr4',
      tag_5: 'tag_fr5'
    }
  }

  if (locale === 'de') {
    return {
      ...common,
      header: 'header_german',
      summary: 'summary_german',
      tag_1: 'tag_de1',
      tag_2: 'tag_de2',
      tag_3: 'tag_de3',
      tag_4: 'tag_de4',
      tag_5: 'tag_de5'
    }
  }

  if (locale === 'en') {
    return {
      ...common,
      header: 'header_english',
      summary: 'summary_english',
      tag_1: 'tag_en1',
      tag_2: 'tag_en2',
      tag_3: 'tag_en3',
      tag_4: 'tag_en4',
      tag_5: 'tag_en5'
    }
  }

  return common
}

const createLocaleNewsResponseFromUnderscoreNames = (rows, localeColumns) => (
  rows.map(({
    id,
    published,
    author,
    // eslint-disable-next-line camelcase
    corpus_orig,
    link,
    source,
    country,
    // eslint-disable-next-line camelcase
    pdf_link,
    ...row
  }) => ({
    id,
    published,
    author,
    corpusOrig: corpus_orig,
    link,
    source,
    country,
    pdfLink: pdf_link,
    header: row[localeColumns.header],
    summary: row[localeColumns.summary],
    tag1: row[localeColumns.tag_1],
    tag2: row[localeColumns.tag_2],
    tag3: row[localeColumns.tag_3],
    tag4: row[localeColumns.tag_4],
    tag5: row[localeColumns.tag_5],
    documentWithWeights: row[localeColumns.document_with_weights]
  }))
)

const localeNewsColumnsMapCamelCased = locale => {
  const common = {
    id: 'id',
    published: 'published',
    author: 'author',
    corpusOrig: 'corpusOrig',
    link: 'link',
    source: 'source',
    country: 'country',
    pdfLink: 'pdfLink'
  }

  if (locale === 'fr') {
    return {
      ...common,
      header: 'headerFrench',
      summary: 'summaryFrench',
      tag1: 'tagFr1',
      tag2: 'tagFr2',
      tag3: 'tagFr3',
      tag4: 'tagFr4',
      tag5: 'tagFr5'
    }
  }

  if (locale === 'de') {
    return {
      ...common,
      header: 'headerGerman',
      summary: 'summaryGerman',
      tag1: 'tagDe1',
      tag2: 'tagDe2',
      tag3: 'tagDe3',
      tag4: 'tagDe4',
      tag5: 'tagDe5'
    }
  }

  if (locale === 'en') {
    return {
      ...common,
      header: 'headerEnglish',
      summary: 'summaryEnglish',
      tag1: 'tagEn1',
      tag2: 'tagEn2',
      tag3: 'tagEn3',
      tag4: 'tagEn4',
      tag5: 'tagEn5'
    }
  }

  return common
}

const createLocaleNewsResponseFromCamelCaseNames = (rows, localeColumns) => (
  rows.map(({
    id,
    published,
    author,
    // eslint-disable-next-line camelcase
    corpus_orig,
    link,
    source,
    country,
    // eslint-disable-next-line camelcase
    pdf_link,
    ...row
  }) => ({
    id,
    published,
    author,
    corpusOrig: corpus_orig,
    link,
    source,
    country,
    pdfLink: pdf_link,
    header: row[localeColumns.header],
    summary: row[localeColumns.summary],
    tag1: row[localeColumns.tag1],
    tag2: row[localeColumns.tag2],
    tag3: row[localeColumns.tag3],
    tag4: row[localeColumns.tag4],
    tag5: row[localeColumns.tag5],
    documentWithWeights: row[localeColumns.document_with_weights]
  }))
)

const localeNewsColumnsFormatted = locale => {
  return {
    dbNames: localeNewsColumnsMap(locale),
    jsNames: localeNewsColumnsMapCamelCased(locale)
  }
}

const elasticSearchClient = new Client({
  cloud: {
    id: 'Phare_replacement:ZXUtd2VzdC0xLmF3cy5mb3VuZC5pbyQzYTNlMWYwOTllZTc0OTA5OWI4ODYwMTQ4NDBkNmE3MyQxNGU2MmE5M2VmNTQ0NzM4YmVjYTk0N2UzYzczZTJmOA=='
  },
  auth: {
    apiKey: {
      id: '_xO0eH8BfpEc_J67DoEt',
      api_key: 'p2FAyzXwTIKC7Y7uRoJvvw'
    }
  }
})

const requestComplianceNews = async (req, res, next) => {
  if (req.query.mock) {
    res.send(
      toCamelCaseObjectList(newsMock)
    )
  } else {
    try {
      debugNews(chalk.green(`
        Unpack query params from request and retrieve columns names for
        locale-based columns.
      `))

      const {
        offset,
        size,
        fromPublishedDate = '1970-01-01T00:00:00.000Z',
        toPublishedDate = getDefaultToPublishedDate(),
        sources,
        countries,
        regulation,
        search,
        locale = 'en'
      } = req.query

      const { dbNames: localeColumns } = localeNewsColumnsFormatted(locale)

      debugNews(chalk.green('Construct ES query.'))

      const query = {
        bool: {
          must: [
            {
              range: {
                published: {
                  gte: translateJsDateToSql(fromPublishedDate),
                  lte: translateJsDateToSql(toPublishedDate)
                }
              }
            },

            sources && { match: { source: sources.join(' ') } },

            countries && { match: { country: countries.join(' ') } },

            regulation && {
              simple_query_string: {
                query: regulation.map(term => `"${term}"`).join(' | '),
                fields: [
                  localeColumns.header,
                  localeColumns.summary,
                  localeColumns.corpus_orig
                ]
              }
            }
          ].filter(query => query)
        }
      }

      if (search) {
        query.bool.must = [
          ...query.bool.must,
          // ToDo: improve the search results order
          // {
          //   match: {
          //     content: {
          //       query: search
          //     }
          //   }
          // },
          // {
          //   match: {
          //     content: {
          //       query: search,
          //       operator: 'and'
          //     }
          //   }
          // },
          // {
          //   match_phrase: {
          //     content: {
          //       query: search,
          //       boost: 2
          //     }
          //   }
          // }
          {
            multi_match: {
              query: search,
              fields: [
                localeColumns.header,
                localeColumns.summary,
                localeColumns.corpus_orig,
                localeColumns.tag_1,
                localeColumns.tag_2,
                localeColumns.tag_3,
                localeColumns.tag_4,
                localeColumns.tag_5
              ]
            }
          }
        ]
      }

      debugNews(chalk.green('Query DB ', JSON.stringify(query)))

      const {
        hits: {
          total: { value: count },
          hits: openSearchHits
        }
      } = await elasticSearchClient.search({
        index: 'clean_compliance',
        from: offset,
        size,
        sort: [{ published: { order: 'desc' } }],
        body: { query }
      })

      const rows = openSearchHits.map(({ _source }) => ({ ..._source }))

      debugNews(chalk.green('Return number of rows ', rows.length))

      res.send({
        news: createLocaleNewsResponseFromUnderscoreNames(rows, localeColumns),
        totalCount: parseInt(count)
      })
    } catch (error) {
      debugNews(chalk.red('Error, ', error))

      next(error)
    }
  }
}

const complianceNewsApiValidation = [
  body('offset').isNumeric().optional({ nullable: true }),
  body('size').isNumeric().optional({ nullable: true }),
  body('fromPublishedDate').isISO8601().optional({ nullable: true }),
  body('toPublishedDate').isISO8601().optional({ nullable: true }),
  body('sources').isArray().optional({ nullable: true }),
  body('countries').isArray().optional({ nullable: true })
]

module.exports = router => {
  router.route('/compliance/news')
    .get(
      ...complianceNewsApiValidation,
      auth,
      requestComplianceNews
    )

  router.route('/internal/compliance/news')
    .get(
      ...complianceNewsApiValidation,
      internalAuth,
      requestComplianceNews
    )

  router.route('/compliance/news/:id')
    .get(
      auth,
      async (req, res, next) => {
        debugNews(chalk.green('Regulation watches request received.'))

        const dbClean = await cleanDatabase.getClient()

        const dbDefault = await defaultDatabase.getClient()

        try {
          debugNews(chalk.green('Select regulation watches from DB.'))

          const { rows } = await cleanDatabase.query(`
            SELECT *
            FROM clean_compliance
            WHERE id = $1
          `, [
            req.params.id
          ])

          if (rows.length === 0) {
            return res.status(404)
          }

          debugNews(chalk.green('DB operation successful. Return rows.'))

          const { rows: [user] } = await defaultDatabase.query(`
            SELECT *
            FROM users
            WHERE email = $1
          `, [
            req.user.email
          ])

          const locale = user ? user.lang : 'en'

          const { jsNames: localeColumns } = localeNewsColumnsFormatted(locale)

          res.send(
            createLocaleNewsResponseFromCamelCaseNames(rows, localeColumns)[0]
          )
        } catch (error) {
          debugNews(chalk.red('Error selecting regulation watches.'))

          next(error)
        } finally {
          dbClean.release()
          dbDefault.release()
        }
      })

  return router
}
