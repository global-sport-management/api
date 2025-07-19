import * as jwt from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';

const client = jwksClient({
  jwksUri: 'https://appleid.apple.com/auth/keys',
});

export async function verifyAppleToken(identityToken: string): Promise<any> {
  const decoded = jwt.decode(identityToken, { complete: true });

  if (!decoded || typeof decoded === 'string') {
    throw new Error('Invalid Apple token format');
  }

  const kid = decoded.header.kid;
  const alg = decoded.header.alg;

  const key = await client.getSigningKey(kid);
  const signingKey = key.getPublicKey();

  return jwt.verify(identityToken, signingKey, {
    algorithms: [alg as jwt.Algorithm],
  }) as any;
}
