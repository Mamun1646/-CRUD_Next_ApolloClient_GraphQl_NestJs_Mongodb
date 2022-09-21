import { useRouter } from "next/router";
import { Button } from "react-bootstrap";
import { DELETE_USER } from "../../components/graphql/index";
import { useMutation } from "@apollo/react-hooks";
import { Modal } from "react-bootstrap";
import style from "../../styles/Delete.module.css";
export default function Delete() {
  const router = useRouter();
  const { id } = router.query;

  const [deleteUser] = useMutation(DELETE_USER);
  const handleOnClick = () => {
    deleteUser({ variables: { id } });

    alert("Delete Successful");
    router.push("/");
  };

  return (
    <div className={style.container}>
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>Are You Sure?</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button
            className={style.delete__btn}
            onClick={() => router.push("/")}
            variant="info"
          >
            Cancel
          </Button>
          <Button onClick={handleOnClick} variant="danger">
            Delete
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
}
