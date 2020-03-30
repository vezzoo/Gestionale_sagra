import NetworkAdapter from "../NetworkAdapter";
import Data from "../Data";

export default class UdpSocket implements NetworkAdapter{
    get last_sent() {
        return this._last_sent;
    }

    private socket_num: any;
    private current_state_pause = false;
    private _last_sent;

    constructor(socket_num: any) {
        this.socket_num = socket_num;
    }

    static create(persistent?: boolean, buf_size?: number): Promise<NetworkAdapter> {
        return new Promise<NetworkAdapter>((resolve, reject) => {
            globalThis.chrome.sockets.udp.create({persistent: persistent ?? false, bufferSize: buf_size ?? 4096}, (o) => {
                resolve(new UdpSocket(o.socketId));
            });
        });
    }

    allow_broadcast_recv(state: boolean): Promise<NetworkAdapter> {
        return new Promise<NetworkAdapter>((resolve, reject) => {
            globalThis.chrome.sockets.udp.setBroadcast(this.socket_num, state, (res) => res < 0 ? reject("OS CALL ERROR") : resolve(this));
        })
    }

    bind(address: string, port: number): Promise<NetworkAdapter> {
        return new Promise<NetworkAdapter>((resolve, reject) => {
            globalThis.chrome.sockets.udp.bind(this.socket_num, address, port, (res) => {
                res < 0 ? reject("OS CALL ERROR") : resolve(this);
            })
        });
    }

    close(): Promise<NetworkAdapter> {
        return new Promise<NetworkAdapter>(resolve => globalThis.chrome.sockets.udp.close(this.socket_num, () => resolve(this)));
    }

    connect(address: string, port: number): Promise<NetworkAdapter> {
        return undefined;
    }

    do_multicast_loopback(mode: boolean): Promise<NetworkAdapter> {
        return new Promise<NetworkAdapter>((resolve, reject) => {
            globalThis.chrome.sockets.udp.setMulticastLoopbackMode(this.socket_num, mode, (res) => res < 0 ? reject("OS CALL ERROR") : resolve(this));
        })
    }

    joinGroup(name: string): Promise<NetworkAdapter> {
        return new Promise<NetworkAdapter>((resolve, reject) => {
            globalThis.chrome.sockets.udp.joinGroup(this.socket_num, name, (res) => res < 0 ? reject("OS CALL ERROR") : resolve(this));
        })
    }

    leaveGroup(name: string): Promise<NetworkAdapter> {
        return new Promise<NetworkAdapter>((resolve, reject) => {
            globalThis.chrome.sockets.udp.leaveGroup(this.socket_num, name, (res) => res < 0 ? reject("OS CALL ERROR") : resolve(this));
        })
    }

    pause(isPaused?: boolean): Promise<NetworkAdapter> {
        return new Promise<NetworkAdapter>(resolve => {
            globalThis.chrome.sockets.udp.setPaused(this.socket_num, isPaused ?? !this.current_state_pause, () => {
                this.current_state_pause = isPaused ?? !this.current_state_pause;
                resolve(this);
            })
        });
    }

    send(data: Data, address?: string, port?: number): Promise<NetworkAdapter> {
        return new Promise<NetworkAdapter>((resolve, reject) => {
            if(!address || !port) reject("UDP NEEDS ADDRESS AND PORT");
            globalThis.chrome.sockets.udp.send(this.socket_num, data.getData(), address, port, (res) => {
                if(res.resultCode < 0) reject("OS CALL ERROR");
                this._last_sent = res.byteSent;
                resolve(this);
            })
        });
    }

    onRecv(cb: (na: NetworkAdapter, data: ArrayBuffer, oth: any) => void): void {
        globalThis.chrome.sockets.udp.onReceive.addListener((soid, data: ArrayBuffer, addr: string, port: number) => cb(this, data, {addr, port}));
    }

    onRecvErr(cb: (na: NetworkAdapter, code: number) => void): void {
        globalThis.chrome.sockets.udp.onReceive.addListener((soid, errno: number) => cb(this, errno));
    }

}
