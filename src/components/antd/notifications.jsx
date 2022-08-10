import notification from 'antd/es/notification'
import './notifications.less'

export const NotificationSuccess = ({
  message,
  description
}) => {
  notification.success({
    message,
    description
  })
}

export const NotificationError = ({
  message,
  description
}) => {
  notification.error({
    message,
    description
  })
}

export const NotificationInfo = ({
  message,
  description
}) => {
  notification.info({
    message,
    description
  })
}

export const NotificationWarning = ({
  message,
  description
}) => {
  notification.warning({
    message,
    description
  })
}
