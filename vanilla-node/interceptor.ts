import {Message} from "@bufbuild/protobuf";
import {Interceptor, StreamRequest, StreamResponse, UnaryRequest, UnaryResponse} from "@connectrpc/connect";


export type RequestLogger = {
  onRequestHeader?(header: Headers): void;
  onRequestMessage?(message: Message): void;
  onResponseHeader?(header: Headers): void;
  onResponseMessage?(message: Message): void;
  onResponseTrailer?(trailer: Headers): void;
  onError?(error: unknown): void;
}

function defaultRequestLogger(req: UnaryRequest | StreamRequest): RequestLogger {
  const name = `${req.method.methodKind} ${req.method.toString()}`;
  return {
    onRequestHeader(header: Headers) {
      console.log(name, "request header", header);
    },
    onRequestMessage(message: Message) {
      console.log(name, "request message", message);
    },
    onResponseHeader(header: Headers) {
      console.log(name, "response header", header);
    },
    onResponseMessage(message: Message) {
      console.log(name, "response message", message);
    },
    onResponseTrailer(trailer: Headers) {
      console.log(name, "response trailer", trailer);
    },
    onError(error: unknown) {
      console.log(name, "error", error);
    },
  };
}

export function createLoggingInterceptor(
  reqLogger: ((request: UnaryRequest | StreamRequest) => RequestLogger) = defaultRequestLogger,
): Interceptor {
  return (next) => async (req) => {
    const logger = reqLogger(req);
    const reqIntercepted = interceptRequest(req, logger);
    let res: UnaryResponse | StreamResponse;
    try {
      res = await next(reqIntercepted);
    } catch (e) {
      logger.onError?.(e);
      throw e;
    }
    return interceptResponse(res, logger);
  };
}


function interceptRequest<R extends UnaryRequest | StreamRequest>(
  req: R,
  logger: RequestLogger,
): R {
  logger.onRequestHeader?.(req.header);
  if (req.stream) {
    return {
      ...req,
      message: interceptIterable(
        req.message,
        (message) => logger.onRequestMessage?.(message),
        () => {},
        () => {},
      ),
    };
  } else {
    logger.onRequestMessage?.(req.message);
  }
  return req;
}

function interceptResponse<R extends UnaryResponse | StreamResponse>(
  res: R,
  logger: RequestLogger,
): R {
  logger.onResponseHeader?.(res.header);
  if (res.stream) {
    return {
      ...res,
      message: interceptIterable(
        res.message,
        (message) => logger.onResponseMessage?.(message),
        (e) => logger.onError?.(e),
        () => logger.onResponseTrailer?.(res.trailer),
      ),
    };
  } else {
    logger.onResponseMessage?.(res.message);
    logger.onResponseTrailer?.(res.trailer);
  }
  return res;
}

function interceptIterable(
  original: AsyncIterable<Message>,
  onNext: (value: Message) => void,
  onNextReject: (e: unknown) => void,
  onDone: () => void,
): AsyncIterable<Message> {
  return {
    [Symbol.asyncIterator]() {
      const o = original[Symbol.asyncIterator]();
      const n: AsyncIterator<Message> = {
        async next(value: Message): Promise<IteratorResult<Message>> {
          let result: IteratorResult<Message>;
          try {
            result = await o.next(value);
          } catch (e) {
            onNextReject(e);
            throw e;
          }
          if (result.done !== true) {
            onNext(result.value);
          } else {
            onDone();
          }
          return result;
        },
      };
      if (o.throw) {
        n.throw = (e: unknown): Promise<IteratorResult<Message>> => {
          return o.throw!(e);
        };
      }
      if (o.return) {
        n.return = (value: unknown): Promise<IteratorResult<Message>> => {
          return o.return!(value);
        };
      }
      return n;
    },
  };
}
