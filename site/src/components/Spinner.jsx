import { CircularProgress, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  display: "flex",
  height: "100vh",
  width: "100vw",
  placeItems: "center",
  placeContent: "center",
}));

export default function Spinner() {
  const classes = useStyles();
  return (
    <div className={classes.loadingContainer}>
      <CircularProgress
        color="secondary"
        style={{ height: "5em", width: "5em" }}
      />
    </div>
  );
}
