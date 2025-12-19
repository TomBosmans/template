import type { Meta, StoryObj } from "@storybook/react-vite"
import Table, { type TableColumn } from "./Table"

const meta = {
  component: Table,
  tags: ["autodocs"],
} satisfies Meta<typeof Table>

export default meta

type Story = StoryObj<typeof meta>

type Person = {
  firstName: string
  lastName: string
  age: number
  visits: number
  status: string
  progress: number
}

const data: Person[] = [
  {
    firstName: "tanner",
    lastName: "linsley",
    age: 24,
    visits: 100,
    status: "In Relationship",
    progress: 50,
  },
  {
    firstName: "tandy",
    lastName: "miller",
    age: 40,
    visits: 40,
    status: "Single",
    progress: 80,
  },
  {
    firstName: "joe",
    lastName: "dirte",
    age: 45,
    visits: 20,
    status: "Complicated",
    progress: 10,
  },
]

const columns: TableColumn<Person> = {
  firstName: {
    header: () => <span>First Name</span>,
    cell: (info) => info.getValue(),
  },
  lastName: {
    header: () => <span>Last Name</span>,
    cell: (info) => <i>{info.getValue()}</i>,
  },
  age: {
    header: () => "Age",
    cell: (info) => info.renderValue(),
  },
  visits: {
    header: () => <span>Visits</span>,
    cell: (info) => info.getValue(),
  },
  progress: {
    header: () => <span>progress</span>,
    cell: (info) => info.getValue(),
  },
  status: {
    header: () => "Status",
    cell: (info) => info.getValue(),
  },
}

export const Default: Story = {
  // biome-ignore lint/suspicious/noExplicitAny: We use render so not needed...
  args: {} as any,
  render: () => {
    return <Table data={data} columns={columns} />
  },
}

export const Zebra: Story = {
  // biome-ignore lint/suspicious/noExplicitAny: We use render so not needed...
  args: {} as any,
  render: () => {
    return <Table zebra data={data} columns={columns} />
  },
}
