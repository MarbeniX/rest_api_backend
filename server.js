"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = connectDB;
const express_1 = __importDefault(require("express"));
const router_1 = __importDefault(require("./router"));
const db_1 = __importDefault(require("./config/db"));
const colors_1 = __importDefault(require("colors"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = __importDefault(require("./config/swagger"));
//Conectar a base de datos
async function connectDB() {
    try {
        await db_1.default.authenticate();
        db_1.default.sync();
        //console.log(colors.blue('Conexión exitosa a la DB'))
    }
    catch (error) {
        //console.log(error)
        console.log(colors_1.default.red('Hubo un error al conectar a la DB'));
    }
}
connectDB();
//Inicializar express
const server = (0, express_1.default)();
//Permitir conexiones
const corsOptions = {
    origin: function (origin, callback) {
        if (origin === process.env.FONTEND_URL) {
            callback(null, true);
        }
        else {
            callback(new Error('Error de CORS'));
        }
    }
};
server.use((0, cors_1.default)(corsOptions));
//Leer datos de formularios
server.use(express_1.default.json());
//Morgan
server.use((0, morgan_1.default)('dev'));
//Rutas
server.use('/api/products', router_1.default);
//Docs
server.use('/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.default));
//Routing
exports.default = server;
//# sourceMappingURL=server.js.map