import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import IconButton from '@mui/material/IconButton';
import { useColorScheme } from '@mui/material/styles';
import { useEffect } from 'react';

export default function ColorModeSwitch() {
  const { mode, systemMode, setMode } = useColorScheme();

  useEffect(() => {
    if (systemMode) setMode(systemMode)
  }, [])

  const toggleMode = () => setMode(mode === "light" ? "dark" : "light")

  return (
    <IconButton onClick={toggleMode}>
      { mode === "light" ? <LightModeIcon /> : <DarkModeIcon />}
    </IconButton>
  )
}
