import React from 'react';

import { useRecoilState, useSetRecoilState } from 'recoil';
import { Theme, createStyles } from '@mui/material/styles';
import styled from 'styled-components/native';

import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Slider from '@mui/material/Slider';
import Input from '@mui/material/Input';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DateFnsUtils from '@date-io/date-fns';
import { LocalizationProvider, DatePicker } from '@mui/lab'

import {
  taskContentState,
  taskDeadlineState,
  taskPriorityState
} from '../atoms/RegisterDialogContent';

const useStyles = styled((theme: Theme) =>
  createStyles({
    root: {
      overflow: 'hidden'
    }
  })
);

export default function RDialogContent() {
  const classes = styled();
  // atomからstateを取得する
  const setContent = useSetRecoilState(taskContentState);
  const [deadline, setDeadline] = useRecoilState(taskDeadlineState);
  const [priority, setPriority] = useRecoilState(taskPriorityState);
// 　タスクの内容が変更された時
  const handleContentChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setContent(e.target.value);
  };
// 　タスクの期限が変更された時
  const handleDeadlineChange = (date: any) => {
    setDeadline(date);
  };
// 　スライダーが動かされた時
  const handleSliderChange = (e: React.ChangeEvent<{}>, newValue: any) => {
    setPriority(newValue);
  };
//  スライダー横の数値入力欄が変更された時
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPriority(Number(e.target.value));
  };
// 数値入力欄で１～５以外の数値が指定されたとき
  const handleBlur = () => {
    if (priority < 1) {
      setPriority(1);
    } else if (priority > 5) {
      setPriority(5);
    }
  };

  return (
      // このタグ内にある部分が pickers のカバーする範囲になる 
    <LocalizationProvider utils={DateFnsUtils}>
      <DialogContent className={classes.root}>
        <DialogContentText>
          登録するタスクの情報を入力してください。
        </DialogContentText>
        <Grid container spacing={6} direction="column">
          <Grid item>
            <TextField
              onChange={handleContentChange}
              margin="dense"
              id="name"
              label="内容"
              fullWidth
            />
            <DatePicker
              disableToolbar
              variant="inline"
              format="yyyy/MM/dd"
              minDate={new Date()}  // 現在の日より前の日は選択不可 }
              margin="normal"
              id="date-picker-inline"
              label="期限"
              value={deadline}
              onChange={date => handleDeadlineChange(date)}
              invalidDateMessage="無効な形式です"
              minDateMessage="昨日以前の日付を指定することはできません"
            />
          </Grid>
          <Grid container item spacing={2}>
            <Grid item xs={2}>
              <DialogContentText>優先度</DialogContentText>
            </Grid>
            <Grid item xs={8}>
              <Slider
                value={priority}
                onChange ref={handleSliderChange}
                defaultValue={1}
                aria-valuetext=""
                aria-labelledby="discrete-slider"
                valueLabelDisplay="on"
                step={1}
                marks
                min={1}
                max={5}
              />
            </Grid>
            <Grid item xs={2}>
              <Input
                value={priority}
                margin="dense"
                onChange={handleInputChange}
                onBlur={handleBlur}
                inputProps={{
                  step: 1,
                  min: 1,
                  max: 5,
                  type: 'number',
                  'aria-labelledby': 'input-slider'
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
    </LocalizationProvider>
  );
}
