# Migrating to OIDC Authentication

## Overview

Priority is transitioning to OpenID Connect (OIDC) for authentication. If you currently use basic authentication or access tokens, you will need to update your application to support OIDC.

This guide explains the new authentication process and the information you need to exchange with Priority Software.

---

## What is OIDC?

OpenID Connect (OIDC) is a modern authentication protocol built on OAuth 2.0. It provides:

- **Enhanced Security**: Token-based authentication with short-lived access tokens
- **Standardization**: Industry-standard protocol widely supported across platforms
- **Single Sign-On (SSO)**: Simplified user experience across multiple applications
- **Improved User Management**: Centralized authentication and authorization

---

## Authentication Overview

### Current Authentication Methods 
- Basic Authentication (username/password) - Deprecated
- Personal Access Tokens

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
- The Redirect URI must be an HTTPS URL 
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
- Contact Priority Support through [**Priority Xpert**](support.priority-software.com)
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

### Optional: Migrate Existing Users to PAT Authentication

If you are concerned you will not be able to migrate to OIDC in time, you should migrate existing users to personal access token (PAT) authentication in the interim.

---

## Implementation Guide

### Authentication Flow

The OIDC authentication flow follows these steps:

1. **User Initiates Login**: User clicks "Login" in your application
2. **Generate PKCE Parameters**: Your app creates a code verifier and code challenge for enhanced security
3. **Redirect to Priority**: Your app redirects the user to Priority's authorization endpoint with the code challenge
4. **User Authenticates**: User logs in via Priority's authentication page (branded with your logo/background)
5. **Authorization Code**: Priority redirects user back to your Redirect URI with an authorization code
6. **Token Exchange**: Your application exchanges the authorization code for tokens (server-side), proving the original request with the code verifier
7. **Access Granted**: Use the access token to make API calls on behalf of the user

### What is PKCE?

**PKCE** (Proof Key for Code Exchange, pronounced "pixie") is a security extension that protects against authorization code interception attacks. It's especially important for public clients like mobile apps and single-page applications.

**How PKCE works:**
1. Your app generates a random `code_verifier` (43-128 character string)
2. Creates a `code_challenge` by hashing the verifier: `BASE64URL(SHA256(code_verifier))`
3. Sends the `code_challenge` with the authorization request
4. Sends the original `code_verifier` when exchanging the code for tokens
5. Priority validates that the verifier matches the original challenge

This ensures that even if an attacker intercepts the authorization code, they cannot exchange it for tokens without the original code verifier.

### Key Endpoints

Priority will provide you with the following endpoints:

- **Authorization Endpoint**: Where users are redirected to log in
- **Token Endpoint**: Where authorization codes are exchanged for tokens

### Libraries and SDKs

**We strongly recommend using established OIDC/OAuth libraries** rather than implementing the protocol manually. These libraries handle the complexities of PKCE, token management, and security best practices for you.

#### JavaScript/Node.js
- [openid-client](https://github.com/panva/node-openid-client) - Certified OpenID Connect client library
- [Passport.js with OpenID Connect Strategy](http://www.passportjs.org/) - Popular authentication middleware

#### Python
- [Authlib](https://authlib.org/) - Comprehensive OAuth and OIDC library
- [PyOIDC](https://github.com/OpenIDC/pyoidc) - Complete OIDC implementation

Using these libraries will significantly reduce implementation time, minimize security risks, and ensure compatibility with the OIDC standard.

### Code Implementation

#### 1. Generate PKCE Parameters

Before making the authorization request, generate PKCE parameters:

*The following example uses JavaScript*

```javascript
// Generate code verifier (random string, 43-128 characters)
function generateCodeVerifier() {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return base64UrlEncode(array);
}

// Generate code challenge from verifier
async function generateCodeChallenge(verifier) {
  const encoder = new TextEncoder();
  const data = encoder.encode(verifier);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return base64UrlEncode(hash);
}

const codeVerifier = generateCodeVerifier();
const codeChallenge = await generateCodeChallenge(codeVerifier);
// Store codeVerifier securely for later use
```

#### 2. Authorization Request

Redirect the user to Priority's authorization endpoint:

```
https://auth.priority.example.com/authorize?
  response_type=code&
  client_id=YOUR_CLIENT_ID&
  redirect_uri=YOUR_REDIRECT_URI&
  scope=YOUR_SCOPE&
  audience=customer_app&
  code_challenge=CODE_CHALLENGE&
  code_challenge_method=S256
```

**Parameters:**
- `response_type`: Always `code` for authorization code flow
- `client_id`: The Client ID provided by Priority
- `redirect_uri`: Must match your registered Redirect URI exactly
- `scope`: The scope(s) provided by Priority
- 'audience': Always 'customer_app'
- `code_challenge`: The generated code challenge from step 1
- `code_challenge_method`: Always `S256` (SHA-256 hashing)

#### 3. Handle Callback

After authentication, Priority redirects to your Redirect URI with a code:

```
https://myapp.example.com/callback?code=AUTHORIZATION_CODE
```

Retrieve the stored `code_verifier` and proceed to exchange the code for tokens.

#### 4. Token Exchange

Make a POST request to the token endpoint (server-side), including the code verifier:

```http
POST /token HTTP/1.1
Host: auth.priority.example.com
Content-Type: application/x-www-form-urlencoded

grant_type=authorization_code&
code=AUTHORIZATION_CODE&
redirect_uri=YOUR_REDIRECT_URI&
client_id=YOUR_CLIENT_ID&
client_secret=YOUR_CLIENT_SECRET&
code_verifier=CODE_VERIFIER
```

**Note:** The `code_verifier` is the original random string generated in step 1, not the hashed challenge.

**Response:**

```json
{
  "access_token": "eyJhbGciOiJSUzI1NiIs...",
  "token_type": "Bearer",
  "expires_in": 3600,
  "id_token": "eyJhbGciOiJSUzI1NiIs..."
}
```

#### 5. Use Access Token

Include the access token in REST API requests:

```http
GET /api/resource HTTP/1.1
Host: api.priority.example.com
Authorization: Bearer YOUR_ACCESS_TOKEN
```

Or in Web SDK calls:

```javascript
config = {
  username: <your token>,
  password: "bearer",
  ...
}

#### 6. Token Expiration and Re-authentication

When the access token expires, reinitiate the login flow (steps 1-4). If the user's session is still active with Priority, they will be automatically redirected back with a new authorization code without needing to re-enter credentials, and a new token will be issued.

**Implementation tip:** Monitor token expiration and proactively reinitiate authentication before the token expires to ensure seamless user experience.

---

## Testing

### Development Environment

For development and testing:
- You can set up a separate username and password with the Priority Accounts system. The account will suffice for testing authentication, but will not be authorized for any actions (such as API calls).
- Never use production credentials in development

### Testing Checklist

- [ ] PKCE code verifier and challenge are generated correctly
- [ ] Authorization redirect includes code_challenge parameter
- [ ] Token exchange includes code_verifier parameter
- [ ] Token exchange succeeds with valid PKCE proof
- [ ] Access token is stored securely
- [ ] API calls include proper Authorization header
- [ ] Re-authentication flow works when token expires
- [ ] Silent re-authentication works with active session
- [ ] Error handling for failed authentication
- [ ] Logout/session cleanup works properly

---

## Security Best Practices

1. **Always Use PKCE**: Required for all clients to prevent code interception attacks
2. **Protect Client Secret**: Never expose in client-side code or version control
3. **Secure Code Verifier Storage**: Store the code verifier securely (session storage, memory) until token exchange
4. **Use HTTPS**: Always use HTTPS for Redirect URIs 
5. **Validate Tokens**: Verify token signatures and claims
6. **Store Tokens Securely**: Use secure storage mechanisms appropriate for your platform
7. **Monitor Token Expiration**: Proactively reinitiate authentication before tokens expire
8. **Handle Errors Gracefully**: Provide clear error messages to users

---


### Getting Help

If you encounter issues during migration:

1. Review this documentation thoroughly
2. Check your OIDC library documentation
3. Verify all credentials and configuration


---


## Additional Resources

- [OpenID Connect Specification](https://openid.net/specs/openid-connect-core-1_0.html)
- [OAuth 2.0 RFC 6749](https://tools.ietf.org/html/rfc6749)
- [OIDC Debugger Tool](https://oidcdebugger.com/)


