import logo from './logo.svg';
import './App.css';

function Header(props) {
  const onClick = (event) => {
    // html 에서 a 태그나 submit 태그는 고유의 동작이 있다. 
    // (페이지를 이동시킨다거나, form 안에 있는 input 등을 전송한다던가)
    // event.preventDefault()는 그러한 동작을 중단시킨다.
    event.preventDefault();
    alert("Header");
  }

  return <header>
    <h1>
      <a href='/' onClick={onClick}>HEADER</a>
    </h1>
  </header>
}

function ListElement(props) {
  const onClick = (event) => {
    event.preventDefault();
    console.log(event.target)
    alert(event.target.id + " - " + event.target.title);
  }

  return <li>
    <a id={props.id} title={props.title} href={'/read/' + props.id}
      onClick={onClick}>{props.title}</a>
  </li>
}

function Navigation(props) {
  const navigationOnClick = (id, title) => {
    alert(id + " - " + title);
  }

  const list = []
  for (let i = 0; i < props.topics.length; i++) {
    let t = props.topics[i]
    list.push(<ListElement key={t.id} id={t.id} title={t.title} onClick={navigationOnClick} />)

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
      <Navigation topics={topics} />
      <Article title="Welcome" body="Hello, React!!" />
    </div>
  );
}

export default App;
