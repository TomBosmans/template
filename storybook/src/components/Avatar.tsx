import { Avatar as BaseAvatar } from "@base-ui-components/react/avatar"

export type Props = { src?: string; fallback: string }

export default function Avatar({ src, fallback }: Props) {
  return (
    <BaseAvatar.Root render={<div />} className="avatar avatar-placeholder">
      <div className="bg-neutral text-neutral-content w-10 rounded-full">
        <BaseAvatar.Image src={src} />
        <BaseAvatar.Fallback className="text-xl">{fallback}</BaseAvatar.Fallback>
      </div>
    </BaseAvatar.Root>
  )
}
