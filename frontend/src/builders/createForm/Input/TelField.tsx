import Box from "@mui/material/Box"
import InputAdornment from "@mui/material/InputAdornment"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem/MenuItem"
import useMask from "@react-input/mask/useMask"
import { useRef, useState } from "react"
import { useFormContext } from "react-hook-form"
import { useTranslation } from "react-i18next"
import TextField, { type TextFieldProps } from "../../../components/TextField"
import countries, { type Country } from "../../../utils/countries"

export default function TelField(props: TextFieldProps & { id: string }) {
  const [selectedCountry, selectCountry] = useState<Country>(countries[0])
  const { t } = useTranslation()
  const ref = useRef(null)
  const { setValue } = useFormContext()
  const [open, setOpen] = useState<boolean>(false)
  const inputRef = useMask({
    mask: selectedCountry.phone,
    replacement: { _: /\d/ },
    showMask: true,
  })

  const handleClick = () => setOpen(!open)
  const handleClose = (country: Country) => {
    return () => {
      selectCountry(country)
      setValue(props.id, country.phone)
      setOpen(false)
    }
  }

  return (
    <>
      <TextField
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start" sx={{ cursor: "pointer" }}>
                <Box
                  component="img"
                  ref={ref}
                  sx={{ paddingRight: 1 }}
                  loading="lazy"
                  onClick={handleClick}
                  width="20"
                  srcSet={`https://flagcdn.com/w40/${selectedCountry.code.toLowerCase()}.png 2x`}
                  src={`https://flagcdn.com/w20/${selectedCountry.code.toLowerCase()}.png`}
                  alt=""
                />
              </InputAdornment>
            ),
          },
        }}
        {...props}
        inputRef={inputRef}
      />
      <Menu anchorEl={ref.current} open={open} onClose={handleClose} onClick={handleClick}>
        {countries.map((country) => (
          <MenuItem key={country.code} onClick={handleClose(country)}>
            <Box component="li" sx={{ "& > img": { mr: 2, flexShrink: 0 } }}>
              <img
                loading="lazy"
                width="20"
                srcSet={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png 2x`}
                src={`https://flagcdn.com/w20/${country.code.toLowerCase()}.png`}
                alt=""
              />
              {t(`country.${country.label}`)} ({country.code}) {country.phone}
            </Box>
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}
