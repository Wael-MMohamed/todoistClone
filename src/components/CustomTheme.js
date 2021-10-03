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
                marginRight: 0,
                marginLeft: 0
            },
            disableGutters: true
        }
    },
    overrides: {
        MuiContainer: {
            margin:0,
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