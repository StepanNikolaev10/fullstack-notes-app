import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const GetRefreshTokenPayload = createParamDecorator(
  (data: string | null, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    const payload = request.refreshTokenPayload;
    if (!payload) {
      return null;
    }

    return data ? payload[data] : payload;
  }
)