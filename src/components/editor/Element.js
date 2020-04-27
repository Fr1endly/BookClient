import React from "react";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

const Element = ({ attributes, children, element }) => {
  switch (element.type) {
    case "block-quote":
      return <blockquote {...attributes}>{children}</blockquote>;
    case "bulleted-list":
      return <ul {...attributes}>{children}</ul>;
    case "heading-one":
      return (
        <Typography {...attributes} variant="h4">
          {children}
        </Typography>
      );
    case "heading-two":
      return (
        <Typography {...attributes} variant="h5">
          {children}
        </Typography>
      );
    case "list-item":
      return <li {...attributes}>{children}</li>;
    case "numbered-list":
      return <ol {...attributes}>{children}</ol>;
    case "link":
      return (
        <Link {...attributes} component={RouterLink} to={element.url}>
          {children}
        </Link>
      );
    default:
      return (
        <Typography {...attributes} variant="body1">
          {children}
        </Typography>
      );
  }
};

export default Element;
