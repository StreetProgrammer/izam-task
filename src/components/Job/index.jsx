import React from "react";
import {
  Box,
  Divider,
  IconButton,
  Typography,
  Card,
  CardContent,
  Stack,
  Chip,
} from "@mui/material/";
import { Favorite, Place, CalendarToday } from "@mui/icons-material";
import { useStyles } from "./styles";

const Job = (props) => {
  const { job } = props;
  const classes = useStyles();
  return (
    <Card className={classes.content}>
      <CardContent sx={{ padding: 0 }}>
        <Box className={classes.jobUpper}>
          <Stack direction="column" className={classes.mainTopInfo}>
            <Stack direction="row" spacing={1}>
              <Box className={classes.companyLogoWrapper}>
                <img src={job.company.logo} alt={job.company.title} />
              </Box>
              <Box className={classes.info}>
                <Typography variant="h6" className={classes.jobTitle}>
                  {job.title}
                </Typography>
                <Typography variant="p" className={classes.companyTitle}>
                  {job.company.title}
                </Typography>
              </Box>
            </Stack>
            <Box className={classes.locaitonTime}>
              {job.location && (
                <Box>
                  <Place /> <Typography>{job.location}</Typography>
                </Box>
              )}
              {job.cratedAt && (
                <Box>
                  <CalendarToday /> <Typography>{job.cratedAt}</Typography>
                </Box>
              )}
            </Box>
            <Stack direction="row" spacing={1}>
              {job.slugs.length > 0 &&
                job.slugs.map((slug) => (
                  <Chip label={slug} className={classes.slugChip} />
                ))}
            </Stack>
          </Stack>
          <Box>
            <IconButton color="secondary" aria-label="add an alarm">
              <Favorite />
            </IconButton>
          </Box>
        </Box>
        <Divider />
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ padding: 2 }}
          className={classes.categories}
        >
          {job.categories.join(" - ")}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Job;
