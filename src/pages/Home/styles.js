import { colors } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
    homeWrapper: {
        backgroundSize: "cover",
        position:"relative",
        height: "100%",
        "& > div": {
            background: "#3b3a39c2",
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            color: colors.common.white,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "15px",
            "& > h3": {
                textTransform: "uppercase"
            },

            "& > span": {
                maxWidth: "50%",
                textAlign: "center",
                textShadow: "0px 1px #323130",
            }
        }
    },

    content: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: "35px"
    },

    sort: {
        display: "flex",
        flexDirection: "row-reverse"
    },
    infoAndAlertAndMobileMenuTrigger: {
        display: "flex",
        gap: "10px",
        alignItems: "center"
    },
    infoAndAlert: {
        flex: 1,

        "& .MuiCardContent-root": {
            padding: "16px",
            background: "#3D8E41",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            "&:last-child":{
                paddingBottom: "16px"
            },
            "& h6": {
                color: "#FFF",
                padding: 0,
            },
            "& span.MuiTypography-caption": {
                color: "#FFF",
                padding: 0,
            },
        }
    },
    alert: {
        display: "flex",
        alignItems: "center",
        gap: "10px"
    }

}));
