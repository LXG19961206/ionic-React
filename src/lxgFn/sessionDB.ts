export class sessionDB {
    constructor( key: number | string  , val: any , isArray: boolean) {

        if (val && key && isArray){
            // 如果三个参数都存在会把旧值取出, 转为普通数组, 然后把新值push到数组, 再把新生成的数组放入 session 中
            let res = this.getItem(key as string)
            if(this.typeOf(res) !== "Array"){
                this.throwErr("target is not an array")
            } else {
                this.value = [...res, val]
                this.setItem(key)
            }
        } else if(val && key && !isArray) {
            // 如果存在 val 和 key 证明是想要对 key 进行赋值
            const dataType:string = this.typeOf(val)
            switch (dataType){
                case "Number":
                case "String":
                case "Boolean":
                case "Null":
                case "Undefined":
                    this.value = val
                    break
                case "Object":
                case "Array":
                case "Function":
                case "RegExp":
                    this.value = JSON.stringify(val)
                    break
            }
            this.setItem(key)
        } else if ( key && !val) {
            // 如果只有 key  , 需要获取到当前的 key 值
        }

    }
    // 获取 session 的某个键值 , 如果是可以 JSON.parse , 会自动进行 JSON.parse()
    getItem(key:string) {
        let res
        try {
           res = JSON.parse(sessionStorage.getItem("key") as string)
        } catch(e){
            res = sessionStorage.getItem(key)
        }
        return res
    }


    setItem(key: string | number){
        sessionStorage.setItem(key as string, this.value as string)
    }

    typeOf(target:any){
        return Object.prototype
                .toString
                .call(target)
                .split(' ')[1]
                .slice(0,-1)
                .toString()
    }

    throwErr(err:string){
        throw err
    }

    value: null | any [] | number | null | object | string = ''
}
