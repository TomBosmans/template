import type RequestRegistry from "#app/request.registry.ts"
import UnauthenticatedException from "#lib/exceptions/unauthenticated.exception.ts"
import UnauthorizedException from "#lib/exceptions/unauthorized.exception.ts"
import type Middleware from "#lib/http/middleware.type.ts"

/**
 * Protects against CSRF (Cross-Site Request Forgery) attacks by validating
 * the HTTP method and the request's `Origin` header.
 *
 * - Allows safe HTTP methods (`GET`, `HEAD`) without origin checks.
 * - For other methods (`POST`, `PUT`, `DELETE`, etc.), it verifies that the
 *   request's `Origin` header matches the trusted domain.
 */
function csrfProtection(method: string, originHeader: string | null, trusedOrigin: string): void {
  console.log(originHeader)
  if (method === "GET" || method === "HEAD") return
  if (originHeader === trusedOrigin) return
  throw new UnauthorizedException("Invalid origin")
}

/**
 * Authentication and CSRF guard middleware.
 *
 * Ensures that incoming requests:
 * 1. Pass CSRF validation.
 * 2. Contain a valid session token stored in cookies.
 * 3. Correspond to an authenticated session in the authentication service.
 *
 * - If no session cookie is found or the session is invalid, an `UnauthenticatedException` is thrown.
 * - If the request fails CSRF checks, an `UnauthorizedException` is thrown.
 * - On success, the middleware refreshes the session cookie and registers the session in the DI container scope.
 */
const authGuard: Middleware<RequestRegistry> = async ({ request, response, container }) => {
  const config = container.resolve("config")
  csrfProtection(request.method, request.getHeader("Origin"), config.frontend.url)

  const token = request.getCookie("session")
  if (token === null) throw new UnauthenticatedException()

  const authService = container.resolve("authService")
  const session = await authService.authenticate(token)
  if (session === null) throw new UnauthenticatedException()

  const sessionCookie = authService.createSessionCookie({ token, expiresAt: session.expiresAt })
  response.headers = {
    ...response.headers,
    ...sessionCookie,
  }

  container.register(session, { name: "session", type: "value" })

  return response
}

export default authGuard
