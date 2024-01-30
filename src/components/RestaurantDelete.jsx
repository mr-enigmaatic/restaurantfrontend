import { Delete } from "@mui/icons-material";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import instance from "../axios";
import { useDispatch } from "react-redux";
import { delRestaurant } from "../redux/restaurantSlice";

function RestaurantDelete({id}) {

    const dispatch = useDispatch();

    const [show, setShow] = useState(false);
    const handleClose = ()=> setShow(false);

    const handleDelete = async ()=> {

        try {
            
            let res = await instance.delete(`api/v1/restaurant/${id}`, {
                withCredentials: true
            });

            if (!res.data.success) {
                toast.error(res.data.message)
            }

            setShow(false)
            toast.success(res.data.message)
            console.log(res.data.restaurant._id);
            dispatch(delRestaurant(res.data.restaurant._id));

        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

  return (
    <>
    <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Restaurant?</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure that you want to delete this restaurant?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleDelete}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
            <ToastContainer position='top-center' autoClose='1000'/>
            <Delete onClick={setShow} />
    </>
  )
}

export default RestaurantDelete