export default function extractToken(headerAuthorization: string) {
  return headerAuthorization && headerAuthorization.split(' ')[1];
}
