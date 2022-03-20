import { Button } from "@mui/material"
import { useEffect, useState } from "react"
import { Modal, ModalBody, ModalHeader } from "reactstrap"
import { removeMessage } from "src/redux/actions/message"

const { useDispatch, useSelector } = require("react-redux")

const useMessage = () => {
    const dispatch = useDispatch()
    const { message } = useSelector(state => state.message)

    const [messageWrapper, setMessageWrapper] = useState(null)

    useEffect(() => {
        setMessageWrapper(
            <Modal className='message-modal' isOpen={!!message} toggle={() => dispatch(removeMessage())}>
                <ModalHeader toggle={() => dispatch(removeMessage())}>Message</ModalHeader>
                <ModalBody>
                    {message}
                    <Button variant='contained' color='primary' onClick={() => dispatch(removeMessage())}>Close</Button>
                </ModalBody>
            </Modal>
        )
    }, [message])

    return messageWrapper;
}

export default useMessage;