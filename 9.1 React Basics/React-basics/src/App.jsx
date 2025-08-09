
function App() {

  return (
   <div style={{ backgroundColor: "#dfe6e9", height: "100vh"}}>
    <div style={{ display: "flex", justifyContent: "center" }}>
      <PostComponent />
    </div>
    <br />
    <div style={{ display: "flex", justifyContent: "center" }}>
      <PostComponent />
    </div>
    <br />
    <div style={{ display: "flex", justifyContent: "center" }}>
      <PostComponent />
    </div>
    
   </div>
  )
}

function PostComponent() {
  return <div style={{width: 300, backgroundColor: "white", borderRadius: 10, borderColor: "gray"}}>
    <div style={{width: 300, backgroundColor: "white", borderRadius: 10, borderColor: "gray", display: "flex"}}>
    <img src={"https://media.licdn.com/dms/image/v2/D5603AQEEuKfIIe3L5w/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1705523004959?e=1757548800&v=beta&t=NpYr9kCbH364WsAJ6OQ8pZhmfxWlvbAwYcDUDQHCIAg"} style={{
      height: 20,
      widows: 20,
      borderRadius: 20,
      padding: 10
    }}>
    </img>
      <div style={{marginLeft: 10, fontSize: 15, padding: 10}}>
        <b>
          Siddhesh Ravindra Daphane
        </b>
          <div>20000</div>
          <div>12m</div>
        </div>
    </div>
    <div style={{ marginLeft: 10, paddingBottom: 10 }}>
      This is Siddhesh Daphane learning react.
    </div>
</div>
}

export default App
