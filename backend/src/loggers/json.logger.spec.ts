import { JsonLogger } from './json.logger';

describe('JsonLogger', () => {
  let logger: JsonLogger;
  let consoleLogSpy: jest.SpyInstance;
  let consoleErrorSpy: jest.SpyInstance;
  let consoleWarnSpy: jest.SpyInstance;

  beforeEach(() => {
    logger = new JsonLogger();
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('должен форматировать лог в JSON и вызывать console.log', () => {
    const message = 'Message';
    const optionalParams = [42, { key: 'value' }];

    logger.log(message, ...optionalParams);

    const expectedOutput = JSON.stringify({
      level: 'log',
      message: message,
      optionalParams,
    });
    expect(consoleLogSpy).toHaveBeenCalledWith(expectedOutput);
  });

  it('должен форматировать ошибку и вызывать console.error', () => {
    const message = 'Error';
    const optionalParams = ['additional', 123];

    logger.error(message, ...optionalParams);

    const expectedOutput = JSON.stringify({
      level: 'error',
      message: message,
      optionalParams,
    });
    expect(consoleErrorSpy).toHaveBeenCalledWith(expectedOutput);
  });

  it('должен форматировать предупреждение и вызывать console.warn', () => {
    const message = 'Warning';
    const optionalParams = [];

    logger.warn(message, ...optionalParams);

    const expectedOutput = JSON.stringify({
      level: 'warn',
      message: message,
      optionalParams,
    });
    expect(consoleWarnSpy).toHaveBeenCalledWith(expectedOutput);
  });
});
