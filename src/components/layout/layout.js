/**
 * Column Layouts
 *
 * Naming reflects the max number of columns layed out in a row
 */

/** Max one column per row */
export const xsColSingle = { span: 24, offset: 0 }
export const smColSingle = { span: 18, offset: 3 }
export const mdColSingle = { span: 16, offset: 4 }
export const lgColSingle = { span: 14, offset: 5 }

/** Max two columns per row */
export const xsColInTwos = xsColSingle
export const smColInTwos = smColSingle
export const mdColInTwos = mdColSingle
export const lgColInTwos = { span: 12, offset: 0 }

/** Max two columns per row */
export const xsColOneThird = xsColSingle
export const smColOneThird = smColSingle
export const mdColOneThird = mdColSingle
export const lgColOneThird = { span: 8, offset: 0 }

/** Max two columns per row */
export const xsColTwoThirds = xsColSingle
export const smColTwoThirds = smColSingle
export const mdColTwoThirds = mdColSingle
export const lgColTwoThirds = { span: 16, offset: 0 }
