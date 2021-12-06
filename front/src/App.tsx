import ApolloClient from 'apollo-boost'
import { ApolloProvider } from "@apollo/react-hooks"
import { SettingQuestion } from './SettingQuestion';

const client: any = new ApolloClient({
  uri: 'http://localhost:3333/graphql'
})

const App = () => {
    return (
        <ApolloProvider client={client}>
            <div className="App">
              <SettingQuestion/>
            </div>
        </ApolloProvider>
    );
}

export default App;
