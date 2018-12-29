import { injectable } from 'inversify';

enum ConsoleColors {
  Cyan = '\x1b[36m%s\x1b[0m'
}

@injectable()
export class Logger {
  info(message: string): void {
    console.log(ConsoleColors.Cyan, `[${new Date().toUTCString()}] ${message}`);
  }
}
