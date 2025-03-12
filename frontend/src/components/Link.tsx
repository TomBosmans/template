import Button, { ButtonProps } from "@mui/material/Button";
import MuiLink, { LinkProps as MuiLinkProps } from "@mui/material/Link";
import { Link as RLink, LinkProps as RLinkProps } from "@tanstack/react-router";

type ButtonLinkProps = { button: "outlined" | "text" | "contained" } & 
  Omit<ButtonProps, "variant"> & 
  Omit<RLinkProps, "variant">;

type LinkProps = { button?: undefined } & 
  Omit<MuiLinkProps, "variant"> & 
  Omit<RLinkProps, "variant">;

type Props = ButtonLinkProps | LinkProps;

export default function Link({ button, ...props }: Props) {
  if (button) {
    return <Button component={RLink} variant={button} fullWidth={button !== "text"} {...props as ButtonLinkProps} />
  } else {
    return (
      <MuiLink component={RLink} {...props as LinkProps} />
    )
  }
}
