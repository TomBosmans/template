import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import OptionsMenu from "../../../components/OptionsMenu";
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { useNavigate } from "@tanstack/react-router";

export default function DrawerUser() {
  const navigate = useNavigate()

  return (
    <Stack
      direction="row"
      sx={{
        padding: 2,
        gap: 1,
        alignItems: 'center',
        borderTop: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Avatar
        sizes="small"
        alt="Riley Carter"
        src="/static/images/avatar/7.jpg"
        sx={{ width: 36, height: 36 }}
      />
      <Box sx={{ mr: 'auto' }}>
        <Typography variant="body2" sx={{ fontWeight: 500, lineHeight: '16px' }}>
          Riley Carter
        </Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          riley@email.com
        </Typography>
      </Box>
      <OptionsMenu
        options={[
          [{ label: "Profile", onClick: () => navigate({ to: "." }) }, { label: "My account", onClick: () => navigate({ to: "." }) }],
          [{ label: "Add another account", onClick: () => navigate({ to: "." }) }, { label: "Settings", onClick: () => navigate({ to: "." }) }],
          [{ label: "logout", onClick: () => navigate({ to: "/sign_in" }), icon: LogoutRoundedIcon }],
        ]}
      />
    </Stack>
  )
}
