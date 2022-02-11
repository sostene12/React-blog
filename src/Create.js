import { useState } from "react";

const Create = () => {

    const [title,setTitle] = useState('');
    const [body,setBody] = useState('');
    const [author,setAuthor] = useState('mario')
    const [ispending,setPending] = useState(false);
    const [msg,setMsg] = useState(null);

    const handleSubmit = (e) =>{
        e.preventDefault();
        const blog = {title,body,author};
       fetch('http://localhost:8000/blogs',{
           method:"POST",
           body:JSON.stringify(blog),
           headers:{"Content-Type":"application/json"}
       }).then(() => {
           
        setMsg('Your blog have successflly added');
       })
    //    window.location.replace('/index.html')
    }

    return ( 
        <div className="create">
            <h2 className="title">Add a New Blog</h2>
            <form onSubmit={handleSubmit}>
                <label >Blog title:</label>
                <input type="text" 
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <label >Blog body:</label>
              <textarea 
                required
                value={body}
                onChange={(e) => setBody(e.target.value)}
              ></textarea>
              <label >Blog author:</label>
              <select 
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              >
                  <option value="mario">mario</option>
                  <option value="yoshi">yoshi</option>
              </select>
              <button>Add Blog</button>
            </form>
            {msg && <h2>{msg}</h2>}
        </div>
     );
}
 
export default Create;
