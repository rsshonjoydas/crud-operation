/* eslint-disable prettier/prettier */
/* eslint-disable no-alert */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
  withStyles
} from '@material-ui/core';
import { DeleteSweep } from '@material-ui/icons';
import ButterToast, { Cinnamon } from 'butter-toast';
import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/postMessage';
import PostMessageForm from './PostMessageForm';

const styles = (theme) => ({
  paper: {
    margin: theme.spacing(3),
    padding: theme.spacing(2),
  },
  smMargin: {
    margin: theme.spacing(1),
  },
  actionDiv: {
    textAlign: 'center',
  },
});

const PostMessages = ({ classes, ...props }) => {
  const [currentId, setCurrentId] = useState(0);

  useEffect(() => {
    props.fetchAllPostMessages();
  }, []);

  const onDelete = (id) => {
    const onSuccess = () => {
      ButterToast.raise({
        content: (
          <Cinnamon.Crisp
            title="Post Box"
            content="Deleted Successfully"
            scheme={Cinnamon.Crisp.SCHEME_PURPLE}
            icon={<DeleteSweep />}
          />
        ),
      });
    };
    if (window.confirm('Are you sure to delete this record?')) {
      props.deletePostMessage(id, onSuccess);
    }
  };

  return (
    <Grid container>
      <Grid item xs={5}>
        <Paper className={classes.paper}>
          <PostMessageForm {...{ currentId, setCurrentId }} />
        </Paper>
      </Grid>
      <Grid item xs={7}>
        <Paper className={classes.paper}>
          <List>
            {props.postMessageList.map((record, index) => (
              <Fragment key={index}>
                <ListItem>
                  <ListItemText>
                    <Typography variant="h5">{record.title}</Typography>
                    <div>{record.message}</div>
                    <div className={classes.actionDiv}>
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        className={classes.smMargin}
                        onClick={() => setCurrentId(record._id)}
                      >
                        EDIT
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        className={classes.smMargin}
                        onClick={() => onDelete(record._id)}
                      >
                        DELETE
                      </Button>
                    </div>
                  </ListItemText>
                </ListItem>
                <Divider component="li" />
              </Fragment>
            ))}
          </List>
        </Paper>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  postMessageList: state.postMessage.list,
});

const mapActionToProps = {
  fetchAllPostMessages: actions.fetchAll,
  deletePostMessage: actions.Delete,
};

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(PostMessages));
