import logo from './logo.svg'
import './App.css'
import { useState } from 'react'

function Header(props) {
  const onClick = (event) => {
    // html 에서 a 태그나 submit 태그는 고유의 동작이 있다. 
    // (페이지를 이동시킨다거나, form 안에 있는 input 등을 전송한다던가)
    // event.preventDefault()는 그러한 동작을 중단시킨다.
    event.preventDefault()
    alert("Header")
  }

  return <header>
    <h1>
      <a href='/' onClick={onClick}>HEADER</a>
    </h1>
  </header>
}

function ListElement(props) {
  const { topic} = props
  const onClick = (event) => {
    event.preventDefault();
    props.onClick(topic)
  }
  return <li>
    <a href={'/read/' + topic.id} onClick={onClick}>{topic.title}</a>
  </li>
}

function Navigation(props) {
  const onClick = (topic) => {
    props.setMode(topic)
  }

  const list = props.topics.map(topic => <ListElement topic={topic} onClick={onClick} />)

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
    { id: 1, title: 'html', body: 'HTML is ...' },
    { id: 2, title: 'css', body: 'CSS is ...' },
    { id: 3, title: 'Javascript', body: 'Javascript is ...' },
  ]

  const [mode, setMode] = useState(topics[0])
  let content = null
  const onContent = (topic) => {
    content = <Article title={topic.title} body={topic.body} />
  }
  onContent(mode)

  return (
    <div>
      <Header />
      <Navigation topics={topics} setMode={setMode} />
      {content}
    </div>
  );
}

export default App;
