import logo from './logo.svg';
import './App.css';

function Header(props) {
  return <header>
    <h1><a href='/'>WEB</a></h1>
  </header>
}

function ListElement(props) {
  return <li><a id={props.id} href={'/read/' + props.id} 
    onClick={(event) => {
      event.preventDefault();
      props.onchangeMode(event.target.id);
    }}>{props.title}</a></li>
}

function Navigation(props) {
  const list = []
  for (let i = 0; i < props.topics.length; i++) {
    let t = props.topics[i]
    list.push(<ListElement key={t.id} id={t.id} title={t.title} onchangeMode={props.onchangeMode}/>)

  }
  return <nav>
    <ol>
      {list}
    </ol>
  </nav>
}

function Article(props) {
  return <article>
    <h2>{props.title}</h2>
    {props.body}
  </article>
}

function App() {
  const topics = [
    { id: 1, title: 'html', body: 'html is ...' },
    { id: 2, title: 'css', body: 'cs is ...' },
    { id: 3, title: 'js', body: 'js is ...' },
  ]
  return (
    <div>
      <Header />
      <Navigation topics={topics} onchangeMode={(id) => {
        alert(id);
      }} />
      <Article title="Welcome" body="Hello, React!!" />
    </div>
  );
}

export default App;
