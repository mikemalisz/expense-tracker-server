import superagent from 'superagent'
// import jwt from 'jsonwebtoken'
// import jwksClient from 'jwks-rsa'
import createRemoteJWKSet from 'jose/jwks/remote'
import jwtVerify from 'jose/jwt/verify'

export class TokenService {
   static appleIdUrl = 'https://appleid.apple.com'
   static appleKeysUrl = `${TokenService.appleIdUrl}/auth/keys`

   async verifyIdentityToken(identityToken: string, clientId: string): Promise<IdentityToken> {
      // decode and verify identity token was from Apple
      const JWKS = createRemoteJWKSet(new URL(TokenService.appleKeysUrl))
      const result = await jwtVerify(identityToken, JWKS)
      const payload = (result.payload || {}) as Partial<IdentityToken>

      // extract identity token values from payload
      const { iss, aud, exp = 0 } = payload

      /*
      Guidelines for verifying identity token from Apple: https://developer.apple.com/documentation/sign_in_with_apple/sign_in_with_apple_rest_api/verifying_a_user
      Make sure token from client is still valid
      */
      const isIssuerVerified = iss?.includes(TokenService.appleIdUrl)
      const isClientIdVerified = aud === clientId
      const isTokenExpirationTimeValid = (new Date()) <= (new Date(exp * 1000))

      if (isIssuerVerified && isClientIdVerified && isTokenExpirationTimeValid) {
         return payload as IdentityToken
      } else {
         throw new Error("Provided identity token invalid")
      }
   }
}