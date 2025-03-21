import { useEffect } from "react";
import SecondaryButton from "../buttons/SecondaryButton";
import "./newEmployeeModal.css";
import { useForm } from "react-hook-form";
import TextInput from "../inputs/TextInput";
import PrimaryButton from "../buttons/PrimaryButton";
import ImageUpload from "../inputs/ImageInput";
import SelectInput from "../inputs/SelectInput";
import { useGetDepartmentsQuery } from "../../services/api/departmentApi";
import {
  nameValidation,
  selectValidation,
} from "../../validations/employeeValidation";
import { useCreateEmployeeMutation } from "../../services/api/employeeApi";
import { CreateEmployeeRequest } from "../../types/api.types";

type ModalProps = {
  ref: React.RefObject<HTMLDialogElement | null>;
};

function NewUserModal({ ref }: ModalProps) {
  const { data, isLoading } = useGetDepartmentsQuery();
  const [createEmployee, { isLoading: isCreating }] =
    useCreateEmployeeMutation();
  const {
    register,
    handleSubmit,
    formState: { isValid },
    reset,
  } = useForm<CreateEmployeeRequest>({
    mode: "onChange",
  });

  const handleCloseModal = (e?: React.MouseEvent) => {
    e?.preventDefault();
    reset()
    dialogEl?.close();
  };

  const onSubmit = async (data: CreateEmployeeRequest) => {
    try {
      const employeeData: CreateEmployeeRequest = {
        name: data.name,
        surname: data.surname,
        department_id: data.department_id,
        avatar: data.avatar instanceof FileList ? data.avatar[0] : data.avatar,
      };

      console.log(employeeData);
      await createEmployee(employeeData).unwrap();
      reset();
      dialogEl?.close();
    } catch (error) {
      console.error("Failed to create employee:", error);
    }
  };

  const dialogEl = ref?.current;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dialogEl && event.target === dialogEl) {
        dialogEl.close();
      }
    };
    const dialogEl = ref?.current;
    if (dialogEl) {
      dialogEl.addEventListener("click", handleClickOutside);
    }
    return () => {
      if (dialogEl) {
        dialogEl.removeEventListener("click", handleClickOutside);
      }
    };
  }, [ref]);

  if (!isLoading)
    return (
      <dialog ref={ref} className="new_user_modal">
        <div>
          <h1>თანამშრომლის დამატება</h1>
          <form
            className="new_user_modal_form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <fieldset className="new_user_fieldset">
              <TextInput
                label="სახელი"
                register={register}
                name="name"
                validationrules={nameValidation}
              />
              <TextInput
                label="გვარი"
                register={register}
                name="surname"
                validationrules={nameValidation}
              />
            </fieldset>
            <ImageUpload label="ავატარი" name="avatar" register={register} />

            <SelectInput
              name="department_id"
              label="დეპარტამენტი"
              register={register}
              options={data}
              validationrules={selectValidation}
            />

            <div className="new_user_modal_actions">
              <PrimaryButton
                type="submit"
                title="დამატება"
                icon={false}
                disabled={!isValid || isCreating}
              />
              <SecondaryButton
                onClick={handleCloseModal}
                type="button"
                title="დახურბა"
              />
            </div>
          </form>
        </div>
      </dialog>
    );
}

export default NewUserModal;
