import { TskvLogger } from './tskv.logger';

describe('TskvLogger', () => {
  let logger: TskvLogger;
  let consoleLogSpy: jest.SpyInstance;
  let consoleErrorSpy: jest.SpyInstance;
  let consoleWarnSpy: jest.SpyInstance;

  beforeEach(() => {
    logger = new TskvLogger();
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('должен форматировать лог в формате TSKV и вызывать console.log', () => {
    const message = 'Message';
    const optionalParams = [123, { key: 'value' }];

    logger.log(message, ...optionalParams);

    const expectedOutput = `level=log\tmessage=${message}\toptionalParams=${optionalParams}\n`;
    expect(consoleLogSpy).toHaveBeenCalledWith(expectedOutput);
  });

  it('должен форматировать ошибку в формате TSKV и вызывать console.error', () => {
    const message = 'Error';
    const optionalParams = ['detail'];

    logger.error(message, ...optionalParams);

    const expectedOutput = `level=error\tmessage=${message}\toptionalParams=${optionalParams}\n`;
    expect(consoleErrorSpy).toHaveBeenCalledWith(expectedOutput);
  });

  it('должен форматировать предупреждение в формате TSKV и вызывать console.warn', () => {
    const message = 'Warning';
    const optionalParams = [];

    logger.warn(message, ...optionalParams);

    const expectedOutput = `level=warn\tmessage=${message}\toptionalParams=${optionalParams}\n`;
    expect(consoleWarnSpy).toHaveBeenCalledWith(expectedOutput);
  });
});
