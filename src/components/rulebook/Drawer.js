import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { fetchChapters } from "../../actions/ruleBook";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import Link from "@material-ui/core/Link";
import { Link as RouterLink } from "react-router-dom";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
}));

const mapStateToProps = (state) => ({
  chapters: state.ruleBook.chapters,
  open: state.ruleBook.open,
});

export default connect(mapStateToProps, { fetchChapters })(
  ({ open, chapters, fetchChapters }) => {
    const classes = useStyles();

    useEffect(() => {
      fetchChapters();
    }, []);

    return (
      <Fragment>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader} />
          <Divider />
          <List>
            {chapters.map((chapter, index) => (
              <ListItem button key={chapter.title}>
                <Link component={RouterLink} to={`/rulebook/${chapter.title}`}>
                  <ListItemText primary={chapter.title} />
                </Link>
              </ListItem>
            ))}
          </List>
        </Drawer>
      </Fragment>
    );
  }
);
