import React, { useEffect } from 'react';
import { Close } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import { useSnackbar } from 'notistack';
import notificationService, { NotificationService } from '@/global/Notification.service';

const Notifier = () => {
  const notifications: NotificationService = notificationService;
  let displayed: string[] = [];

  const { enqueueSnackbar } = useSnackbar();

  const displayedNotifications = (key: string) => {
    displayed = [...displayed, key];
  };

  useEffect(() => {
    const { notifications: _notifications } = notifications;
    console.log(_notifications);
    _notifications.forEach((notification) => {
      if (displayed.includes(notification.key)) return;

      enqueueSnackbar(notification.message, {
        key: notification.key,
        variant: notification.variant,
        autoHideDuration: 59 * 1000,
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        action: (key: string) => notificationAction(key),
      });

      displayedNotifications(notification.key);
    });
  }, [notifications, enqueueSnackbar]);

  return null;
};

function notificationAction(key: string) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { closeSnackbar } = useSnackbar();

  const onClick = () => {
    closeSnackbar(key);
    notificationService.removeNotification(key);
  };

  return (
    <IconButton onClick={onClick}>
      <Close sx={{ color: '#fff' }} />
    </IconButton>
  );
}

// export default withSnackbar(Notifier);
export default Notifier;
