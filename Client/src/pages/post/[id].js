

// function Post({ post }) {
//     // Render post...
//     return (
//         <div>
//             <h1>{post.title}</h1>
//             <p>{post.body}</p>
//         </div>
//     )
// }

// export async function getStaticPaths() {
//     const res = await fetch('https://jsonplaceholder.typicode.com/posts')
//     const posts = await res.json()
//     const paths = posts.map((post) => ({
//         params: { id: post.id.toString() },
//     }))

//     // We'll pre-render only these paths at build time.
//     // { fallback: false } means other routes should 404.
    
//     return {
//         paths,
//         fallback: true
//     }
// }


// export async function getStaticProps({ params }) {
//     const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`)
//     const post = await res.json()
    

//     return {
//         props: { post },
//         revalidate: 10,
//     }
// }
// export default Post


import React from "react";

const Posts = ({ posts, loading }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <ul className="list-group mb-4">
      {posts.map((post) => (
        <li key={post._id} className="list-group-item">
          {post.name}
        </li>
      ))}
    </ul>
  );
};

export default Posts;
