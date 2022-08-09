const BaseEmail = require('./BaseEmail')

module.exports = (
  routeToWatch,
  regulationWatchName,
  regulationWatchId,
  regulationAlertTime,
  newsItems
) => {
  const previewNewsItems = newsItems.filter((value, index) => index <= 2)
  return BaseEmail(`
    <div style="background-color: transparent">
      <div
        class="block-grid"
        style="
          min-width: 320px;
          max-width: 640px;
          overflow-wrap: break-word;
          word-wrap: break-word;
          word-break: break-word;
          margin: 0 auto;
          background-color: #fff;
        "
      >
        <div
          style="
            border-collapse: collapse;
            display: table;
            width: 100%;
            background-color: #fff;
          "
        >
          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:640px"><tr class="layout-full-width" style="background-color:#fff"><![endif]-->
          <!--[if (mso)|(IE)]><td align="center" width="640" style="background-color:#fff;width:640px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:0px; padding-bottom:0px;"><![endif]-->
          <div
            class="col num12"
            style="
              min-width: 320px;
              max-width: 640px;
              display: table-cell;
              vertical-align: top;
              width: 640px;
            "
          >
            <div class="col_cont" style="width: 100% !important">
              <!--[if (!mso)&(!IE)]><!-->
              <div
                style="
                  border-top: 0px solid transparent;
                  border-left: 0px solid transparent;
                  border-bottom: 0px solid transparent;
                  border-right: 0px solid transparent;
                  padding-top: 0px;
                  padding-bottom: 0px;
                  padding-right: 0px;
                  padding-left: 0px;
                "
              >
                <!--<![endif]-->
                <table
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  class="divider"
                  role="presentation"
                  style="
                    table-layout: fixed;
                    vertical-align: top;
                    border-spacing: 0;
                    border-collapse: collapse;
                    mso-table-lspace: 0pt;
                    mso-table-rspace: 0pt;
                    min-width: 100%;
                    -ms-text-size-adjust: 100%;
                    -webkit-text-size-adjust: 100%;
                  "
                  valign="top"
                  width="100%"
                >
                  <tbody>
                    <tr style="vertical-align: top" valign="top">
                      <td
                        class="divider_inner"
                        style="
                          word-break: break-word;
                          vertical-align: top;
                          min-width: 100%;
                          -ms-text-size-adjust: 100%;
                          -webkit-text-size-adjust: 100%;
                          padding-top: 40px;
                          padding-right: 20px;
                          padding-bottom: 0px;
                          padding-left: 20px;
                        "
                        valign="top"
                      >
                        <table
                          align="center"
                          border="0"
                          cellpadding="0"
                          cellspacing="0"
                          class="divider_content"
                          role="presentation"
                          style="
                            table-layout: fixed;
                            vertical-align: top;
                            border-spacing: 0;
                            border-collapse: collapse;
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                            border-top: 0px solid #bbbbbb;
                            width: 100%;
                          "
                          valign="top"
                          width="100%"
                        >
                          <tbody>
                            <tr
                              style="vertical-align: top"
                              valign="top"
                            >
                              <td
                                style="
                                  word-break: break-word;
                                  vertical-align: top;
                                  -ms-text-size-adjust: 100%;
                                  -webkit-text-size-adjust: 100%;
                                "
                                valign="top"
                              >
                                <span></span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <!--[if (!mso)&(!IE)]><!-->
              </div>
              <!--<![endif]-->
            </div>
          </div>
          <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
          <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
        </div>
      </div>
    </div>
    <div style="background-color: transparent">
      <div
        class="block-grid"
        style="
          min-width: 320px;
          max-width: 640px;
          overflow-wrap: break-word;
          word-wrap: break-word;
          word-break: break-word;
          margin: 0 auto;
          background-color: #fff;
        "
      >
        <div
          style="
            border-collapse: collapse;
            display: table;
            width: 100%;
            background-color: #fff;
          "
        >
          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:640px"><tr class="layout-full-width" style="background-color:#fff"><![endif]-->
          <!--[if (mso)|(IE)]><td align="center" width="640" style="background-color:#fff;width:640px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:0px; padding-bottom:0px;"><![endif]-->
          <div
            class="col num12"
            style="
              min-width: 320px;
              max-width: 640px;
              display: table-cell;
              vertical-align: top;
              width: 640px;
            "
          >
            <div class="col_cont" style="width: 100% !important">
              <!--[if (!mso)&(!IE)]><!-->
              <div
                style="
                  border-top: 0px solid transparent;
                  border-left: 0px solid transparent;
                  border-bottom: 0px solid transparent;
                  border-right: 0px solid transparent;
                  padding-top: 0px;
                  padding-bottom: 0px;
                  padding-right: 0px;
                  padding-left: 0px;
                "
              >
                <!--<![endif]-->
                <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 40px; padding-left: 40px; padding-top: 8px; padding-bottom: 8px; font-family: Tahoma, Verdana, sans-serif"><![endif]-->
                <div
                  style="
                    color: #555555;
                    font-family: 'Ubuntu', Tahoma, Verdana, Segoe,
                      sans-serif;
                    line-height: 1.2;
                    padding-top: 8px;
                    padding-right: 40px;
                    padding-bottom: 8px;
                    padding-left: 40px;
                  "
                >
                  <div
                    class="txtTinyMce-wrapper"
                    style="
                      line-height: 1.2;
                      font-size: 12px;
                      font-family: 'Ubuntu', Tahoma, Verdana, Segoe,
                        sans-serif;
                      color: #555555;
                      mso-line-height-alt: 14px;
                    "
                  >
                    <p
                      style="
                        margin: 0;
                        margin-bottom: 32px;
                        font-size: 38px;
                        line-height: 1.2;
                        word-break: break-word;
                        text-align: center;
                        font-family: Ubuntu, Tahoma, Verdana, Segoe,
                          sans-serif;
                        mso-line-height-alt: 46px;
                      "
                    >
                      <span
                        ><strong
                          ><span style="color: #000000"
                            ><span
                              >${regulationWatchName}</span
                            ></span
                          ></strong
                        ></span
                      >
                    </p>

                    <p
                      style="
                        margin: 0;
                        margin-bottom: 8px;
                        line-height: 1.2;
                        word-break: break-word;
                        text-align: center;
                        font-family: Ubuntu, Tahoma, Verdana, Segoe,
                          sans-serif;
                        mso-line-height-alt: 24px;
                      "
                    >
                      <span style="font-size: 18px; color: #000000;"
                        ><span
                         >Compliance alerts at ${regulationAlertTime}.
                        </span
                        >
                    </p>

                    <p
                      style="
                        margin: 0;
                        margin-bottom: 16px;
                        line-height: 1.2;
                        word-break: break-word;
                        text-align: center;
                        font-family: Ubuntu, Tahoma, Verdana, Segoe,
                          sans-serif;
                        mso-line-height-alt: 24px;
                      "
                    >
                      <span style="font-size: 18px; color: #000000;"
                        >
                        <span
                        >You have a total of <b>${newsItems.length} new
                          articles</b> to read.</span
                        ></span
                      >
                    </p>
                  </div>
                </div>
                <!--[if mso]></td></tr></table><![endif]-->
                <table
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  class="divider"
                  role="presentation"
                  style="
                    table-layout: fixed;
                    vertical-align: top;
                    border-spacing: 0;
                    border-collapse: collapse;
                    mso-table-lspace: 0pt;
                    mso-table-rspace: 0pt;
                    min-width: 100%;
                    -ms-text-size-adjust: 100%;
                    -webkit-text-size-adjust: 100%;
                  "
                  valign="top"
                  width="100%"
                >
                  <tbody>
                    <tr style="vertical-align: top" valign="top">
                      <td
                        class="divider_inner"
                        style="
                          word-break: break-word;
                          vertical-align: top;
                          min-width: 100%;
                          -ms-text-size-adjust: 100%;
                          -webkit-text-size-adjust: 100%;
                          padding-top: 32px;
                          padding-right: 0px;
                          padding-bottom: 0px;
                          padding-left: 0px;
                        "
                        valign="top"
                      >
                        <table
                          align="center"
                          border="0"
                          cellpadding="0"
                          cellspacing="0"
                          class="divider_content"
                          role="presentation"
                          style="
                            table-layout: fixed;
                            vertical-align: top;
                            border-spacing: 0;
                            border-collapse: collapse;
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                            border-top: 0px solid #bbbbbb;
                            width: 100%;
                          "
                          valign="top"
                          width="100%"
                        >
                          <tbody>
                            <tr
                              style="vertical-align: top"
                              valign="top"
                            >
                              <td
                                style="
                                  word-break: break-word;
                                  vertical-align: top;
                                  -ms-text-size-adjust: 100%;
                                  -webkit-text-size-adjust: 100%;
                                "
                                valign="top"
                              >
                                <span></span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 40px; padding-left: 40px; padding-top: 16px; padding-bottom: 16px; font-family: Arial, sans-serif"><![endif]-->
                ${previewNewsItems.map(({
                  id,
                  header,
                  published,
                  country,
                  source,
                  tag1,
                  tag2,
                  tag3,
                  tag4,
                  tag5
                }) => {
                  const tags = [
                    tag1,
                    tag2,
                    tag3,
                    tag4,
                    tag5
                  ].filter(tag => typeof tag === 'string')
                  return (`
                    <div
                        style="
                        color: #555555;
                        font-family: Arial, 'Helvetica Neue', Helvetica,
                            sans-serif;
                        line-height: 1.5;
                        padding-top: 16px;
                        padding-right: 40px;
                        padding-bottom: 16px;
                        padding-left: 40px;
                        border-bottom: 1px solid #eee;
                      "
                    >
                        <div
                        class="txtTinyMce-wrapper"
                        style="
                            line-height: 1.5;
                            font-size: 12px;
                            color: #555555;
                            font-family: Arial, 'Helvetica Neue', Helvetica,
                            sans-serif;
                            mso-line-height-alt: 18px;
                        "
                        >
                        <p
                            style="
                            margin: 0;
                            font-size: 21px;
                            line-height: 1.5;
                            word-break: break-word;
                            text-align: left;
                            mso-line-height-alt: 23px;
                            margin-top: 0;
                            margin-bottom: 0;
                            "
                        >
                          <a
                            href="${routeToWatch}?viewArticle=${id}#${regulationWatchId}"
                            target="_blank"
                          >
                            <span style="text-transform: capitalize; font-size: 21px; color: #333300"
                            >${header}</span
                            >
                          </a>
                        </p>
                        <p
                            style="
                            margin: 0;
                            font-size: 14px;
                            line-height: 1.5;
                            word-break: break-word;
                            text-align: left;
                            mso-line-height-alt: 21px;
                            margin-top: 16px;
                            "
                        >
                          <span></span>
                        </p>
                        
                        <p
                          style="
                            margin: 0;
                            font-size: 12px;
                            line-height: 1.5;
                            word-break: break-word;
                            text-align: left;
                            mso-line-height-alt: 21px;
                            margin-top: 0;
                            padding-bottom: 8px;
                          "
                        >
                          <span>
                            ${(new Date(published)).toLocaleDateString(undefined,
                              { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }
                            )}
                          </span>
                          <span>&middot;</span>
                          <span>${source}</span>
                          <span>&middot;</span>
                          <span>${country}</span>
                        </p>

                        ${tags.length !== 0
                          ? `
                          <p
                            style="
                              margin: 0;
                              font-size: 12px;
                              line-height: 1.5;
                              word-break: break-word;
                              text-align: left;
                              mso-line-height-alt: 21px;
                              margin-top: 0;
                              padding-bottom: 16px;
                            "
                          >
                              <span style="color: #ffffff">
                                  <div>
                                    ${tags.map(tag => (`
                                      <span style="color: #ffffff">
                                          <span style="font-size: 15px">
                                              <div style="
                                                  -webkit-text-size-adjust: none;
                                                  text-decoration: none;
                                                  display: inline-block;
                                                  color: #ffffff;
                                                  background-color: #afcea7;
                                                  border-radius: 2px;
                                                  -webkit-border-radius: 2px;
                                                  -moz-border-radius: 2px;
                                                  width: auto;
                                                  width: auto;
                                                  font-family: Montserrat, Trebuchet MS,
                                                      Lucida Grande, Lucida Sans Unicode, Lucida Sans,
                                                      Tahoma, sans-serif;
                                                  text-align: center;
                                                  mso-border-alt: none;
                                                  word-break: keep-all;
                                                  margin-bottom: 8px;
                                                ">
                                                  <span style="
                                                      padding-left: 8px;
                                                      padding-right: 8px;
                                                      padding-bottom: 0;
                                                      font-size: 12px;
                                                      display: inline-block;
                                                      letter-spacing: undefined;
                                                  ">
                                                      <span
                                                          style="
                                                          font-size: 12px;
                                                          margin: 0;
                                                          line-height: 2;
                                                          word-break: break-word;
                                                          mso-line-height-alt: 32px;
                                                          "
                                                          ><strong>${tag}</strong>
                                                      </span>
                                                  </span>
                                              </div>
                                          </span>
                                      </span>
                                  `)).join(' ')}
                                    <p
                                        style="
                                        margin: 0;
                                        font-size: 14px;
                                        line-height: 1.5;
                                        word-break: break-word;
                                        text-align: left;
                                        mso-line-height-alt: 21px;
                                        margin-top: 0;
                                        margin-bottom: 0;
                                        "
                                    >

                                    </p>
                                  </div>
                              </span>
                          </p>
                          <p
                            style="
                            margin: 0;
                            font-size: 14px;
                            line-height: 1.5;
                            word-break: break-word;
                            text-align: left;
                            mso-line-height-alt: 21px;
                            margin-top: 16px;
                            "
                          >
                            <span></span>
                          </p>
                        `
                        : ''}
                      </div>
                    </div>
                    <!--[if mso]></td></tr></table><![endif]-->

                    <table
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        class="divider"
                        role="presentation"
                        style="
                        table-layout: fixed;
                        vertical-align: top;
                        border-spacing: 0;
                        border-collapse: collapse;
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        min-width: 100%;
                        -ms-text-size-adjust: 100%;
                        -webkit-text-size-adjust: 100%;
                        "
                        valign="top"
                        width="100%"
                    >
                        <tbody>
                        <tr style="vertical-align: top" valign="top">
                            <td
                            class="divider_inner"
                            style="
                                word-break: break-word;
                                vertical-align: top;
                                min-width: 100%;
                                -ms-text-size-adjust: 100%;
                                -webkit-text-size-adjust: 100%;
                                padding-top: 8px;
                                padding-right: 10px;
                                padding-bottom: 8px;
                                padding-left: 10px;
                            "
                            valign="top"
                            >
                            <table
                                align="center"
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                class="divider_content"
                                role="presentation"
                                style="
                                table-layout: fixed;
                                vertical-align: top;
                                border-spacing: 0;
                                border-collapse: collapse;
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                border-top: 0px solid #bbbbbb;
                                width: 100%;
                                "
                                valign="top"
                                width="100%"
                            >
                                <tbody>
                                <tr
                                    style="vertical-align: top"
                                    valign="top"
                                >
                                    <td
                                    style="
                                        word-break: break-word;
                                        vertical-align: top;
                                        -ms-text-size-adjust: 100%;
                                        -webkit-text-size-adjust: 100%;
                                    "
                                    valign="top"
                                    >
                                    <span></span>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                `)
              }).join(' ')}
                <div
                  align="center"
                  class="button-container"
                  style="
                    padding-top: 16px;
                    padding-right: 40px;
                    padding-bottom: 16px;
                    padding-left: 40px;
                  "
                >
                  <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-spacing: 0; border-collapse: collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;"><tr><td style="padding-top: 16px; padding-right: 40px; padding-bottom: 16px; padding-left: 40px" align="center"><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${routeToWatch}" style="height:48pt;width:189.75pt;v-text-anchor:middle;" arcsize="4%" stroke="false" fillcolor="#541bf2"><w:anchorlock/><v:textbox inset="0,0,0,0"><center style="color:#ffffff; font-family:Tahoma, sans-serif; font-size:16px"><!
                  [endif]--><a
                    href="${routeToWatch}"
                    style="
                      -webkit-text-size-adjust: none;
                      text-decoration: none;
                      display: inline-block;
                      color: #ffffff;
                      background-color: #541bf2;
                      border-radius: 2px;
                      -webkit-border-radius: 2px;
                      -moz-border-radius: 2px;
                      width: auto;
                      width: auto;
                      border-top: 1px solid #541bf2;
                      border-right: 1px solid #541bf2;
                      border-bottom: 1px solid #541bf2;
                      border-left: 1px solid #541bf2;
                      padding-top: 12px;
                      padding-bottom: 12px;
                      font-family: Montserrat, Trebuchet MS,
                        Lucida Grande, Lucida Sans Unicode, Lucida Sans,
                        Tahoma, sans-serif;
                      text-align: center;
                      mso-border-alt: none;
                      word-break: keep-all;
                    "
                    target="_blank"
                    ><span
                      style="
                        padding-left: 15px;
                        padding-right: 15px;
                        font-size: 16px;
                        display: inline-block;
                        letter-spacing: undefined;
                      "
                      ><span
                        style="
                          font-size: 16px;
                          margin: 0;
                          line-height: 2;
                          word-break: break-word;
                          mso-line-height-alt: 32px;
                        "
                        ><strong>Read it all</strong></span
                      ></span
                    ></a
                  >
                  <!--[if mso]></center></v:textbox></v:roundrect></td></tr></table><![endif]-->
                </div>
                <table
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  class="divider"
                  role="presentation"
                  style="
                    table-layout: fixed;
                    vertical-align: top;
                    border-spacing: 0;
                    border-collapse: collapse;
                    mso-table-lspace: 0pt;
                    mso-table-rspace: 0pt;
                    min-width: 100%;
                    -ms-text-size-adjust: 100%;
                    -webkit-text-size-adjust: 100%;
                  "
                  valign="top"
                  width="100%"
                >
                  <tbody>
                    <tr style="vertical-align: top" valign="top">
                      <td
                        class="divider_inner"
                        style="
                          word-break: break-word;
                          vertical-align: top;
                          min-width: 100%;
                          -ms-text-size-adjust: 100%;
                          -webkit-text-size-adjust: 100%;
                          padding-top: 8px;
                          padding-right: 10px;
                          padding-bottom: 8px;
                          padding-left: 10px;
                        "
                        valign="top"
                      >
                        <table
                          align="center"
                          border="0"
                          cellpadding="0"
                          cellspacing="0"
                          class="divider_content"
                          role="presentation"
                          style="
                            table-layout: fixed;
                            vertical-align: top;
                            border-spacing: 0;
                            border-collapse: collapse;
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                            border-top: 0px solid #bbbbbb;
                            width: 100%;
                          "
                          valign="top"
                          width="100%"
                        >
                          <tbody>
                            <tr
                              style="vertical-align: top"
                              valign="top"
                            >
                              <td
                                style="
                                  word-break: break-word;
                                  vertical-align: top;
                                  -ms-text-size-adjust: 100%;
                                  -webkit-text-size-adjust: 100%;
                                "
                                valign="top"
                              >
                                <span></span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 40px; padding-left: 40px; padding-top: 16px; padding-bottom: 16px; font-family: Arial, sans-serif"><![endif]-->
                <div
                  style="
                    color: #555555;
                    font-family: Arial, 'Helvetica Neue', Helvetica,
                      sans-serif;
                    line-height: 1.5;
                    padding-top: 16px;
                    padding-right: 40px;
                    padding-bottom: 16px;
                    padding-left: 40px;
                  "
                >
                  <div
                    class="txtTinyMce-wrapper"
                    style="
                      font-size: 12px;
                      line-height: 1.5;
                      font-family: Arial, 'Helvetica Neue', Helvetica,
                        sans-serif;
                      color: #555555;
                      mso-line-height-alt: 18px;
                    "
                  >
                    <p
                      style="
                        margin: 0;
                        font-size: 15px;
                        line-height: 1.5;
                        word-break: break-word;
                        text-align: center;
                        font-family: Arial, 'Helvetica Neue', Helvetica,
                          sans-serif;
                        mso-line-height-alt: 23px;
                        margin-top: 0;
                        margin-bottom: 0;
                      "
                    >
                      <span style="font-size: 15px"
                        ><strong>Need help?</strong></span
                      >
                    </p>
                    <p
                      style="
                        margin: 0;
                        font-size: 12px;
                        text-align: center;
                        line-height: 1.5;
                        word-break: break-word;
                        font-family: Arial, 'Helvetica Neue', Helvetica,
                          sans-serif;
                        mso-line-height-alt: 18px;
                        margin-top: 0;
                        margin-bottom: 0;
                      "
                    >
                       
                    </p>
                    <p
                      style="
                        margin: 0;
                        font-size: 12px;
                        line-height: 1.5;
                        word-break: break-word;
                        text-align: center;
                        font-family: Arial, 'Helvetica Neue', Helvetica,
                          sans-serif;
                        mso-line-height-alt: 18px;
                        margin-top: 0;
                        margin-bottom: 0;
                      "
                    >
                      Contact us at techteam@getphare.com
                    </p>
                    <p
                      style="
                        margin: 0;
                        font-size: 12px;
                        text-align: center;
                        line-height: 1.5;
                        word-break: break-word;
                        font-family: Arial, 'Helvetica Neue', Helvetica,
                          sans-serif;
                        mso-line-height-alt: 18px;
                        margin-top: 0;
                        margin-bottom: 0;
                      "
                    >
                       
                    </p>
                  </div>
                </div>
                <!--[if mso]></td></tr></table><![endif]-->
                <!--[if (!mso)&(!IE)]><!-->
              </div>
              <!--<![endif]-->
            </div>
          </div>
          <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
          <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
        </div>
      </div>
    </div>           
  `)
}
