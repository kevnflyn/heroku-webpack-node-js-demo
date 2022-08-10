import React from 'react'

import { FilePdfOutlined } from '@ant-design/icons'

import Button from '../antd/Button'

// import { download } from '../../utils/download'
// import Icon from '../antd/Icon'
// import Button from './Button'

// Error message

// Access to fetch at 'https://ec.europa.eu/info/sites/info/files/economy-finance/c_2021_1361_commission_decision.pdf' from origin 'http://localhost:3000' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: Redirect is not allowed for a preflight request.

// Fix this way:

// https://stackoverflow.com/questions/43871637/no-access-control-allow-origin-header-is-present-on-the-requested-resource-whe

// const DownloadPdf = ({ link }) => (
//   <Button onClick={() => download(link)}>
//     {/* <Icon style={{ fontSize: '1.5em' }} component={FilePdfOutlined}/> */}
//     <FilePdfOutlined/>
//   </Button>
// )

// Temp Solution
const DownloadPdf = ({ link }) => {
  return (
    <Button
      disabled={!link}
      href={link}
      rel='noreferrer'
      target='_blank'
      type='ghost'
      size='small'
      icon={<FilePdfOutlined />}
    >
      PDF
    </Button>
  )
}

export default DownloadPdf
