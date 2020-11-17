interface dbStatus {
    status: "delete" | "update" | "select" | "" | "insert"
}

export default class dataBase {

    constructor(table:string) {
        // 先选中所用的数据表 , 其实就是一个localStorage 中的 item
        this.getTableInfo(table)
        switch (this.typeOf(this.val)){
            case "Number":
            case "String":
            case "Boolean":
                this.chainAble = false
                break
            case "Object":
                this.val = [this.val]
            case "Array":
                this.chainAble = true
                break
            case "Function":
            case "RegExp":
                this.chainAble = false
                break
        }
    }

    table:string = ''

    val:string | number | boolean | any [ ] | object | null | undefined  = ''

    response:string|object|any [] = ''

    chainAble = false

    statusObj:dbStatus = {
        status: ''
    }


    /*
    * 进程队列里面存放了 被 bind 的还未执行的函数 , 因为sql语句这种
    * 比如 我们 SELECT price,pname FROM "xxx" WHERE price < 20
    * 如果我们想要输入函数得到执行结果
    * db.select("price","pname").from("xxx").where("price",p => p < 20).val()
    * 就得控制好执行顺序,因为它绝对不能只是按照写时候的先后顺序来执行
    *   先要 设置 from  (在哪个数据表 ? ) , 没有数据表,肯定没法执行, 因此要先执行选表的操作
    *   然后设置查询的限制  where ( 限制条件有哪些 ? )
    *   根据where的条件我们可以得到数据
    *   最后再选择我们需要的字段 select , 进行过滤 , 只返回我们需要的字段
    * 因此函数虽然写的时候是按照顺序写的,但是真正执行的时候绝对不能按照顺序执行,否则不能正常得到执行结果,所以需要一个延迟执行的机制.
    * 会有进程队列收集你要做的事情,等待参数收集完毕了,才会真正地进行执行
    * */
    progress: Array<(args?:any)=>any> = []

    value(){
        this.progress.forEach(func => func())
        return this.val
    }

    getTableInfo(table:string){
        // 根据表名查询字段
        let temp = localStorage.getItem(table)
        try{
            this.val = JSON.parse(temp as string)
        } catch(err) {
            this.val = temp
        }
    }

    typeOf(target:any){
        // 检测目标的类型, 返回一个表示类型的字符串
        return Object.prototype
            .toString.call(target)
            .split(' ')
            .slice(0,-1)
            .toString()
    }

    // 延迟执行, 执行调用select方法时候其实 , 并没真正得到执行整个方法
    select(...args : Array<any>){
        this.progress.push(this.executeSelect.bind(this,args))
    }

    executeSelect(...args : Array <any>){
        // 如果不满足条件不能使用select函数
        if(!this.chainAble) return
        this.statusObj.status = "select"
        let res:object [] = [];
        (this.val as object []).forEach(el=>{
            let temp = {}
            args.forEach( key => (temp as any)[`${key}`] = (el as any)[`${key}`] )
            res.push(temp)
        })
        this.response = res
    }

    where(field:string,handle:(field?:any)=>{}){
        this.progress.push(this.setWhere.bind(this,field,handle))
    }

    setWhere(field:string,handle:(field?:any)=>{}){
        let res:object [] = [];
        switch (this.statusObj.status){
            case "select":
                // 如果当前的操作是 "查"
                (this.val as Array<object>).map(item => handle(field) && res.push(item))
                break
        }
    }

    from(table:string){
        this.progress.push(this.setFrom.bind(this,table))
    }

    setFrom(table:string){
        this.table = table
    }

    insertInto(table:string,data:object|string|number){
        this.progress.push(this.executeSelect.bind(this,table,data))
    }

    executeInsert(table:string,data:object|string|number){
        this.setFrom(table)
        /*
         * 未完成,还需要后续补充插入数据的逻辑
         * */
    }
    // delete 是 JavaScript 的保留字,因此使用其他代替
    remove(){
        this.progress.push(this.executeRemove.bind(this))
    }

    executeRemove(){
        /*
        *  to do
        * */
    }

    update(field:string){
        this.progress.push(this.executeUpdate.bind(this,field))
    }

    executeUpdate(field:string){
        /*
        * to do
        * */
    }
}

