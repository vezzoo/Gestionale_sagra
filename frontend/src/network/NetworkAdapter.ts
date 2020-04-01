import Data from "./Data";

export default interface NetworkAdapter{
    /*basic socket server*/
    pause(isPaused?: boolean): Promise<NetworkAdapter>;
    bind(address: string, port: number): Promise<NetworkAdapter>;
    connect(address: string, port:number): Promise<NetworkAdapter>;
    close(): Promise<NetworkAdapter>;

    /*client functions for connection oriented and udp*/
    send(data: Data): Promise<NetworkAdapter>;
    send(data: Data, address: string, port: number): Promise<NetworkAdapter>;

    /*udp functions*/
    joinGroup(name: string): Promise<NetworkAdapter>;
    leaveGroup(name: string): Promise<NetworkAdapter>;
    do_multicast_loopback(mode: boolean): Promise<NetworkAdapter>;
    allow_broadcast_recv(state: boolean): Promise<NetworkAdapter>;

    /*callbacks*/
    onRecv(cb: (na: NetworkAdapter, data: ArrayBuffer, oth: any) => void): void;
    onRecvErr(cb: (na: NetworkAdapter, code: number) => void): void;
}

