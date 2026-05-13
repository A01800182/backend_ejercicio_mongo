import { Request,Response } from "express";
import AbstractController from "./AbstractController";
import {
    MatriculaCollectionDefinition,
    MatriculaModel
} from "../modelsNOSQL/MatriculaCollection";

export default class MatriculaController extends AbstractController{
    private static _instance:MatriculaController;

    public static get instance():MatriculaController{
        return this._instance ||
        (this._instance = new this("Matricula"));
    }

    protected initRoutes(): void {
        this.router.get('/listar',
            this.getListarRegistros.bind(this));
        this.router.post('/crear',
            this.postCrearRegistro.bind(this));
    }

    private async getListarRegistros(req:Request,res:Response):Promise<void>{
        try{
            const registros = await MatriculaModel.find();
            res.status(200).json({
                matricula: MatriculaCollectionDefinition.matricula,
                coleccion: MatriculaCollectionDefinition.nombre,
                registros
            });
        }catch(err){
            console.log(err);
            res.status(500).json(err)
        }
    }

    private async postCrearRegistro(req:Request,res:Response):Promise<void>{
        try{
            const registro = await MatriculaModel.create(req.body);
            res.status(200).json({
                message:"Registro creado exitosamente",
                matricula: MatriculaCollectionDefinition.matricula,
                coleccion: MatriculaCollectionDefinition.nombre,
                registro
            });
        }catch(err){
            console.log(err);
            res.status(500).json(err)
        }
    }
}
