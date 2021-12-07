import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/react-hooks"
import { SettingQuestion } from './SettingQuestion';
import { SettingQuestionLazy } from './SettingQuestionLazy';

const client: any = new ApolloClient({
  cache: new InMemoryCache(),
  uri: 'http://localhost:3333/graphql'
})

const App = () => {
    return (
        <ApolloProvider client={client}>
            <div className="App">
              <SettingQuestionLazy/>
            </div>
        </ApolloProvider>
    );
}

export default App;
