import type { SVGProps } from "./Icon.types"

export default function HomeIcon({ title, ...props }: SVGProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      strokeLinejoin="round"
      strokeLinecap="round"
      strokeWidth="2"
      fill="none"
      stroke="currentColor"
      className="my-1.5 inline-block size-4"
      {...props}
    >
      <title>{title}</title>
      <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
      <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    </svg>
  )
}
