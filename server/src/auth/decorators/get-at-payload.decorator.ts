import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const GetAccessTokenPayload = createParamDecorator(
  (data: string | null, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    const payload = request.accessTokenPayload;
    if (!payload) {
      return null;
    }

    return data ? payload[data] : payload;
  }
)