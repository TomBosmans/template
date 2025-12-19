import { Link, Table } from "components"
import Can from "../auth/Can"
import useI18n from "../i18n/I18n.hook"
import { useUsers } from "./users.state"

export default function UsersTable() {
  const { t } = useI18n()
  const users = useUsers()

  return (
    <Can I="read" a="User">
      <Table
        data={users}
        columns={{
          firstName: {
            header: () => t("entities.user.firstName"),
            cell: (info) => info.getValue(),
          },
          lastName: {
            header: () => t("entities.user.lastName"),
            cell: (info) => info.getValue(),
          },
          email: {
            header: () => t("entities.user.email"),
            cell: (info) => <Link href={`mailto:${info.getValue()}`}>{info.getValue()}</Link>,
          },
          role: {
            header: () => t("entities.user.role"),
            cell: (info) => info.getValue(),
          },
        }}
      />
    </Can>
  )
}
