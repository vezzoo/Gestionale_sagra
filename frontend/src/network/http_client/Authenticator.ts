export default interface Authenticator{
    doAuthentication(headers, body, oth): Promise<boolean>;
}
