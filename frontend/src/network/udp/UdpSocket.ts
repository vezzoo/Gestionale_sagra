import NetworkAdapter from "../NetworkAdapter";
import Data from "../Data";
import api from "../api_wrapper.js"

export default class UdpSocket implements NetworkAdapter{

    private socket_num: any;
    private current_state_pause = false;

    constructor(socket_num: any) {
        this.socket_num = socket_num;
    }

    static create(persistent?: boolean, buf_size?: number): Promise<NetworkAdapter> {
        return new Promise<NetworkAdapter>((resolve, reject) => {
            api.chrome.sockets.udp.create({persistent: persistent ?? false, bufferSize: buf_size ?? 4096}, (o) => {
                resolve(new UdpSocket(o.socketId));
            });
        });
    }

    allow_broadcast_recv(state: boolean): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            api.chrome.sockets.udp.setBroadcast(this.socket_num, state, (res) => res < 0 ? reject("OS CALL ERROR") : resolve());
        })
    }

    bind(address: string, port: number): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            api.chrome.sockets.udp.binary(this.socket_num, address, port, (res) => {
                res < 0 ? reject("OS CALL ERROR") : resolve();
            })
        });
    }

    close(): Promise<void> {
        return new Promise<void>(resolve => api.chrome.sockets.udp.close(this.socket_num, () => resolve()));
    }

    connect(address: string, port: number): Promise<void> {
        return undefined;
    }

    do_multicast_loopback(mode: boolean): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            api.chrome.sockets.udp.setMulticastLoopbackMode(this.socket_num, mode, (res) => res < 0 ? reject("OS CALL ERROR") : resolve());
        })
    }

    joinGroup(name: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            api.chrome.sockets.udp.joinGroup(this.socket_num, name, (res) => res < 0 ? reject("OS CALL ERROR") : resolve());
        })
    }

    leaveGroup(name: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            api.chrome.sockets.udp.leaveGroup(this.socket_num, name, (res) => res < 0 ? reject("OS CALL ERROR") : resolve());
        })
    }

    pause(isPaused?: boolean): Promise<void> {
        return new Promise<void>(resolve => {
            api.chrome.sockets.udp.setPaused(this.socket_num, isPaused ?? !this.current_state_pause, () => {
                this.current_state_pause = isPaused ?? !this.current_state_pause;
                resolve();
            })
        });
    }

    send(data: Data, address?: string, port?: number): Promise<number> {
        return new Promise<number>((resolve, reject) => {
            if(!address || !port) reject("UDP NEEDS ADDRESS AND PORT");
            api.chrome.sockets.udp.send(this.socket_num, data.getData(), address, port, (res) => {
                if(res.resultCode < 0) reject("OS CALL ERROR");
                resolve(res.bytesSent);
            })
        });
    }

}
