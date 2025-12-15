import { createLink } from "@tanstack/react-router"
import { Link, type LinkProps } from "components"
import { forwardRef } from "react"

export type NavLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & LinkProps

const NavLink = createLink(
  forwardRef<HTMLAnchorElement, NavLinkProps>((props, ref) => {
    return <Link ref={ref} {...props} />
  }),
)

export default NavLink
