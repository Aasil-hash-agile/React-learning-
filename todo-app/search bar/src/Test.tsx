

export default function Test({searchTerm,setSearchTerm}:{searchTerm:string,setSearchTerm:(value:string)=>void}) {



  return (
    <section style={{ padding: "20px" }}>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search..."
        style={{ padding: "8px", width: "300px", marginBottom: "20px" }}
      />
    </section>
  );
}
