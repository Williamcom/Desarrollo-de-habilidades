import "./App.css"
import Cabecera from './assets/Cabecera'
import { Splitter, SplitterPanel } from 'primereact/splitter';

export default function App(){

  return (
    <body>
      <Cabecera />
      <Splitter style={{ height: '300px' }}>
          <SplitterPanel className="flex align-items-center justify-content-center">
            <h3>
            Ese vato que lastima la vista
            </h3>
            <h3>
            Ese vato que lastima la vista
            </h3>
          </SplitterPanel>
          <SplitterPanel className="flex align-items-center justify-content-center">
            panel 2
          </SplitterPanel>
      </Splitter>

    </body>
  );
}