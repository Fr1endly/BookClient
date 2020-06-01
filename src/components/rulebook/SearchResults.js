import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Display from "../editor/RTE";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxHeight: 350,
    marginBottom: 15,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  content: {
    marginBottom: 30,
  },
});

const SearchResults = ({ searchResults }) => {
  const classes = useStyles();

  return (
    <div>
      {searchResults.map((result) => (
        <Card className={classes.root} key={result._id}>
          <CardContent className={classes.content}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Typography className={classes.title} color="textSecondary"
              >
                {result.title}
              </Typography>
              <CardActions>
                <Button size="small">Learn More</Button>
              </CardActions>
            </div>

            <Display
              readOnly={true}
              sections={JSON.parse(result.sections)}
              searchDisplay={true}
            />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  searchResults: state.ruleBook.filteredChapters,
});

export default connect(mapStateToProps)(SearchResults);
