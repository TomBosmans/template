import Box from "@mui/material/Box"
import { useTheme } from "@mui/material/styles"
import type { PropsWithChildren } from "react"

export default function AuthLayout({ children }: PropsWithChildren) {
  const theme = useTheme()

  const svgString = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 900">
      <defs>
        <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${theme.palette.primary.main}" />
          <stop offset="100%" stop-color="${theme.palette.secondary.main}" />
        </linearGradient>
      </defs>

      <rect width="1440" height="900" fill="url(#bgGradient)" />

      <path fill="rgba(255, 255, 255, 0.2)" 
            d="M 0 600 C 200 500, 400 700, 600 650 C 800 600, 1000 500, 1200 550 C 1400 600, 1440 500, 1440 500 L 1440 900 L 0 900 Z"/>
  
      <path fill="rgba(255, 255, 255, 0.1)" 
            d="M 0 700 C 250 600, 500 800, 750 750 C 1000 700, 1250 600, 1440 650 L 1440 900 L 0 900 Z"/>

      <path fill="rgba(255, 255, 255, 0.05)" 
            d="M 0 800 C 300 750, 600 850, 900 825 C 1200 800, 1440 750, 1440 750 L 1440 900 L 0 900 Z"/>
    </svg>
  `;

  const encodedSvg = `data:image/svg+xml;base64,${btoa(svgString)}`;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        background: `url(${encodedSvg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {children}
    </Box>
  )
}
