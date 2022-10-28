import React from 'react';
import { createStyles, Theme } from '@mui/material/styles';
import styled from 'styled-components';
import Button from '@mui/material/Button';

const useStyles = styled((theme: Theme) =>
  createStyles({
    button: {
      '&:hover': {
        backgroundColor: '#6666ff'
      }
    }
  })
);

type Props = {
  onClick: any;
  children: any;
};

export default function ElevButton({ onClick, children }: Props) {
  const classes = styled();

  return (
    <Button
      className={classes.button}
      variant="contained"
      color="primary"
      onClick={onClick}
    >
      {children}
    </Button>
  );
}