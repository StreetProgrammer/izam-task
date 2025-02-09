import { colors } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
    linksWrapper: {
        "& > a": {
            color: colors.common.white,
            marginInline: "10px",
            textDecoration: "none",
        }
    },
    drawerLink: {
        color: colors.blue[600],
        marginInline: "10px",
        textDecoration: "none",
    },
    headerWrpper: {
        "& >.MuiPaper-root": {
            background: "#161616",
            "& >.MuiToolbar-root": {
                height: 100,
                padding: "25px 30px",

                "& .MuiDivider-root": {
                    borderColor: "#D6D6D699"
                }
            }
        }
    },
    logo: {
        fontWeight: "700 !important",
        "& >span": {
            color: "#3D8E41"
        }
    }
}));
