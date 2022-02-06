export class IngresoEgreso {
    public descripcion: string;
    public monto: number;
    public tipo: string;
    public uid?: string;

    constructor(descripcion:string, monto: number, tipo: string, uid:string) {
        this.descripcion=descripcion;
        this.monto=monto;
        this.tipo=tipo;
        //this.uid=uid;
    }

}