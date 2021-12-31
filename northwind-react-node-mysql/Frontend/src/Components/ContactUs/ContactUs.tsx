import { FormControlLabel, TextField, Typography, Checkbox, Button, ButtonGroup, makeStyles, createMuiTheme, ThemeProvider, TextareaAutosize } from "@material-ui/core";
import { green, orange } from "@material-ui/core/colors";
import { Cancel, MailOutline, Send } from "@material-ui/icons";
import "./ContactUs.css";

function ContactUs(): JSX.Element {

    const createClasses = makeStyles({
        textBox: { margin: "5px 0", width: 400 },
        headline: { fontSize: 30 }
    });

    const classes = createClasses();

    const theme = createMuiTheme({
        typography: {
            fontFamily: "Arial"
        },
        palette: {
            primary: { main: green[600] },
            secondary: { main: orange[600] }
        }
    });

    return (
        <ThemeProvider theme={theme}>
            <div className="ContactUs Box">

                <Typography className={classes.headline}> <MailOutline /> Contact Us</Typography>

                <TextField label="Name" variant="outlined" className={classes.textBox} />
                <br />

                <TextField label="Email" variant="outlined" className={classes.textBox} />
                <br />

                <TextField label="Message" variant="outlined" className={classes.textBox} />
                <br />

                <FormControlLabel label="Send me updates via email" control={<Checkbox />} />
                <br />

                <ButtonGroup variant="contained" fullWidth>
                    <Button color="primary" startIcon={<Send />}>Send</Button>
                    <Button color="secondary" startIcon={<Cancel />}>Cancel</Button>
                </ButtonGroup>

            </div>
        </ThemeProvider>
    );
}

export default ContactUs;
