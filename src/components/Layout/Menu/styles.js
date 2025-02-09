import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
    menuHeader: {
        display: "flex",
        justifyContent: "space-between",
        borderBlockEnd: "1px solid #E9E9E9",
        paddingBlock: "10px"
    },
    title: {
        fontWeight: 500
    },
    actions: {
        display: "flex",
        gap: "5px",
        "& .settings": {
            color: "#000"
        },
        "& .cancel": {
            color: "#ED1F03"
        },
        "& .save    ": {
            color: "#3D8E41"
        }
    },
    parentItemNormal: {
        background: "#F7F7F7",
        margin: "10px",
        width: "auto !important",
        cursor: "pointer"
    },
    childItemNormal: {
        margin: "10px 25px",
        width: "auto !important",
        cursor: "pointer",
        "&:hover": {
            background: "#F7F7F7"
        }
    },
    parentItemEditMode: {
        background: "#F7F7F7",
        margin: "10px",
        width: "auto !important"
    }
}));
