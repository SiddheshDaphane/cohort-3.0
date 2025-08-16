import { useState } from "react"

function App() {

  const [posts, setPosts] = useState([]);

  const PostComponents = posts.map(post => <PostComponent 
    name={post.name}
    subtitle={post.subtitle}
    time={post.time}
    image={post.image}
    description={post.description}
  />)


  function addPost() {
    setPosts([...posts, {
      name: "Siddhesh Daphane",
      subtitle: "1000 followers",
      time: "15m ago",
      description: "Siddhesh is learning react",
      image: "https://media.licdn.com/dms/image/v2/D5603AQEEuKfIIe3L5w/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1705523004959?e=1758153600&v=beta&t=rkRimPr6FE_Tmv0ZKxKtAZjSZggtViR8EVV3fvO646U"
    }])
  }

  return (
   <div style={{ backgroundColor: "#dfe6e9", height: "100vh"}}>
    <button onClick={addPost}>Add Post</button>
    <div style={{display: "flex", justifyContent: "center"}}>
      <div>
      {PostComponents}
      </div>
    </div>
   </div>
  )
}


function PostComponent({ name, subtitle, time, description, image }) {
  return <div style={{width: 300, backgroundColor: "white", borderRadius: 10, borderColor: "gray", marginTop:20}}>
    <div style={{width: 300, backgroundColor: "white", borderRadius: 10, borderColor: "gray", display: "flex"}}>
    <img src={image} style={{
      height: 30,
      widows: 20,
      borderRadius: 30,
      padding: 10
    }}>
    </img>
      <div style={{fontSize: 15, padding: 10}}>
        <b>
          {name}
        </b>
          <div>{subtitle}</div>
          {(time !== undefined) ? <div style={{ display: "flex" }}>
            <div>{time}</div>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCacYgvmHtjjSw9QNvGoFNKAirTXUHPN1ANDRq8UMCS7lzcwf_BNK1zK0&s" style={{ height: 15, width: 15, marginLeft: 5, justifyContent: "center" }}></img>
          </div> : <div></div>}
        </div>
    </div>
    <div style={{ marginLeft: 10, paddingBottom: 10 }}>
      {description}
    </div>
</div>
}

export default App
