"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagget_1 = require("./lib/swagget");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    (0, swagget_1.setupSwagger)(app);
    app.enableCors({
        origin: "http://127.0.0.1:5501",
        methods: ['GET', 'HEAD', 'PATCH', 'POST', 'DELETE', 'OPTIONS', 'PUT'],
        allowedHeaders: ['Content-Type', 'userToken', 'unickname', 'parentId'],
        credentials: true
    });
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map