import React from "react";
import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import RestaurantIcon from "@mui/icons-material/Restaurant";

function SideBar() {
  const { collapseSidebar } = useProSidebar();

  return (
    <div id="sidebar" style={({ height: "100vh" }, { display: "flex" })}>
      <Sidebar style={{ height: "100vh", color: "#111fff" }}>
        <Menu>
          <MenuItem
            icon={<MenuOutlinedIcon />}
            onClick={() => {
              collapseSidebar();
            }}
            style={{ textAlign: "center" }}>
            {" "}
            <h4>Simply Meal Planner</h4>
          </MenuItem>

          <MenuItem icon={<HomeOutlinedIcon />}>Home</MenuItem>
          <MenuItem icon={<RestaurantIcon />}>Recipes</MenuItem>
          <MenuItem icon={<ContactsOutlinedIcon />}>Contact Us</MenuItem>
          <MenuItem icon={<HelpOutlineOutlinedIcon />}>FAQ</MenuItem>
          <MenuItem icon={<SettingsIcon />}>Settings</MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
}

export default SideBar;
