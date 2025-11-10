import {
  Button,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Text,
} from "@react-email/components"

interface WelcomeEmailProps {
  name: string
  signupDate: string
  supportEmail?: string
}

export default function WelcomeEmail({ name, supportEmail }: WelcomeEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Welcome to our platform, {name}!</Preview>
      <Container style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
        <Heading style={{ color: "#333", fontSize: "24px", marginBottom: "16px" }}>
          Welcome, {name}!
        </Heading>
        <Text style={{ fontSize: "16px", color: "#555", marginBottom: "16px" }}>
          Thank you for signing up. We're excited to have you on board!
        </Text>
        <Text style={{ fontSize: "16px", color: "#555", marginBottom: "16px" }}>
          You can get started by visiting your dashboard:
        </Text>
        <Button
          href="https://example.com/dashboard"
          style={{
            padding: "12px 20px",
            backgroundColor: "#0070f3",
            color: "#fff",
            textDecoration: "none",
            borderRadius: "6px",
            display: "inline-block",
            fontWeight: "bold",
          }}
        >
          Go to Dashboard
        </Button>{" "}
        <Text style={{ fontSize: "14px", color: "#999", marginTop: "24px" }}>
          If you have any questions, feel free to contact us at{" "}
          <Link href={`mailto:${supportEmail}`} style={{ color: "#0070f3" }}>
            {supportEmail}
          </Link>
          .
        </Text>
      </Container>
    </Html>
  )
}
