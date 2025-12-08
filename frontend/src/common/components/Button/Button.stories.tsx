import Button from "./Button"

export const AllButtons = () => {
  const variants = ["contained", "outlined", "text"] as const
  const colors = ["primary", "secondary", "error"] as const

  return (
    <div className="space-y-6 p-6 bg-base-200">
      {variants.map((variant) => (
        <div key={variant} className="space-x-4">
          {colors.map((color) => (
            <Button key={color} variant={variant} color={color}>
              {`${variant} ${color}`}
            </Button>
          ))}
          <Button variant={variant} disabled>
            {`${variant} disabled`}
          </Button>
          <Button variant={variant} color="primary" wide>
            {`${variant} wide`}
          </Button>
        </div>
      ))}
    </div>
  )
}

AllButtons.storyName = "Button Variants"
