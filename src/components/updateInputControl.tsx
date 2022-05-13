import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";
import {
  HStack,
  ButtonGroup,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  IconButton,
  Input,
  useEditableControls,
} from "@chakra-ui/react";

export function updateInputControl({ namePhoneme }: { namePhoneme?: string }) {
  function EditableControls() {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls();

    return isEditing ? (
      <ButtonGroup justifyContent="center" size="sm">
        <IconButton
          aria-label="Save"
          icon={<CheckIcon />}
          {...getSubmitButtonProps()}
        />
        <IconButton
          aria-label="Cancel"
          icon={<CloseIcon />}
          {...getCancelButtonProps()}
        />
      </ButtonGroup>
    ) : (
      <Flex justifyContent="center">
        <IconButton
          aria-label="Edit"
          size="sm"
          icon={<EditIcon />}
          {...getEditButtonProps()}
        />
      </Flex>
    );
  }
  return (
    <Editable
      textAlign="center"
      onSubmit={(e) => console.log(e)}
      defaultValue={namePhoneme}
      fontSize="2xl"
      isPreviewFocusable={false}
    >
      <HStack>
        <EditablePreview />
        <Input as={EditableInput} />
        <EditableControls />
      </HStack>
    </Editable>
  );
}
