import { createParamDecorator, type ExecutionContext } from "@nestjs/common";

export const urlParam = createParamDecorator(
  (data: unknow, ctx: ExecutionContext) => {
  const context = ctx.switchToHttp()
  const request = context.getRequest();
  return request.url
})