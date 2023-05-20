import { Task } from './components/Task';
import './scss/app.scss';

const App: React.FC = () => {
  return (
    <div className="wrapper">
      <div className="container">
        <div className="main-block">
          <div className="todo-add-line">
            <input className="todo-input" placeholder='Хотите добавить что-то в список дел?' type="text" />
            <button className="add-button">Добавить</button>
          </div>
          <div className="list__pair">
            <div className="list__block">
              <div className="title">
                <h3>Список дел:</h3>
              </div>
              <ul className="list">
                <li><Task todo={true} /></li>
              </ul>
            </div>
            <div className="list__block">
              <div className="title">
                <h3>Выполненные дела:</h3>
              </div>
              <ul className="list">
                <li><Task todo={false} /></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
