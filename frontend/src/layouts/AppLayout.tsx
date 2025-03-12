import { PropsWithChildren } from "react";
import AppDrawer from "../features/AppDrawer";
import Box from "@mui/material/Box";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "../components/Link";
import Typography from "@mui/material/Typography";
import { useRouterState } from "@tanstack/react-router";
const DRAWER_WIDTH = 240

export default function AppLayout({ children }: PropsWithChildren) {
  const { location } = useRouterState()
  alert(JSON.stringify(location))

  return (
    <Box component="main" sx={{ padding: 3, marginLeft: `${DRAWER_WIDTH}px` }}>
      <AppDrawer width={DRAWER_WIDTH} />
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          MUI
        </Link>
        <Link
          underline="hover"
          color="inherit"
          href="/material-ui/getting-started/installation/"
        >
          Core
        </Link>
        <Typography sx={{ color: 'text.primary' }}>Breadcrumbs</Typography>
      </Breadcrumbs>
      {children}
    </Box>
  )
}
