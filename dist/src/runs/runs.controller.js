"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RunsController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const current_user_decorator_1 = require("../users/decorators/current-user.decorator");
const create_run_dto_1 = require("./dto/create-run.dto");
const query_runs_dto_1 = require("./dto/query-runs.dto");
const runs_service_1 = require("./runs.service");
let RunsController = class RunsController {
    runsService;
    constructor(runsService) {
        this.runsService = runsService;
    }
    findAll(user, query) {
        return this.runsService.findAll(user.id, query);
    }
    create(user, dto) {
        return this.runsService.create(user.id, dto);
    }
};
exports.RunsController = RunsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, query_runs_dto_1.QueryRunsDto]),
    __metadata("design:returntype", void 0)
], RunsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_run_dto_1.CreateRunDto]),
    __metadata("design:returntype", void 0)
], RunsController.prototype, "create", null);
exports.RunsController = RunsController = __decorate([
    (0, common_1.Controller)('runs'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [runs_service_1.RunsService])
], RunsController);
//# sourceMappingURL=runs.controller.js.map