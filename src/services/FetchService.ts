export default class FetchService {
  private headers: any = {};
  private method: string = "GET";
  private url: string = "";
  private data: any = {};

  public setHeader(header: string, value: any): this {
    this.headers[header] = value;
    return this;
  }

  public setMethod(method: string): this {
    this.method = method;
    return this;
  }

  public isPostRequest(): this {
    return this.setMethod("POST");
  }

  public isGetMethod(): this {
    return this.setMethod("GET");
  }

  public setURL(url: string): this {
    this.url = url;
    return this;
  }

  public setData(data: any): this {
    this.data = data;
    return this;
  }

  public withBearerAuthorization(): this {
    const credentials = JSON.parse(localStorage.getItem("credentials") as string);
    const accessToken = credentials.AccessToken;
    const token = `Bearer ${accessToken}`;
    return this.setHeader("Authorization", token);
  }

  public async fetch(): Promise<any> {
    let urlTemp = this.url;

    const options: any = {
      method: this.method,
      headers: this.headers,
    };

    if (this.method === "GET") {
      const params = new URLSearchParams(this.data).toString();
      urlTemp += "?" + params;
    }

    if (this.method === "POST") {
      options.body = JSON.stringify(this.data);
    }

    const request = await fetch(urlTemp, options);

    return await request.json();
  }
}
