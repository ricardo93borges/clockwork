import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';
import * as moment from 'moment';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Divider,
  makeStyles,
} from '@material-ui/core';
import { KeyboardTimePicker } from '@material-ui/pickers';

import * as FirebaseService from '../../services/firebase';

const useStyles = makeStyles(() => ({
  buttonWrapper: {
    padding: 10,
  },
  deleteBtn: {
    float: 'right',
    marginTop: 30,
    cursor: 'pointer',
  },
  saveBtn: {
    float: 'right',
  },
}));

function Edit({ match, history }) {
  const classes = useStyles();
  const { id } = match.params;

  const [register, setRegister] = useState(null);
  const [title, setTitle] = useState(null);
  const [originalDate, setOriginalDate] = useState(null);

  useEffect(() => {
    const getRegister = async (registerId) => {
      const foundRegister = await FirebaseService.getRegister(registerId);

      if (foundRegister && foundRegister.registers.length > 0) {
        const date = moment(foundRegister.date);
        setOriginalDate(foundRegister.date);
        setTitle(date.format('Y/M/D'));
      }

      setRegister(foundRegister);
    };
    getRegister(id);
  }, [id]);

  // TODO: develop
  // const remove = (index) => {
  //   const r = { ...register };
  //   r.registers.splice(index, 1);
  //   setRegister(r);
  // };

  const add = () => {
    if (register.registers.length >= 4) return;
    const r = { ...register };
    r.registers.push(new Date());
    setRegister(r);
  };

  const updateDate = (index, date) => {
    const r = { ...register };

    const str = `${originalDate.getFullYear()}/
      ${originalDate.getMonth() + 1}/
      ${originalDate.getDate()} ${date.format('H:m')}`;

    const newDate = new Date(str);

    r.registers[index] = newDate;
    setRegister(r);
  };

  const updateRegister = async (registerToUpdate) => {
    await FirebaseService.updateRegister(registerToUpdate.id, register);
    history.goBack();
  };

  return (
    <Grid item xs={12}>
      <Card>
        <CardContent>
          <Typography variant="subtitle1">{title}</Typography>
          {register
            && register.registers.map((date, index) => (
              <Grid item key={date} xs={12}>
                <KeyboardTimePicker
                  margin="normal"
                  id="time-picker"
                  label={index % 2 === 0 ? 'In' : 'Out'}
                  value={date}
                  onChange={(dateValue, value) => updateDate(index, dateValue, value)}
                />
                {/*  <Icon
                    color={'primary'}
                    position="right"
                    className={classes.deleteBtn}
                    onClick={() => remove(index)}
                  >
                    delete
                  </Icon> */}
              </Grid>
            ))}
        </CardContent>
        <Divider />
        <div className={classes.buttonWrapper}>
          <Button variant="contained" color="primary" onClick={() => add()}>
            Add
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={classes.saveBtn}
            onClick={() => updateRegister(register)}
          >
            Save
          </Button>
        </div>
      </Card>
    </Grid>
  );
}

Edit.propTypes = {
  history: PropTypes.objectOf(PropTypes.any),
  match: PropTypes.objectOf(PropTypes.any),
};

Edit.defaultProps = {
  history: PropTypes.any,
  match: PropTypes.any,
};

export default Edit;
