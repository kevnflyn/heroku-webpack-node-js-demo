const { getHostname } = require('../serverUtils/getHostname')

const imagesUrl = `${getHostname('production')}/assets/images`

module.exports = email => `
  <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

  <html
    xmlns="http://www.w3.org/1999/xhtml"
    xmlns:o="urn:schemas-microsoft-com:office:office"
    xmlns:v="urn:schemas-microsoft-com:vml"
  >
    <head>
      <!--[if gte mso 9
        ]><xml
          ><o:OfficeDocumentSettings
            ><o:AllowPNG /><o:PixelsPerInch
              >96</o:PixelsPerInch
            ></o:OfficeDocumentSettings
          ></xml
        ><!
      [endif]-->
      <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
      <meta content="width=device-width" name="viewport" />
      <!--[if !mso]><!-->
      <meta content="IE=edge" http-equiv="X-UA-Compatible" />
      <!--<![endif]-->
      <title></title>
      <!--[if !mso]><!-->
      <link
        href="https://fonts.googleapis.com/css?family=Ubuntu"
        rel="stylesheet"
        type="text/css"
      />
      <link
        href="https://fonts.googleapis.com/css?family=Montserrat"
        rel="stylesheet"
        type="text/css"
      />
      <link
        href="https://fonts.googleapis.com/css?family=Lato"
        rel="stylesheet"
        type="text/css"
      />
      <link
        href="https://fonts.googleapis.com/css?family=Roboto"
        rel="stylesheet"
        type="text/css"
      />
      <!--<![endif]-->
      <style type="text/css">
        body {
          margin: 0;
          padding: 0;
        }

        table,
        td,
        tr {
          vertical-align: top;
          border-collapse: collapse;
        }

        * {
          line-height: inherit;
        }

        a[x-apple-data-detectors="true"] {
          color: inherit !important;
          text-decoration: none !important;
        }
      </style>
      <style id="media-query" type="text/css">
        @media (max-width: 660px) {
          .block-grid,
          .col {
            min-width: 320px !important;
            max-width: 100% !important;
            display: block !important;
          }

          .block-grid {
            width: 100% !important;
          }

          .col {
            width: 100% !important;
          }

          .col_cont {
            margin: 0 auto;
          }

          img.fullwidth,
          img.fullwidthOnMobile {
            max-width: 100% !important;
          }

          .no-stack .col {
            min-width: 0 !important;
            display: table-cell !important;
          }

          .no-stack.two-up .col {
            width: 50% !important;
          }

          .no-stack .col.num2 {
            width: 16.6% !important;
          }

          .no-stack .col.num3 {
            width: 25% !important;
          }

          .no-stack .col.num4 {
            width: 33% !important;
          }

          .no-stack .col.num5 {
            width: 41.6% !important;
          }

          .no-stack .col.num6 {
            width: 50% !important;
          }

          .no-stack .col.num7 {
            width: 58.3% !important;
          }

          .no-stack .col.num8 {
            width: 66.6% !important;
          }

          .no-stack .col.num9 {
            width: 75% !important;
          }

          .no-stack .col.num10 {
            width: 83.3% !important;
          }

          .video-block {
            max-width: none !important;
          }

          .mobile_hide {
            min-height: 0px;
            max-height: 0px;
            max-width: 0px;
            display: none;
            overflow: hidden;
            font-size: 0px;
          }

          .desktop_hide {
            display: block !important;
            max-height: none !important;
          }
        }
      </style>
      <style id="icon-media-query" type="text/css">
        @media (max-width: 660px) {
          .icons-inner {
            text-align: center;
          }

          .icons-inner td {
            margin: 0 auto;
          }
        }
      </style>
    </head>
    <body
      class="clean-body"
      style="
        margin: 0;
        padding: 0;
        -webkit-text-size-adjust: 100%;
        background-color: #f8f8f9;
      "
    >
      <!--[if IE]><div class="ie-browser"><![endif]-->
      <table
        bgcolor="#f8f8f9"
        cellpadding="0"
        cellspacing="0"
        class="nl-container"
        role="presentation"
        style="
          table-layout: fixed;
          vertical-align: top;
          min-width: 320px;
          border-spacing: 0;
          border-collapse: collapse;
          mso-table-lspace: 0pt;
          mso-table-rspace: 0pt;
          background-color: #f8f8f9;
          width: 100%;
        "
        valign="top"
        width="100%"
      >
        <tbody>
          <tr style="vertical-align: top" valign="top">
            <td style="word-break: break-word; vertical-align: top" valign="top">
              <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color:#f8f8f9"><![endif]-->
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
                    background-color: #541bf2;
                  "
                >
                  <div
                    style="
                      border-collapse: collapse;
                      display: table;
                      width: 100%;
                      background-color: #541bf2;
                    "
                  >
                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:640px"><tr class="layout-full-width" style="background-color:#541bf2"><![endif]-->
                    <!--[if (mso)|(IE)]><td align="center" width="640" style="background-color:#541bf2;width:640px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 20px; padding-left: 20px; padding-top:20px; padding-bottom:20px;"><![endif]-->
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
                            padding-top: 20px;
                            padding-bottom: 20px;
                            padding-right: 20px;
                            padding-left: 20px;
                          "
                        >
                          <!--<![endif]-->
                          <div
                            align="center"
                            class="img-container center fixedwidth"
                            style="padding-right: 0px; padding-left: 0px"
                          >
                            <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px"><td style="padding-right: 0px;padding-left: 0px;" align="center"><!
                            [endif]--><img
                              align="center"
                              border="0"
                              class="center fixedwidth"
                              src="${imagesUrl}/brand-original.png"
                              style="
                                text-decoration: none;
                                -ms-interpolation-mode: bicubic;
                                height: auto;
                                border: 0;
                                width: 100%;
                                max-width: 120px;
                                display: block;
                              "
                              width="120"
                            />
                            <!--[if mso]></td></tr></table><![endif]-->
                          </div>
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
              
              ${email}

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
                    background-color: #f4f5f7;
                  "
                >
                  <div
                    style="
                      border-collapse: collapse;
                      display: table;
                      width: 100%;
                      background-color: #f4f5f7;
                    "
                  >
                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:640px"><tr class="layout-full-width" style="background-color:#f4f5f7"><![endif]-->
                    <!--[if (mso)|(IE)]><td align="center" width="640" style="background-color:#f4f5f7;width:640px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:16px; padding-bottom:16px;"><![endif]-->
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
                            padding-top: 16px;
                            padding-bottom: 16px;
                            padding-right: 0px;
                            padding-left: 0px;
                          "
                        >
                          <!--<![endif]-->
                          <table
                            cellpadding="0"
                            cellspacing="0"
                            class="social_icons"
                            role="presentation"
                            style="
                              table-layout: fixed;
                              vertical-align: top;
                              border-spacing: 0;
                              border-collapse: collapse;
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                            "
                            valign="top"
                            width="100%"
                          >
                            <tbody>
                              <tr style="vertical-align: top" valign="top">
                                <td
                                  style="
                                    word-break: break-word;
                                    vertical-align: top;
                                    padding-top: 16px;
                                    padding-right: 10px;
                                    padding-bottom: 16px;
                                    padding-left: 10px;
                                  "
                                  valign="top"
                                >
                                  <table
                                    align="center"
                                    cellpadding="0"
                                    cellspacing="0"
                                    class="social_table"
                                    role="presentation"
                                    style="
                                      table-layout: fixed;
                                      vertical-align: top;
                                      border-spacing: 0;
                                      border-collapse: collapse;
                                      mso-table-tspace: 0;
                                      mso-table-rspace: 0;
                                      mso-table-bspace: 0;
                                      mso-table-lspace: 0;
                                    "
                                    valign="top"
                                  >
                                    <tbody>
                                      <tr
                                        align="center"
                                        style="
                                          vertical-align: top;
                                          display: inline-block;
                                          text-align: center;
                                        "
                                        valign="top"
                                      >
                                        <td
                                          style="
                                            word-break: break-word;
                                            vertical-align: top;
                                            padding-bottom: 0;
                                            padding-right: 10px;
                                            padding-left: 10px;
                                          "
                                          valign="top"
                                        >
                                          <a
                                            href="https://twitter.com/getphare?lang=en"
                                            target="_blank"
                                            ><img
                                              alt="Twitter"
                                              height="32"
                                              src="${imagesUrl}/social/twitter2x.png"
                                              style="
                                                text-decoration: none;
                                                -ms-interpolation-mode: bicubic;
                                                height: auto;
                                                border: 0;
                                                display: block;
                                              "
                                              title="Twitter"
                                              width="32"
                                          /></a>
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
              <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
            </td>
          </tr>
        </tbody>
      </table>
      <!--[if (IE)]></div><![endif]-->
    </body>
  </html>
`
