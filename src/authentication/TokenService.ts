import superagent from 'superagent'
// import jwt from 'jsonwebtoken'
// import jwksClient from 'jwks-rsa'
import createRemoteJWKSet from 'jose/jwks/remote'
import jwtVerify from 'jose/jwt/verify'

export class TokenService {
   static appleKeysUrl = 'https://appleid.apple.com/auth/keys'

   async verifyToken(identityToken: string) {
      const JWKS = createRemoteJWKSet(new URL(TokenService.appleKeysUrl))
      const result = await jwtVerify(identityToken, JWKS)
      console.log(result)
   }

   async requestCertificates() {
   }
}