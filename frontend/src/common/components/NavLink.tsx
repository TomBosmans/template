import { createLink } from "@tanstack/react-router"
import { Link, type LinkProps } from "components"
import type { AnchorHTMLAttributes, Ref } from "react"

export type NavLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> &
  LinkProps & {
    ref?: Ref<HTMLAnchorElement>
  }

const NavLink = createLink((props: NavLinkProps) => {
  return <Link {...props} />
})

export default NavLink
