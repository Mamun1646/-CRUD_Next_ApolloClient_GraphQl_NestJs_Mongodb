import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Link from "next/link";
const Posts = ({ posts }) => {

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Country</th>
          <th>Description</th>
          <th>Image</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {posts.map((user) => (
          <tr key={user._id}>
            <td>{user._id}</td>
            <td>{user.name}</td>
            <td>{user.country}</td>
            <td>{user.Description}</td>
            <td>
              <img
                className="view_image"
                src={user.image}
                alt="Card image cap"
              />
            </td>

            <td>
              <Link href={`/Read/${user._id}`}>
                <Button className="action__btn" variant="success">
                  Read
                </Button>
              </Link>

              <Link href={`/Edit/${user._id}`}>
                <Button className="action__btn" variant="info">
                  Edit
                </Button>
              </Link>

              <Link href={`/Delete/${user._id}`}>
                <Button className="action__btn" variant="danger">
                  Delete
                </Button>
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default Posts;
