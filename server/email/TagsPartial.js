module.exports = (
  tag1,
  tag2,
  tag3,
  tag4,
  tag5
) => {
  const tags = [
    tag1,
    tag2,
    tag3,
    tag4,
    tag5
  ].filter(tag => typeof tag === 'string')

  return (
    tags.length !== 0
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
      : ''
  )
}
