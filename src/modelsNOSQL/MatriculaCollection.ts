import { Schema, model } from "mongoose";
import { MATRICULA } from "../config";

type FieldType = StringConstructor | NumberConstructor | BooleanConstructor | DateConstructor;

type CollectionDefinition = {
    matricula: string;
    nombre: string;
    atributos: Record<string, FieldType>;
};

const collectionDefinitions: CollectionDefinition[] = [
    {
        matricula: "A01801461",
        nombre: "productos",
        atributos: {
            nombre: String,
            precio: Number,
            categoria: String
        }
    },
    {
        matricula: "A01800280",
        nombre: "inventario",
        atributos: {
            sku: String,
            cantidad: Number,
            almacen_id: String
        }
    },
    {
        matricula: "A01800182",
        nombre: "transacciones",
        atributos: {
            monto: Number,
            metodo_pago: String,
            fecha_hora: Date
        }
    },
    {
        matricula: "A01800840",
        nombre: "cupones",
        atributos: {
            codigo: String,
            descuento_porcentaje: Number,
            activo: Boolean
        }
    },
    {
        matricula: "A01751408",
        nombre: "facturas",
        atributos: {
            numero_serie: String,
            rfc_receptor: String,
            total_impuestos: Number
        }
    },
    {
        matricula: "A01747352",
        nombre: "proveedores",
        atributos: {
            razon_social: String,
            contacto_principal: String,
            calificacion: Number
        }
    },
    {
        matricula: "A01752903",
        nombre: "usuarios",
        atributos: {
            username: String,
            biografia: String,
            seguidores_count: Number
        }
    },
    {
        matricula: "A01800371",
        nombre: "comentarios",
        atributos: {
            texto: String,
            usuario_id: String,
            editado: Boolean
        }
    },
    {
        matricula: "A01800766",
        nombre: "podcast",
        atributos: {
            titulo: String,
            anfitrion: String,
            duracion_promedio: Number
        }
    },
    {
        matricula: "A01800593",
        nombre: "streams",
        atributos: {
            streamer_id: String,
            espectadores_pico: Number,
            categoria_juego: String
        }
    },
    {
        matricula: "A01801140",
        nombre: "notificaciones",
        atributos: {
            tipo_alerta: String,
            leido: Boolean,
            prioridad: String
        }
    },
    {
        matricula: "A01752303",
        nombre: "albumes",
        atributos: {
            nombre_album: String,
            artista: String,
            "año_lanzamiento": Number
        }
    },
    {
        matricula: "A01750911",
        nombre: "cursos",
        atributos: {
            titulo: String,
            instructor: String,
            nivel_dificultad: String
        }
    },
    {
        matricula: "A01752310",
        nombre: "estudiantes",
        atributos: {
            matricula_alumno: String,
            carrera: String,
            promedio_general: Number
        }
    },
    {
        matricula: "A01751433",
        nombre: "lecciones",
        atributos: {
            orden: Number,
            contenido_url: String,
            tipo_archivo: String
        }
    },
    {
        matricula: "A01801044",
        nombre: "pacientes",
        atributos: {
            curp: String,
            tipo_sangre: String,
            alergias: String
        }
    },
    {
        matricula: "A01752433",
        nombre: "citas_medicas",
        atributos: {
            id_doctor: String,
            especialidad: String,
            costo_consulta: Number
        }
    },
    {
        matricula: "A01278340",
        nombre: "medicamentos",
        atributos: {
            sustancia_activa: String,
            laboratorio: String,
            requiere_receta: Boolean
        }
    },
    {
        matricula: "A01769650",
        nombre: "vehiculos",
        atributos: {
            placa: String,
            modelo: String,
            kilometraje: Number
        }
    },
    {
        matricula: "A01800483",
        nombre: "rutas",
        atributos: {
            origen: String,
            destino: String,
            distancia_estimada: Number
        }
    },
    {
        matricula: "A01752828",
        nombre: "sensores_iot",
        atributos: {
            mac_address: String,
            tipo_sensor: String,
            ultima_lectura: String
        }
    },
    {
        matricula: "A01752759",
        nombre: "logs_sistema",
        atributos: {
            nivel_error: String,
            modulo: String,
            mensaje_stacktrace: String
        }
    },
    {
        matricula: "A01751315",
        nombre: "tickets_soporte",
        atributos: {
            asunto: String,
            estado_resolucion: String,
            tecnico_asignado: String
        }
    },
    {
        matricula: "A01801092",
        nombre: "destinos",
        atributos: {
            ciudad: String,
            pais: String,
            clima_predominante: String
        }
    },
    {
        matricula: "A01749697",
        nombre: "hoteles",
        atributos: {
            nombre: String,
            estrellas: Number,
            precio_noche: Number
        }
    },
    {
        matricula: "A01751347",
        nombre: "vuelos",
        atributos: {
            aerolinea: String,
            numero_vuelo: String,
            puerta_embarque: String
        }
    },
    {
        matricula: "A01800430",
        nombre: "restaurantes",
        atributos: {
            nombre: String,
            tipo_cocina: String,
            rango_precios: String
        }
    }
];

const fallbackDefinition: CollectionDefinition = collectionDefinitions[0] ?? {
    matricula: "A01801461",
    nombre: "productos",
    atributos: {
        nombre: String,
        precio: Number,
        categoria: String
    }
};

export const MatriculaCollectionDefinition: CollectionDefinition =
    collectionDefinitions.find((definition) => definition.matricula === MATRICULA) ??
    fallbackDefinition;

const schemaDefinition = Object.entries(MatriculaCollectionDefinition.atributos)
    .reduce<Record<string, { type: FieldType; required: boolean; trim?: boolean }>>(
        (schema, [field, type]) => {
            schema[field] = {
                type,
                required: true,
                ...(type === String ? { trim: true } : {})
            };

            return schema;
        },
        {}
    );

const matriculaSchema = new Schema(schemaDefinition, {
    collection: MatriculaCollectionDefinition.nombre,
    timestamps: false
});

export const MatriculaModel = model("MatriculaCollection", matriculaSchema);
