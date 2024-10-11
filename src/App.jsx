import './index.css';
import Header from './components/Header'; 

function App() {
  return (
    <>
        <Header />
        <br />
        <div className="container">

          <table width="100%">
            <tr>
              <td width="55%" style={{ verticalAlign: 'top' }}>
                        <br />
                  <h1>Key Features of GraphQL</h1>
                  <br />
                  <h3>- Single Endpoint</h3>
                  <h3>- Access only the fields you need</h3>
                  <br />

                  <br />
                  <fieldset>
                    <legend>Key Features of GraphQL</legend>
                    <ul>
                      <li>Efficient Data Retrieval: Only the data you ask for is returned, no more and no less </li>
                      <li>Declarative Data Fetching: GraphQL allows you to get data in a single request</li>
                      <li>Strongly Typed Schema: GraphQL uses a type system to define the capabilities of an API</li>
                      <li>Hierarchical Structure: Making it easy to understand and use the data.</li>
                      <li>Versionless API: Fields can be added or deprecated without impacting existing queries</li>
                      <li>Introspection: APIs can be self-documented and introspected</li>
                      <li>Aggregated Data: GraphQL can aggregate data from multiple sources</li>
                    </ul>
                  </fieldset>


              </td>
              <td width="5%">&nbsp;</td>
              <td width="40%">
                <br />
                <img src="GraphQL-REST.png" style={{ maxWidth: '100%' }} alt="GraphQL" />
              </td>
            </tr>
          </table>

        </div>

    </>
  );
}

export default App;
