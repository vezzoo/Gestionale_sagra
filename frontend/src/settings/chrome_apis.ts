export const chrome_local_storage_set = (key: string, value:string) => new Promise<void>(resolve => {
    globalThis.chrome.storage.local.set({[key]: value}, () => resolve())
});

export const chrome_local_storage_get = (key: string) => new Promise<string>(resolve => {
    globalThis.chrome.storage.local.get([key], (res: string) => resolve(res))
});
