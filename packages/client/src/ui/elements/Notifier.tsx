import React from 'react';
import { useSnackbar } from 'notistack';
import IconButton from '@mui/material/IconButton';
import { Close } from '@mui/icons-material';
import { removeSnackbar } from '@/store/Alert/alert.actions';
import { useAppDispatch, useAppSelector } from '@/hooks';

let displayed: string[] = [];

const Notifier = () => {
  const dispatch = useAppDispatch();
  const notifications = useAppSelector(
    (store) => store.notifications.notifications || [],
  );
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const storeDisplayed = (id: string) => {
    displayed = [...displayed, id];
  };

  const removeDisplayed = (id: string) => {
    displayed = [...displayed.filter((key) => id !== key)];
  };

  React.useEffect(() => {
    console.log(notifications);
    notifications.forEach(({ key, message, options = {} }) => {
      if (displayed.includes(key)) return;
      enqueueSnackbar(message, {
        key,
        ...options,
        autoHideDuration: 1500,
        onExited: (event, myKey) => {
          // remove this snackbar from redux store
          dispatch(removeSnackbar(myKey));
          removeDisplayed(myKey as string);
        },
        action: () => {
          const onClick = () => {
            closeSnackbar();
            dispatch(removeSnackbar(options.key));
          };

          return (
            <IconButton onClick={onClick}>
              <Close sx={{ color: '#fff' }} />
            </IconButton>
          );
        },
      });

      // keep track of snackbars that we've displayed
      storeDisplayed(key);
    });
  }, [notifications, closeSnackbar, enqueueSnackbar, dispatch]);

  return null;
};

export default Notifier;
