import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ColorModeSwitch from "../../ColorModeSwitch";

export default function DrawerHeader() {
  return (
    <Stack
      direction="row"
      gap={1}
      justifyContent="space-between"
      sx={{
        padding: 2,
        alignItems: 'center',
      }}
    >
      <Stack direction="row" gap={1}>
        <img src="/mui.svg" />
        <Typography variant="h5" sx={{ fontWeight: 500, lineHeight: '16px' }}>
          Template
        </Typography>
      </Stack>
      <ColorModeSwitch />
    </Stack>
  )
}
