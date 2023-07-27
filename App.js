import StackNavigator from './StackNavigator/StackNavigator';
import { UserContext } from './screens/UserContext';

export default function App() {
  return (
    <>
      <UserContext>
        <StackNavigator />
      </UserContext>
    </>
  );
}


