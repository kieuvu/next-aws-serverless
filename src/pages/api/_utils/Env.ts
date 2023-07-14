export default class Env {
  public static get<T>(key: string, def: T | undefined = undefined): any {
    const value: string | undefined = process.env[key];
    return value ? (value as T) : def;
  }
}
