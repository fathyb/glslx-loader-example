declare module "gl-mat4/create" {
    export default function(): Float32Array
}

declare module "gl-mat4/scale" {
    export default function<T extends Float32Array|number[]>(out: T, a: Float32Array|number[], v: Float32Array|number[]): T
}

declare module "gl-mat4/translate" {
    export default function<T extends Float32Array|number[]>(out: T, a: Float32Array|number[], v: Float32Array|number[]): T
}
