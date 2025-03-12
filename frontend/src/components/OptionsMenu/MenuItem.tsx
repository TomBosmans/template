import MuiMenuItem, { type MenuItemProps } from '@mui/material/MenuItem';

export default function MenuItem(props: MenuItemProps) {
  return <MuiMenuItem  sx={{ margin: "2px 0"}} {...props} />
}
