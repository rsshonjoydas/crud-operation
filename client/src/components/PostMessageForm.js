import { Button, TextField, withStyles } from '@material-ui/core';
import { AssignmentTurnedIn } from '@material-ui/icons';
import ButterToast, { Cinnamon } from 'butter-toast';
import React, { useEffect } from 'react';
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
  const { currentId, setCurrentId, createPostMessage, updatePostMessage } = props;
  const { values, setValues, errors, setErrors, handleInputChange, resetForm } = useForm(
    initialFieldValues,
    setCurrentId
  );

  useEffect(() => {
    if (currentId !== 0) {
      setValues({
        ...props.postMessageList.find((x) => x._id === currentId),
      });
      setErrors({});
    }
  }, [currentId]);

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
      ButterToast.raise({
        content: (
          <Cinnamon.Crisp
            title="Post Box"
            content="Submitted Successfully"
            scheme={Cinnamon.Crisp.SCHEME_PURPLE}
            icon={<AssignmentTurnedIn />}
          />
        ),
      });
      resetForm();
    };
    if (validate()) {
      if (currentId === 0) {
        createPostMessage(values, onSuccess());
      } else {
        updatePostMessage(currentId, values, onSuccess);
        console.log('rs');
      }
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
