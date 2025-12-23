import { createLink } from "@tanstack/react-router"
import { Drawer, DrawerMenu, DrawerMenuItem, DrawerToggle, Navbar } from "components"
import { useId } from "react"
import useI18n from "../../i18n/I18n.hook"
import ThemeToggler from "../../theme/ThemeToggler"
import NavLink from "../components/NavLink"

const MenuItem = createLink(DrawerMenuItem)

export default function DashboardLayout({ children }: React.PropsWithChildren) {
  const id = useId()
  const { t } = useI18n()

  return (
    <Drawer
      id={id}
      content={
        <>
          <Navbar
            start={
              <>
                <DrawerToggle id={id} />
                <NavLink to="/dashboard" variant="text" className="text-xl">
                  Template
                </NavLink>
              </>
            }
            end={<ThemeToggler />}
          />
          {children}
        </>
      }
      sideBarContent={
        <DrawerMenu>
          <MenuItem
            activeProps={{ isActive: true }}
            label={t("dashboard.menu.dashboard")}
            to="/dashboard"
            icon="home"
          />
          <MenuItem
            activeProps={{ isActive: true }}
            label={t("dashboard.menu.users")}
            to="/users"
            icon="home"
          />
          <MenuItem
            activeProps={{ isActive: true }}
            className="mt-auto"
            label={t("dashboard.menu.users")}
            to="/users"
            icon="home"
          />
        </DrawerMenu>
      }
    />
  )
}
