import { useListBase } from '@hooks/list-base.hook.ts';
import { SALES_DATA_LIST } from './sales.data.ts';


export function SalesPage() {
  const {
    toggleCheck, exportData, selectedRecord, setSearchText, searchText, isSelectAll, toggleCheckAll
  } = useListBase();
  return (
    <div>
      <pre>{JSON.stringify(isSelectAll)}</pre>
      <table border={1}>
        <thead>
          <tr>
            <td>
              <input
                type="checkbox"
                checked={isSelectAll}
                onChange={({ target }) => void toggleCheckAll(target.checked, SALES_DATA_LIST)}/>
            </td>
            <td>
              <div>Name</div>
            </td>
            <td>
              <div>Code</div>
            </td>
          </tr>
        </thead>
        <tbody>
          {SALES_DATA_LIST.map(c => (<tr key={c.id}>
            <td>
              <input
                type="checkbox"
                checked={c.id in selectedRecord}
                onChange={(e) => {
                  toggleCheck(c.id, e.target.checked, SALES_DATA_LIST.length);
                }}/>
            </td>
            <td>
              <div>{c.name}</div>
            </td>
            <td>
              <div>{c.code}</div>
            </td>
          </tr>))}
        </tbody>
      </table>
    </div>
  );
}