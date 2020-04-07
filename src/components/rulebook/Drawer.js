import React, { Fragment } from "react";
import { connect } from "react-redux";
import { closeDrawer } from "../../actions/ruleBook";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";

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
  open: state.ruleBook.open,
});

export default connect(mapStateToProps, { closeDrawer })(
  ({ open, closeDrawer }) => {
    const classes = useStyles();
    const theme = useTheme();

    const handleDrawerClose = () => {
      closeDrawer();
    };

    const handleDrawerClick = () => null;

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
          <Divider />
          {/* <List>
          {titles.map((title, index) => (
            <ListItem
              button
              key={title}
              onClick={e => handleDrawerClick(title)}
            >
              <ListItemIcon>
                <ArrowRightIcon />
              </ListItemIcon>
              <ListItemText primary={title} />
            </ListItem>
          ))}
        </List> */}
        </Drawer>
      </Fragment>
    );
  }
);
