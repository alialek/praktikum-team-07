import { ReactNode } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { FormState, useForm, UseFormRegister, FieldValues } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AnyObjectSchema } from 'yup';

type FormDialogProps<T extends FieldValues> = {
  title: string;
  open: boolean;
  onClose: (value: boolean) => void;
  onSubmit: (values: T) => void;
  children: (register: UseFormRegister<T>, formState: FormState<T>) => ReactNode;
  validationSchema: AnyObjectSchema;
};

export function FormDialog<T extends FieldValues>({
  title,
  open,
  onClose,
  onSubmit,
  validationSchema,
  children,
}: FormDialogProps<T>) {
  const { register, handleSubmit, formState } = useForm<T>({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
  });

  const handleClose = () => {
    onClose(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{ sx: { p: 3 } }}
    >
      <DialogTitle>{title}</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent sx={{ m: 3 }}>{children(register, formState)}</DialogContent>
        <DialogActions>
          <Button type="reset" onClick={handleClose}>
            Отменить
          </Button>
          <Button variant="contained" type="submit">
            Добавить
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
