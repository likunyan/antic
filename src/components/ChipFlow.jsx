import Badge from "@material-ui/core/Badge";
import Chip from "@material-ui/core/Chip";
import Grid from "@material-ui/core/Grid";
import React from "react";

const ChipFlow = (props) => {
  return (
    <Grid container spacing={2}>
      {props.items.length !== 0 &&
        props.items.map((item) => (
          <Grid item key={item.id || item.name}>
            <Badge badgeContent={item.count}>
              <Chip
                label={item.name}
                variant={
                  props.currentSelect === item[[props.type]]
                    ? "default"
                    : "outlined"
                }
                color={
                  props.currentSelect === item[[props.type]]
                    ? "primary"
                    : "default"
                }
                onClick={() => {
                  props.onHandleClick(item[props.type]);
                }}
              />
            </Badge>
          </Grid>
        ))}
    </Grid>
  );
};

export default ChipFlow;
