import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/react-hooks"
import { Title } from "./components/Title";
import { SettingQuestionLazy } from './SettingQuestionLazy';

const client: any = new ApolloClient({
  cache: new InMemoryCache(),
  uri: 'http://localhost:3333/graphql'
})

const App = () => {
    return (
        <ApolloProvider client={client}>
            <div className="App">
              <Title />
              <SettingQuestionLazy/>
            </div>
        </ApolloProvider>
    );
}

export default App;
