import { Button } from "@mui/material"
import { useEffect, useState } from "react"
import { Modal, ModalBody, ModalHeader } from "reactstrap"
import { removeMessage } from "src/redux/actions/message"

const { useDispatch, useSelector } = require("react-redux")

const useMessage = () => {
    const dispatch = useDispatch()
    const { message } = useSelector(state => state.message)
    const { darkMode } = useSelector(state => state.darkMode)

    const [messageWrapper, setMessageWrapper] = useState(null)

    useEffect(() => {
        setMessageWrapper(
            <Modal className={`message-modal${darkMode ? ' dark-mode' : ''}`} isOpen={!!message} toggle={() => dispatch(removeMessage())}>
                <ModalHeader toggle={() => dispatch(removeMessage())}>Message</ModalHeader>
                <ModalBody>
                    {message}
                    <Button variant='contained' color='primary' onClick={() => dispatch(removeMessage())}>Close</Button>
                </ModalBody>
            </Modal>
        )
        //eslint-disable-next-line
    }, [message])

    return messageWrapper;
}

export default useMessage;