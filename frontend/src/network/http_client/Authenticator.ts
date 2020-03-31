export default interface Authenticator{
    doAuthentication(headers, body, oth): void;
}
