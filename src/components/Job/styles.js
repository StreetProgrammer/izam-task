import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
    content: {
        padding: 0,
        height: "100%",
        background: "#FFF",
        border: "1px solid #F0F0F0",
        boxShadow: "none",
        "&:hover": {
            background: "#F3FDF3",
            border: "1px solid #48A74C",

            "& .MuiChip-filled": {
                background: "#FFF",
                color: "#707070",
            } 

        }
    },
    jobUpper: {
        display: "flex",
        justifyContent: "space-between",
        padding: "16px"
    },
    mainTopInfo: {
        display: "flex",
        gap: "10px",
    },
    companyLogoWrapper: {
        "& img": {
            maxWidth: "70px"
        }
    },
    info: {
        display: "flex",
        flexDirection: "column",
    },
    jobTitle: {
        color: "#161616",
        fontWeight: 500,

    },
    companyTitle: {
        color: "#14A077",
        fontWeight: 700,
        
    },
    locaitonTime: {
        display: "flex",
        gap: "5px",
        "& >div": {
            display: "flex",
            gap: "5px",
            color: "#707070",
            fontWeight: 400,
        }
    },
    slugChip: {
        "&.MuiChip-filled": {
            borderRadius: "4px",
            background: "#F7F7F7",
            color: "#707070",
            fontWeight: 500
        }
    },
    categories: {
        fontWeight: 400
    }
}));
