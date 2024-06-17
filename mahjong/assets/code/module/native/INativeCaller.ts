
export interface INativeCaller {
    call(funcName: string, jsonMsg: string)
    decode(data: string): string
}