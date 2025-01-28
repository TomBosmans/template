export type Country = {
  code: string
  label: string
  phone: string
}

const countries: readonly Country[] = [
  { code: "BE", label: "belgium", phone: "+32 __ ___ ____" },
  { code: "NL", label: "netherlands", phone: "+31 __ ___ ____" },
  { code: "FR", label: "france", phone: "+33 _ __ __ __ __" },
  { code: "DE", label: "germany", phone: "+49 ___ ________" },
  { code: "LU", label: "luxembourg", phone: "+352 ___ ______" },
  { code: "GB", label: "united_kingdom", phone: "+44 ____ ______" },
]

export default countries
