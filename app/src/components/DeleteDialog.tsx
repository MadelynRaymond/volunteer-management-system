import { DeleteIcon } from '@chakra-ui/icons'
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, useDisclosure, IconButton } from '@chakra-ui/react'
import React from 'react'

interface DialogProps {
  header: string,
  body: string,
  deletionId: number
}
export default function DeleteDialog({header, body, deletionId}: DialogProps) {
  const {isOpen, onOpen, onClose} = useDisclosure()
  const cancelRef = React.useRef(null)

  return (
    <>
      <IconButton onClick={onOpen} icon={<DeleteIcon/>} aria-label={'delete'}/>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              {header}
            </AlertDialogHeader>

            <AlertDialogBody>
              {body}
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={onClose} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}
