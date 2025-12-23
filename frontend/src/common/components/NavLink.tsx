import { createLink } from "@tanstack/react-router"
import { Link, type LinkProps } from "components"
import type { AnchorHTMLAttributes, Ref } from "react"

type Props = AnchorHTMLAttributes<HTMLAnchorElement> &
  LinkProps & {
    ref?: Ref<HTMLAnchorElement>
  }

const NavLink = createLink((props: Props) => {
  return <Link {...props} />
})

export type NavLinkProps = React.ComponentProps<typeof NavLink>
export default NavLink
