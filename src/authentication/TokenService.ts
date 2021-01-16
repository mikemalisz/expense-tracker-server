import superagent from 'superagent'

export class TokenService {
   static appleKeysUrl = 'https://appleid.apple.com/auth/keys'

   async verifyToken(identityToken: string) {
   }

   async requestCertificates() {
      const response = await superagent.get(TokenService.appleKeysUrl)
      console.log(response.body)
   }
}