import { createTheme } from "@material-ui/core";

const theme = createTheme({
    palette: {
        primary: {
            main: '#DB4C3F'
        },
        secondary: {
            main: '#FAE5E3'
        }
    },
    props: {
        MuiAppBar: {
            elevation: 0,
            position: 'fixed',
        },
        MuiContainer: {
            root: {
                marginTop: 80,
                marginLeft: 240
            },
            disableGutters: true
        }
    },
    overrides: {
        MuiContainer: {
            marginTop:80,
            marginLeft:240,
            padding: 0
        },
        MuiTextField: {
            root: {
                minHeight: 43,
                height: 43
            }
        }
    }
})

export default theme;