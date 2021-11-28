import { Drawer, Divider, List, ListItem, ListItemIcon, ListItemText, makeStyles, useTheme } from "@material-ui/core";
import { AppBar, Toolbar, IconButton, TextField, InputAdornment } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import { useState } from 'react';
import InboxIcon from '@material-ui/icons/Inbox';
import MailIcon from '@material-ui/icons/Mail';
import { useHistory } from 'react-router';
import { useDispatch} from 'react-redux';
import { findTask } from "./taskSlice";



const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    marginTop: '48px'
  },
}));





export default function Layout(){

    const dispatch = useDispatch();
    const classes = useStyles();
    const theme = useTheme();
    const history = useHistory();
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState('');

    function toggleOpen(){
        if(open){
        setOpen(false);
        }
        if(!open){
        setOpen(true);
        }
    }

    return(
        <div>
            <AppBar>
                <Toolbar variant='primary'>
                <IconButton edge="start" color="inherit" aria-label="menu" 
                    onClick={toggleOpen}
                >
                    <MenuIcon />
                </IconButton>
                <IconButton aria-label='home' color='inherit' 
                    onClick={() => {history.push('/')}}
                >
                    <HomeOutlinedIcon />
                </IconButton>
                <TextField variant='outlined' 
                size='small'
                InputProps={{
                    startAdornment: (
                    <InputAdornment position="start">
                        <SearchOutlinedIcon />
                    </InputAdornment>
                    ),
                }}
                value = {search}
                onChange = {(word) => {
                    word = word.target.value
                    setSearch(word)
                    dispatch(findTask(search))
                }}
                />
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                paper: classes.drawerPaper,
                }}
            >
                <Divider />
                <List>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem button key={text}>
                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                    <ListItemText primary={text} />
                    </ListItem>
                ))}
                </List>
                <Divider />
                <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem button key={text}>
                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                    <ListItemText primary={text} />
                    </ListItem>
                ))}
                </List>
            </Drawer>
        </div>
        
    )
}