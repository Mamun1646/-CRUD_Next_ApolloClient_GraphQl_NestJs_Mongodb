function Blog({ Person }) {
  return (
      <ul>
          

      {Person.result.map((post) => (
        <li key={post.contestId}>
          <h4>{post.contestName}</h4>
          <h4>Rank : {post.rank}</h4>
          <h1>Old Rating : {post.oldRating}</h1>
          <h1>New Rating : {post.newRating}</h1>
        </li>
      ))}
    </ul>
  );
}

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.
export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const res = await fetch(
    `https://codeforces.com/api/user.rating?handle=Fefer_Ivan`
  );
  const Person = await res.json();

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      Person,
    },
  };
}

export default Blog;
