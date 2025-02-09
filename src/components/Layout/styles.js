import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
    mainContent: {
        width: "100%",
        display: "flex",
        gap: "10px",
        background: "#F7F7F7",
    },
    content: {
        padding: "10px",
        
    },
    aside: {
        
        width: "25%",
        '@media(max-width: 780px)' : {
            display: "none"
        }
    }
}));
