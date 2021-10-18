import { useDispatch} from 'react-redux';
import {addNewTask} from './taskSlice';
import { useState } from 'react';
import { useHistory } from 'react-router';
import TextField from '@material-ui/core/TextField';
import { Select, MenuItem, Button, FormControl } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FlagIcon from '@material-ui/icons/Flag';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(3),
      width: '25ch',
    },
    button: {
        display: 'block',
        marginTop: theme.spacing(3),
      },
      formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
      }
  },
}));

export default function AddNewTask(){

    const dispatch = useDispatch();
    const classes = useStyles();

    const date = new Date();
    const today = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

    const [content, setContent] = useState('');
    const [dueDate, setDueDate] = useState(today);
    const [priority, setPriority] = useState(1);
    const history = useHistory();

    const onSavePostClicked = (e) => {
    e.preventDefault();
    let data = {
        "content": content,
        "due_date": dueDate,
        "due_lang": "en",
        "priority": priority,
        "project_id": 2269074557
    }
    dispatch(addNewTask(data));
    history.push('/');
    }

    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    return(
        <div style={{marginLeft:240}}>
            <form className={classes.root} noValidate autoComplete="off">
                <FormControl className={classes.formControl}>
                    <TextField 
                        required id="standard-required" 
                        label="Required" 
                        placeholder="Task Description" 
                        value={content}
                        onChange={(prev) => {
                            prev = prev.target.value;
                            setContent(prev);
                        }}
                    />
                    <TextField
                        id="date"
                        label="Due Date"
                        type="date"
                        defaultValue={dueDate}
                        className={classes.textField}
                        InputLabelProps={{
                        shrink: true,
                        }}
                        value={dueDate}
                        onChange={(prev) => {
                            prev = prev.target.value;
                            setDueDate(prev);
                        }}
                    />
                    <Button className={classes.button} onClick={handleOpen}>
                        Open the select
                    </Button>
                    <Select
                        labelId="priority-label"
                        open={open}
                        onClose={handleClose}
                        onOpen={handleOpen}
                        value={priority}
                        onChange={(prev) => {
                            prev = prev.target.value;
                            setPriority(prev);
                        }}
                    >
                        <MenuItem value='' disabled><FlagIcon /></MenuItem>
                        <MenuItem value={1}><FlagIcon fontSize='small' color='primary'/> Priority 1</MenuItem>
                        <MenuItem value={2}><FlagIcon fontSize='small' color='secondary' />  Priority 2</MenuItem>
                        <MenuItem value={3}><FlagIcon fontSize='small' />  Priority 3</MenuItem>
                        <MenuItem value={4}><FlagIcon fontSize='small' />  Priority 4</MenuItem>
                    </Select>
                    <div>
                    <Button variant="outlined" onClick={onSavePostClicked} >
                        Save Post
                    </Button>
                    </div>
                </FormControl>
            </form>
        </div>
    )
}