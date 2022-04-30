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

function CreateButton(props) {
  return <button onClick={event => {
    props.setMode("CREATE")
  }}>
    CREATE
  </button>
}

function CreateForm(props) {
  const save = () => {
    const newTopic = {
      title: document.getElementById("newTitle").value,
      body: document.getElementById("newBody").value,
    }
    console.log(newTopic)
    topics.push(newTopic)
    props.setTopic(newTopic)
  }

  return <div>
    <form onSubmit={event => { event.preventDefault(); save() }}>
      <p><input id="newTitle" type="text" placeholder="타이틀을 입력하세요" /></p>
      <p><textarea id="newBody" placeholder="내용을 입력하세요" rows="10" cols="50" /></p>
      <p><input type="submit" value="작성" /></p>
    </form>
  </div>
}

function ListElement(props) {
  const { topic } = props
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
    props.setMode("READ")
    props.setTopic(topic)
  }

  const list = props.topics.map(topic => <ListElement key={topic.id} topic={topic} onClick={onClick} />)

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

const topics = [
  { id: 1, title: 'html', body: 'HTML is ...' },
  { id: 2, title: 'css', body: 'CSS is ...' },
  { id: 3, title: 'Javascript', body: 'Javascript is ...' },
]

function App() {
  const [mode, setMode] = useState(null)
  const [topic, setTopic] = useState(null)
  console.log(topics)

  let content = null
  const setContent = () => {
    switch (mode) {
      case "CREATE":
        content = <CreateForm topics={topics} setTopic={setTopic} />
        break
      case "READ":
        content = <Article title={topic.title} body={topic.body} />
        break
    }
  }
  setContent()

  return (
    <div >
      <div className="navigation">
        <Header />
        <CreateButton setMode={setMode} />
        <Navigation topics={topics} setMode={setMode} setTopic={setTopic} />
      </div>
      <div className="content">
        {content}
      </div>
    </div>
  );
}

export default App;
