import Typography from "./Typography"

export const AllTypography = () => {
  return (
    <div className="space-y-4 p-6 bg-base-200">
      <Typography variant="h1">Heading 1</Typography>
      <Typography variant="h2">Heading 2</Typography>
      <Typography variant="h3">Heading 3</Typography>
      <Typography variant="p">This is a paragraph.</Typography>
      <Typography variant="small">This is small text.</Typography>
    </div>
  )
}

AllTypography.storyName = "Typography"
