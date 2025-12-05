type ObjectStoragePolicy = {
  Version: string // usually "2012-10-17"
  Statement: Array<{
    Sid?: string
    Effect: "Allow" | "Deny"
    Principal: string | { [key: string]: unknown } | "*"
    Action: string | string[]
    Resource: string | string[]
    Condition?: Record<string, unknown>
  }>
}

export default ObjectStoragePolicy
