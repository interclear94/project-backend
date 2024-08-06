"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSwagger = setupSwagger;
const swagger_1 = require("@nestjs/swagger");
function setupSwagger(app) {
    const options = new swagger_1.DocumentBuilder()
        .setTitle("테스트 화면")
        .setDescription("정상 작동되는 지 확인")
        .setVersion("1.0")
        .addTag("board")
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup("test", app, document);
}
//# sourceMappingURL=swagget.js.map