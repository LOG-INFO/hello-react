import logo from './logo.svg'
import './App.css'
import { useState } from 'react'

function Header(props) {
  const onClick = (event) => {
    // html 에서 a 태그나 submit 태그는 고유의 동작이 있다. 
    // (페이지를 이동시킨다거나, form 안에 있는 input 등을 전송한다던가)
    // event.preventDefault()는 그러한 동작을 중단시킨다.
    event.preventDefault()
    window.location.href = "/"
  }

  return <header>
    <h1>
      <a href='/' style={{ color: "#EEEEEE" }} onClick={onClick}>
        <p >HEADER</p>
      </a>
    </h1>
  </header>
}

function CreateMode(props) {
  return <button className='createButton' onClick={event => {
    props.setMode("WRITE")
  }}>
    Write
  </button>
}

function UpdateMode(props) {
  return <button className='listButton' onClick={event => {
    props.setMode("UPDATE")
    props.setTopic(props.topic)
  }}>
    Update
  </button>
}


function DeleteMode(props) {
  return <button className='listButton' onClick={event => {
    const message = "'" + props.topic.title + "'" + " 게시글을 삭제하시겠습니까?"
    const isDelete = window.confirm(message)
    if (isDelete) {
      props.setMode("DELETE")
      topics.delete(props.topic.id)
      props.setMode("READ")
      props.setTopics(new Map(topics))
    }
  }}>
    Delete
  </button>
}

function TopicForm(props) {
  const topic = props.topic ? props.topic : { id: "", title: "", body: "" }
  const [id, setId] = useState(topic.id)
  const [title, setTitle] = useState(topic.title)
  const [body, setBody] = useState(topic.body)
  if (topic.id != id) {
    setId(topic.id)
    setTitle(topic.title)
    setBody(topic.body)
  }

  const onChangeId = (event) => {
    setTitle(event.target.id)
  }

  const onChangeTitle = (event) => {
    setTitle(event.target.value)
  }

  const onChangeBody = (event) => {
    setBody(event.target.value)
  }

  const save = (id, title, body) => {
    if (!id) {
      id = nextId++
    }

    const topic = {
      id: id,
      title: title,
      body: body,
    }

    topics.set(id, topic)
    console.log(topics)
    props.setTopic(topic)
    props.setMode("READ")
    alert("작성 완료!")
  }

  const onSubmit = (event) => {
    event.preventDefault()

    const { id, newTitle, newBody } = event.target
    save(Number(id.value), newTitle.value, newBody.value)
  }

  return <div>
    <form onSubmit={onSubmit}>
      <p><input id="id" type="number" onChange={onChangeId} value={topic.id} hidden /></p>
      <p><input id="newTitle" type="text" onChange={onChangeTitle} value={title} placeholder="타이틀을 입력하세요" /></p>
      <p><textarea id="newBody" value={body} onChange={onChangeBody} placeholder="내용을 입력하세요" rows="10" cols="50" /></p>
      <p><input type="submit" defaultValue="작성" /></p>
    </form>
  </div>
}

function ListElement(props) {
  const { topic } = props
  const onClick = (event) => {
    event.preventDefault()
    props.onClick(topic)
  }
  return <li className="navigationElement">
    <a style={{ color: "#EEEEEE", fontSize: "200%", display: "inline-block" }} className='maxLength100' href={'/read/' + topic.id} onClick={onClick} >{topic.id}. {topic.title}</a>
    <div className='listButtonsBox'>
      <UpdateMode topic={topic} setTopic={props.setTopic} setMode={props.setMode} />
      <DeleteMode topic={topic} setMode={props.setMode} setTopics={props.setTopics}/>
    </div>
  </li>
}

function Navigation(props) {

  const onClick = (topic) => {
    props.setMode("READ")
    props.setTopic(topic)
  }

  const [myTopics, setTopics] = useState(new Map(topics))
  if(topics != myTopics) {
    setTopics(topics)
  }

  const list = Array.from(myTopics.values()).map(topic =>
    <ListElement key={topic.id} topic={topic} setMode={props.setMode} setTopic={props.setTopic} onClick={onClick} setTopics={setTopics} />)

  return <nav>
    <ul>
      {list}
    </ul>
  </nav>
}

function Article(props) {
  const { topic } = props
  return <article>
    <h2>{topic.id}. {topic.title}</h2>
    {topic.body}
  </article>
}

const topics = new Map([
  [1, { id: 1, title: 'html', body: 'HTML is ...' }],
  [2, { id: 2, title: 'css', body: 'CSS is ...' }],
  [3, { id: 3, title: 'Javascript', body: 'Javascript is ...' }],
  [4, { id: 4, title: 'Javascript LongLongLong', body: 'Javascript is ........................' }],
])

let nextId = 5

function App() {
  const [mode, setMode] = useState(null)
  const [topic, setTopic] = useState(null)

  let content = null
  const setContent = () => {
    switch (mode) {
      case "WRITE":
        content = <TopicForm setTopic={setTopic} setMode={setMode} />
        break
      case "UPDATE":
        content = <TopicForm topic={topic} setTopic={setTopic} setMode={setMode} />
        break
      case "READ":
        if (topic === null) {
          break
        }
        content = <Article topic={topic} />
        break
    }
  }
  setContent()

  return (
    <div >
      <div className="navigation">
        <Header />
        <CreateMode setMode={setMode} />
        <Navigation topics={topics} setMode={setMode} setTopic={setTopic} />
      </div>
      <div className="content">
        {content}
      </div>
    </div>
  );
}

export default App;
