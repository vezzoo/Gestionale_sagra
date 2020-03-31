export default interface Authenticator{
    doAuthentication(headers, body, oth): boolean;
}
