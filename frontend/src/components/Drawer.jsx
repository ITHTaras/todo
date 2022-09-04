import React from "react";
import { Drawer, Box } from "@mui/material";

function _Drawer(props) {
  const { drawer, toggleDrawer } = props;

  return (
    <Drawer open={drawer} onClose={toggleDrawer}>
      <Box
        sx={{ width: 400 }}
        role="presentation"
        onClick={toggleDrawer}
        onKeyDown={toggleDrawer}
      ></Box>
    </Drawer>
  );
}

export default _Drawer;
