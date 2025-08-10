
function App() {

  return (
   <div style={{ backgroundColor: "#dfe6e9", height: "100vh"}}>
    <div style={{ display: "flex", justifyContent: "center" }}>
      <PostComponent 
        name = "Siddhesh Ravindra Daphane" 
        followers={20000}
        time= "12m ago"
        description="This is Siddhesh Daphane learning about react from basics"
        image="https://media.licdn.com/dms/image/v2/D5603AQEEuKfIIe3L5w/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1705523004959?e=1757548800&v=beta&t=NpYr9kCbH364WsAJ6OQ8pZhmfxWlvbAwYcDUDQHCIAg"  
      />
    </div>
    <br />
    <div style={{ display: "flex", justifyContent: "center" }}>
      <PostComponent 
        name = "Elon Musk" 
        followers={20000000}
        time= "2m ago"
        description="Tesla is the biggest AI project on planet earth."
        image="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcR6bAaKXafqo8j-faUhkf6EixtnE2ER6_k02C4DM45RlLK_69ly0b4BqecKl7r1MH6s2tsshXIp-zk43QHoAaCQI22dY7wOyzpAkKG5Q9BmYw"  
      />
    </div>
    <br />
    <div style={{ display: "flex", justifyContent: "center" }}>
      <PostComponent />
    </div>
    
   </div>
  )
}

function PostComponent({ name, followers, time, description, image }) {
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
          <div>{followers}</div>
          <div>{time}</div>
        </div>
    </div>
    <div style={{ marginLeft: 10, paddingBottom: 10 }}>
      {description}
    </div>
</div>
}

export default App
