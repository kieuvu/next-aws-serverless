export default class Env {
  public static get<T>(key: string, def?: T): T {
    const value: string | undefined = process.env[key];
    return value ? <T>value : <T>def;
  }
}
