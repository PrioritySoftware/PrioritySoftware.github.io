# Migrating to OIDC Authentication

## Overview

Priority is transitioning to OpenID Connect (OIDC) for authentication. If you currently use basic authentication or access tokens, you will need to update your application to support OIDC.

This guide explains the migration process and the information you need to exchange with Priority Software.

---

## What is OIDC?

OpenID Connect (OIDC) is a modern authentication protocol built on OAuth 2.0. It provides:

- **Enhanced Security**: Token-based authentication with short-lived access tokens
- **Standardization**: Industry-standard protocol widely supported across platforms
- **Single Sign-On (SSO)**: Simplified user experience across multiple applications
- **Improved User Management**: Centralized authentication and authorization

---

## Migration Overview

### Current Authentication Methods 
- Basic Authentication (username/password) (Deprecated Soon)
- Access Tokens

### New Authentication Method
- OIDC (OpenID Connect)

---

## Registration Process

To enable OIDC authentication for your application, you must register with Priority Software.

### Step 1: Prepare Your Application Information

Before registering, gather the following information about your application:

#### Required Information

| Item | Description | Example |
|------|-------------|---------|
| **Application Name** | The name of your application as it will appear to users | "My Priority Integration" |
| **Redirect URI** | The callback URL where users will be redirected after authentication | `https://myapp.example.com/callback` |
| **Logo** | Your application logo (recommended size: 200x200px, PNG or SVG) | Upload image file |
| **Background** | Custom background image for the authentication page (optional) | Upload image file |

**Important Notes:**
- The Redirect URI must be an HTTPS URL (HTTP only allowed for localhost development)
- Ensure the Redirect URI exactly matches the callback endpoint in your application
- Logo and background images will be displayed on the Priority authentication page

### Step 2: Submit Registration Request

Open a service ticket with Priority Support and include:

1. Your application name
2. Redirect URI(s)
3. Logo file (attached)
4. Background image file (attached, if applicable)
5. Brief description of your integration

**How to Open a Service Ticket:**
- Contact Priority Support through your standard support channel
- Subject: "OIDC Application Registration Request"
- Include all required information listed above

### Step 3: Receive Your Credentials

Once your application is registered, Priority Software will provide you with the following credentials:

| Credential | Description | Security Notes |
|------------|-------------|----------------|
| **Client ID** | Public identifier for your application | Can be stored in client-side code |
| **Client Secret** | Secret key for authenticating your application | **Must be kept secure** - store server-side only |
| **Scope** | Permissions your application can request | Use only the scopes provided |

**⚠️ Security Warning:**
- **Never** expose the Client Secret in client-side code or public repositories
- Store the Client Secret securely (environment variables, secure vault, etc.)
- Rotate credentials immediately if compromised

---

## Implementation Guide

### Authentication Flow

The OIDC authentication flow follows these steps:

1. **User Initiates Login**: User clicks "Login" in your application
2. **Redirect to Priority**: Your app redirects the user to Priority's authorization endpoint
3. **User Authenticates**: User logs in via Priority's authentication page (branded with your logo/background)
4. **Authorization Code**: Priority redirects user back to your Redirect URI with an authorization code
5. **Token Exchange**: Your application exchanges the authorization code for tokens (server-side)
6. **Access Granted**: Use the access token to make API calls on behalf of the user

### Key Endpoints

Priority will provide you with the following endpoints:

- **Authorization Endpoint**: Where users are redirected to log in
- **Token Endpoint**: Where authorization codes are exchanged for tokens
- **UserInfo Endpoint**: Where you can retrieve user profile information
- **Discovery Document**: OIDC configuration (typically at `/.well-known/openid-configuration`)

### Code Implementation

#### 1. Authorization Request

Redirect the user to Priority's authorization endpoint:

```
https://auth.priority.example.com/authorize?
  response_type=code&
  client_id=YOUR_CLIENT_ID&
  redirect_uri=YOUR_REDIRECT_URI&
  scope=YOUR_SCOPE&
  state=RANDOM_STATE_VALUE
```

**Parameters:**
- `response_type`: Always `code` for authorization code flow
- `client_id`: The Client ID provided by Priority
- `redirect_uri`: Must match your registered Redirect URI exactly
- `scope`: The scope(s) provided by Priority
- `state`: Random value to prevent CSRF attacks

#### 2. Handle Callback

After authentication, Priority redirects to your Redirect URI with a code:

```
https://myapp.example.com/callback?code=AUTHORIZATION_CODE&state=RANDOM_STATE_VALUE
```

Verify the `state` parameter matches what you sent, then exchange the code for tokens.

#### 3. Token Exchange

Make a POST request to the token endpoint (server-side):

```http
POST /token HTTP/1.1
Host: auth.priority.example.com
Content-Type: application/x-www-form-urlencoded

grant_type=authorization_code&
code=AUTHORIZATION_CODE&
redirect_uri=YOUR_REDIRECT_URI&
client_id=YOUR_CLIENT_ID&
client_secret=YOUR_CLIENT_SECRET
```

**Response:**

```json
{
  "access_token": "eyJhbGciOiJSUzI1NiIs...",
  "token_type": "Bearer",
  "expires_in": 3600,
  "refresh_token": "eyJhbGciOiJSUzI1NiIs...",
  "id_token": "eyJhbGciOiJSUzI1NiIs..."
}
```

#### 4. Use Access Token

Include the access token in API requests:

```http
GET /api/resource HTTP/1.1
Host: api.priority.example.com
Authorization: Bearer YOUR_ACCESS_TOKEN
```

#### 5. Refresh Tokens

When the access token expires, use the refresh token to obtain a new one:

```http
POST /token HTTP/1.1
Host: auth.priority.example.com
Content-Type: application/x-www-form-urlencoded

grant_type=refresh_token&
refresh_token=YOUR_REFRESH_TOKEN&
client_id=YOUR_CLIENT_ID&
client_secret=YOUR_CLIENT_SECRET
```

---

## Libraries and SDKs

We recommend using established OIDC/OAuth libraries rather than implementing the protocol manually:

### JavaScript/Node.js
- [openid-client](https://github.com/panva/node-openid-client)
- [Passport.js with OpenID Connect Strategy](http://www.passportjs.org/)

### Python
- [Authlib](https://authlib.org/)
- [PyOIDC](https://github.com/OpenIDC/pyoidc)

### .NET/C#
- [IdentityModel.OidcClient](https://github.com/IdentityModel/IdentityModel.OidcClient)
- [Microsoft.Identity.Client (MSAL)](https://github.com/AzureAD/microsoft-authentication-library-for-dotnet)

### Java
- [Nimbus OAuth 2.0 SDK with OpenID Connect extensions](https://connect2id.com/products/nimbus-oauth-openid-connect-sdk)
- [Spring Security OAuth](https://spring.io/projects/spring-security-oauth)

### PHP
- [OAuth 2.0 Client by The League of Extraordinary Packages](https://oauth2-client.thephpleague.com/)

---

## Testing

### Development Environment

For development and testing:
- You may use `http://localhost:PORT/callback` as a Redirect URI
- Request separate credentials for development/staging environments
- Never use production credentials in development

### Testing Checklist

- [ ] Authorization redirect works correctly
- [ ] State parameter is validated
- [ ] Token exchange succeeds
- [ ] Access token is stored securely
- [ ] API calls include proper Authorization header
- [ ] Token refresh works before expiration
- [ ] Error handling for failed authentication
- [ ] Logout/session cleanup works properly

---

## Security Best Practices

1. **Protect Client Secret**: Never expose in client-side code or version control
2. **Validate State Parameter**: Prevent CSRF attacks
3. **Use HTTPS**: Always use HTTPS for Redirect URIs (except localhost)
4. **Validate Tokens**: Verify token signatures and claims
5. **Store Tokens Securely**: Use secure storage mechanisms
6. **Implement Token Refresh**: Don't wait for access token to expire
7. **Handle Errors Gracefully**: Provide clear error messages to users
8. **Regular Credential Rotation**: Periodically rotate Client Secret

---

## Troubleshooting

### Common Issues

| Issue | Possible Cause | Solution |
|-------|---------------|----------|
| "Invalid Redirect URI" | Redirect URI doesn't match registered value | Ensure exact match, including trailing slashes |
| "Invalid Client" | Incorrect Client ID or Secret | Verify credentials, check for typos |
| "Invalid Grant" | Authorization code expired or already used | Authorization codes are single-use, generate new code |
| "Insufficient Scope" | Requesting scopes not granted | Use only the scopes provided by Priority |
| Token expired errors | Access token has expired | Implement token refresh logic |

### Getting Help

If you encounter issues during migration:

1. Review this documentation thoroughly
2. Check your OIDC library documentation
3. Verify all credentials and configuration
4. Open a support ticket with Priority Support including:
   - Your Application Name/Client ID
   - Error messages (without exposing secrets)
   - Steps to reproduce the issue

---

## Migration Timeline

**Important Dates:**
- [TBD] - OIDC registration opens
- [TBD] - Basic authentication deprecation warning
- [TBD] - Basic authentication disabled

Plan your migration accordingly to avoid service interruption.

---

## Additional Resources

- [OpenID Connect Specification](https://openid.net/specs/openid-connect-core-1_0.html)
- [OAuth 2.0 RFC 6749](https://tools.ietf.org/html/rfc6749)
- [OIDC Debugger Tool](https://oidcdebugger.com/)

---

## Support

For questions or assistance with OIDC migration:

- **Email**: [support email]
- **Support Portal**: [support portal URL]
- **Documentation**: [documentation URL]
