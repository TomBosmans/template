import Drawer, { drawerClasses } from "@mui/material/Drawer";
import { useAtomValue } from "jotai";
import { openAtom } from "./state";
import DrawerUser from "./components/DrawerUser";
import DrawerContent from "./components/DrawerContent";
import DrawerAlert from "./components/DrawerAlert";
import DrawerHeader from "./components/DrawerHeader";

export default function AppDrawer(props: { width: number }) {
  const open = useAtomValue(openAtom);

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={open}
      sx={{
        display: { xs: 'none', md: 'block' },
        [`& .${drawerClasses.paper}`]: {
          display: "flex",
          justifyContent: "space-between",
          backgroundImage: "var(--Paper-overlay)",
          width: props.width,
        },
      }}
    >
      <DrawerHeader />
      <DrawerContent />
      <DrawerAlert />
      <DrawerUser />
    </Drawer>
  )
}
