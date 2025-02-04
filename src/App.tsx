import styles from './App.module.css';
import { Spinner } from './components/spinner/Spinner';

function App() {
    return (
        <div className={styles.container}>
            <Spinner />
        </div>
    );
}

export default App;
