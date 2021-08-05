/* eslint-disable no-alert */
/* eslint-disable react/jsx-props-no-spreading */
import { Button, TextField, withStyles } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/postMessage';
import useForm from './useForm';

const initialFieldValues = {
  title: '',
  message: '',
};

const styles = (theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  postBtn: {
    width: '50%',
  },
});

const PostMessageForm = ({ classes, ...props }) => {
  const { values, errors, setErrors, handleInputChange } = useForm(initialFieldValues);

  const validate = () => {
    const temp = { ...errors };
    temp.title = values.title ? '' : 'This field is required!';
    temp.message = values.message ? '' : 'This field is required!';
    setErrors({
      ...temp,
    });
    return Object.values(temp).every((x) => x === '');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const onSuccess = () => {
      window.alert('Validation Successful');
    };
    if (validate()) {
      props.createPostMessage(values, onSuccess());
    }
  };

  return (
    <form
      autoComplete="off"
      noValidate
      className={`${classes.root} ${classes.form}`}
      onSubmit={handleSubmit}
    >
      <TextField
        name="title"
        variant="outlined"
        label="Title"
        fullWidth
        value={values.title}
        onChange={handleInputChange}
        {...(errors.title && { error: true, helperText: errors.title })}
      />
      <TextField
        name="message"
        variant="outlined"
        label="Message"
        fullWidth
        multiline
        rows="4"
        value={values.message}
        onChange={handleInputChange}
        {...(errors.message && { error: true, helperText: errors.message })}
      />
      <Button
        variant="contained"
        color="primary"
        size="large"
        type="submit"
        className={classes.postBtn}
      >
        Submit
      </Button>
    </form>
  );
};

const mapStateToProps = (state) => ({
  postMessageList: state.postMessage.list,
});

const mapActionToProps = {
  createPostMessage: actions.create,
  updatePostMessage: actions.update,
};

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(PostMessageForm));
