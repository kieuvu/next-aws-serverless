import FetchService from "@/services/FetchService";
import {
  ChangeEvent,
  ReactElement,
  ReactNode,
  useEffect,
  useState,
} from "react";

async function getDatabaseInfo(): Promise<any> {
  return new FetchService()
    .setURL("/api/dynamodb/get")
    .withBearerAuthorization()
    .fetch();
}

export default function DynamoDB(): ReactElement {
  const [table, setTable] = useState<string>("");
  const [data, setData] = useState<[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  async function fetchDBInfo(): Promise<void> {
    const response: any = await getDatabaseInfo();
    if (response.status) {
      setTable(response.data.tableName);
      setData(response.data.records.Items);
    }
  }

  useEffect((): any => {
    fetchDBInfo();
  }, []);

  async function addItem() {
    const value: string = inputValue.trim();

    if (!value) return;

    const response: any = await new FetchService()
      .isPostRequest()
      .setURL("/api/dynamodb/add")
      .setData({
        name: value,
      })
      .withBearerAuthorization()
      .fetch();

    if (response.status) {
      fetchDBInfo();
    }

    setInputValue("");
  }

  return (
    <div className='flex items-center justify-center flex-col'>
      <h1 className='prose'>
        Table: <b>{table}</b>
      </h1>

      <div>
        <h1 className='prose text-center mt-[50px]'>Add Item</h1>
        <label>Items Name: </label>
        <input
          type='input'
          className='border'
          value={inputValue}
          onChange={(e: ChangeEvent<HTMLInputElement>): void =>
            setInputValue(e.target.value)
          }
        />
        <div className='text-center'>
          <button
            onClick={(): any => addItem()}
            className='border mt-2 px-2'>
            Add
          </button>
        </div>
      </div>
      <h1 className='prose text-center mt-[50px]'>
        All Items <b>({data.length})</b>
      </h1>
      <div className='table w-[800px] rounded p-2 border-2'>
        <div className='table-header-group'>
          <div className='table-row'>
            <div className='text-left table-cell border-b-2 pb-2 mt-2'>ID</div>
            <div className='text-left table-cell border-b-2 pb-2 mt-2'>
              Data
            </div>
          </div>
        </div>
        <div className='table-row-group'>
          {data.map(
            (item: any, index: number): ReactNode => (
              <div
                className='table-row'
                key={index}>
                <div className='table-cell pt-2'>{item.id.S}</div>
                <div className='table-cell pt-2'>
                  <pre>{JSON.stringify(item, null, 4)}</pre>
                </div>
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  );
}
