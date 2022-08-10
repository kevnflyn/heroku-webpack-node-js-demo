const base = '/api'

export const loginApi = `${base}/login`
export const logoutApi = `${base}/logout`
export const newsReadApi = `${base}/compliance/read`
export const newsApi = `${base}/compliance/news`
export const newsArticleApi = newsId => `${base}/compliance/news/${newsId}`
export const newsLetterApi = `${base}/newsletter`
export const passwordResetApi = `${base}/password-reset`
export const passwordResetRequestApi = `${base}/request-password-reset`
export const passwordResetValidateApi = `${base}/password-reset-request/validate`
export const pinnedArticlesApi = `${base}/compliance/pinned-articles`
export const registerApi = `${base}/register`
export const registerConfirmApi = `${base}/register/confirm`
export const regulationWatchApi = `${base}/compliance/watch`
export const regulationWatchArticleApi = regulationWatchId => `${regulationWatchApi}/${regulationWatchId}`
export const regulationWatchDailyAlertTimesApi = regulationWatchId => `${regulationWatchApi}/${regulationWatchId}/daily-alert-times`
export const regulationWatchHasAlertsEnabledApi = regulationWatchId => `${regulationWatchApi}/${regulationWatchId}/has-alerts-enabled`
export const regulationWatchNameApi = regulationWatchId => `${regulationWatchApi}/${regulationWatchId}/name`
export const regulationWatchStarredRegulationsApi = regulationWatchId => `${regulationWatchArticleApi(regulationWatchId)}/regulations/starred`
export const sessionUserApi = `${base}/sessionuser`
export const userAlertsApi = `${base}/user/alerts`
export const userApi = `${base}/user`
export const userCompanyApi = `${base}/user/company`
export const userLocaleApi = `${base}/user/locale`
