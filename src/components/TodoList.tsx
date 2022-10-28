// Material-UI BouutonからContained Buttonsを使用
import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components/native';
import { createStyles, Theme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import ElevButton from './ElevButton';
import RegisterDialog from './RegisterDialog';
import TodoTable from './TodoTable';
import { tasksState } from '../atoms/Tasks';


const useStyles = styled((theme: Theme) =>
  createStyles({
    fab: {
      position: 'absolute',
      bottom: '2rem',
      right: '2rem',
      '&:hover': {
        backgroundColor: '#6666ff'
      }
    }
  })
);

export default function TodoList() {
  const classes = styled();

  const tasks = useRecoilValue(tasksState);
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  return (
    <Box padding="2rem" text-align={tasks.length !== 0 ? '' : 'center'}>
      {tasks.length !== 0 ? (
        <>
          <TodoTable />
          <Fab
            className={classes.fab}
            onClick={handleOpen}
            color="primary"
            aria-label="add"
          >
            <AddIcon />
          </Fab>
        </>
      ) : (
        <>
          <Typography variant="subtitle1" gutterBottom>
            まだ登録されたタスクはありません。
          </Typography>
          <ElevButton onClick={handleOpen}>タスクを登録する</ElevButton>
        </>
      )}
      <RegisterDialog open={open} onClose={handleClose} />
    </Box>
  );
}
