import Data from "./Data";

export default interface NetworkAdapter{
    /*basic socket server*/
    pause(isPaused?: boolean): Promise<void>;
    bind(address: string, port: number): Promise<void>;
    connect(address: string, port:number): Promise<void>;
    close(): Promise<void>;

    /*client functions for connection oriented and udp*/
    send(data: Data): Promise<number>;
    send(data: Data, address: string, port: number): Promise<number>;

    /*udp functions*/
    joinGroup(name: string): Promise<void>;
    leaveGroup(name: string): Promise<void>;
    do_multicast_loopback(mode: boolean): Promise<void>;
    allow_broadcast_recv(state: boolean): Promise<void>;
}

