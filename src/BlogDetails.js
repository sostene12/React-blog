import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import useFetch from "./useFetch";

const BlogDetails = () => {

    const { id } = useParams();

    const {data:blog,isPending,error} = useFetch('http://localhost:8000/blogs/'+ id);
    // const blgdelete = {author,body,title};
    const history = useHistory();
    const handleDelete = (e) =>{
        e.preventDefault();
        fetch('http://localhost:8000/blogs/'+ id,{
            method:'DELETE'
        }).then(() =>{
            history.push('/');
            // or do like this
            // history.go(-1);
        })
    }

    return ( 
        <div className="blog-details">
          {isPending && <div>Loading...</div>}
          {error && <div>{error}</div>}
          {blog && (
              <article>
                  <h2>{blog.title}</h2>
                  <p>Written by : {blog.author}</p>
                 <div>
                 {blog.body}
                 </div>
                 <button className="delete" onClick={handleDelete}>Delete</button>
              </article>
          )}
        </div>
     );
}
 
export default BlogDetails;