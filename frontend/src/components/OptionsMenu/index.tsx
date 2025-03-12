import Divider, { dividerClasses } from '@mui/material/Divider';
import Menu from '@mui/material/Menu';
import { paperClasses } from '@mui/material/Paper';
import { listClasses } from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon, { listItemIconClasses } from '@mui/material/ListItemIcon';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import MenuButton, { MenuButtonProps } from './MenuButton';
import MenuItem from './MenuItem';
import { type Option } from "./types"
import { useState } from 'react';

export default function OptionsMenu({ options }: { options: Array<Option[]> }) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  const handleClick: MenuButtonProps["onClick"] = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <MenuButton
        onClick={handleClick}
        sx={{ borderColor: 'transparent' }}
      >
        <MoreVertRoundedIcon />
      </MenuButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        sx={{
          [`& .${listClasses.root}`]: {
            padding: '4px',
          },
          [`& .${paperClasses.root}`]: {
            padding: 0,
          },
          [`& .${dividerClasses.root}`]: {
            margin: '4px -4px',
          },
        }}
      >
        {
          options.map((optionArray, indexA) => {
            return optionArray.map((option, indexB) => {
              return (
                <>
                  <MenuItem
                    onClick={option.onClick}
                    sx={{
                      [`& .${listItemIconClasses.root}`]: {
                        ml: 'auto',
                        minWidth: 0,
                      },
                    }}
                  >
                    <ListItemText>{option.label}</ListItemText>
                    {
                      option.icon && (
                        <ListItemIcon>
                          <option.icon fontSize="small" />
                        </ListItemIcon>
                      )
                    }
                  </MenuItem>
                  {indexB === optionArray.length - 1 && indexA !== options.length - 1 && <Divider />}
                </>
              )
            })
          })
        }
      </Menu>
    </>
  );
}
