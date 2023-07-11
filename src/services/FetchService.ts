export default class FetchService {
  private headers: any = {};
  private method: string = "GET";
  private url: string = "";
  private data: any = {};
  private isFormData: boolean = false;

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

  public setFormData(data: any): this {
    this.isFormData = true;
    return this.setData(data);
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
    const credentials: any = JSON.parse(localStorage.getItem("credentials") as string);
    const accessToken: string = credentials.AccessToken;
    const token: string = `Bearer ${accessToken}`;
    return this.setHeader("Authorization", token);
  }

  public async fetch(): Promise<any> {
    let urlTemp: string = this.url;

    const options: any = {
      method: this.method,
      headers: this.headers,
    };

    if (this.method === "GET") {
      const params: string = new URLSearchParams(this.data).toString();
      urlTemp += "?" + params;
    }

    if (this.method === "POST") {
      options.body = this.isFormData ? this.data : JSON.stringify(this.data);
    }

    const request: any = await fetch(urlTemp, options);

    try {
      return await request.json();
    } catch (error) {
      console.log("Empty Response");
    }
  }
}
