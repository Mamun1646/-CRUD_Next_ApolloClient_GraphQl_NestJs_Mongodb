// create a post folder and index.js file in pages/posts folder
import Link from "next/link";
const Posts = ({ posts }) => (
  <div>
    {posts.map((post) => (
      <div>
        <Link href={`/posts/${post.id}`}>
          <a style={{ fontSize: "20px", textDecoration: "underline" }}>
            {post.title}
          </a>
        </Link>
        <p>{post.body}</p>
      </div>
    ))}
  </div>
);

export async function getServerSideProps() {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
  const posts = await res.json();
  return { props: { posts } };
}
export default Posts;
