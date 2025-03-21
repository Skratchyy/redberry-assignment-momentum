import { useForm } from "react-hook-form";
import TextInput from "../components/inputs/TextInput";
import { useGetDepartmentsQuery } from "../services/api/departmentApi";
import { useGetEmployeesQuery } from "../services/api/employeeApi";
import { useGetPrioritiesQuery } from "../services/api/priorityApi";
import { useGetStatusesQuery } from "../services/api/statusApi";
import "./NewAssignment.css";
import CustomSelectInput from "../components/inputs/CutsomSelectInput";
import { useEffect, useState } from "react";
import { descriptionValidation, titleValidation } from "../validations/employeeValidation";
import DateInput from "../components/inputs/DateInput";
import PrimaryButton from "../components/buttons/PrimaryButton";
import { useCreateTaskMutation } from "../services/api/taskApi";
import { CreateTaskRequest } from "../types/api.types";

function NewAssignment() {
  const { data: departments = [] } = useGetDepartmentsQuery();
  const { data: employees = [] } = useGetEmployeesQuery();
  const { data: statuses = [] } = useGetStatusesQuery();
  const { data: priorities = [] } = useGetPrioritiesQuery();

  const [createTask, { isLoading }] = useCreateTaskMutation();
  const [submissionMessage, setSubmissionMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, dirtyFields },
  } = useForm({ mode: "onSubmit" });

  useEffect(() => {
    const savedData = localStorage.getItem("assignmentFormData");
    const parsedData = savedData ? JSON.parse(savedData) : undefined;
    if (parsedData) {
      Object.keys(parsedData).forEach((key) => {
        setValue(key, parsedData[key]);
      });
    }
  }, [setValue]);

  useEffect(() => {
    const subscription = watch((data) => {
      localStorage.setItem("assignmentFormData", JSON.stringify(data));
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit = async (data: any) => {
    try {
      const taskRequest: CreateTaskRequest = {
        name: data.name,
        description: data.description,
        due_date: data.dueDate,
        status_id: data.status,
        employee_id: data.employee,
        priority_id: data.priorities
      };
      await createTask(taskRequest).unwrap();
      setSubmissionMessage({
        type: 'success',
        text: 'დავალება წარმატებით შეიქმნა!'
      });
      reset();
      localStorage.removeItem("assignmentFormData");
      setTimeout(() => {
        setSubmissionMessage(null);
      }, 3000);
    } catch (err) {
      console.error('Failed to create task:', err);
      setSubmissionMessage({
        type: 'error',
        text: 'დავალების შექმნა ვერ მოხერხდა. გთხოვთ, სცადოთ მოგვიანებით.'
      });
    }
  };
  useEffect(() => {
    if (submissionMessage?.type === 'error') {
      const subscription = watch(() => {
        setSubmissionMessage(null);
      });
      return () => subscription.unsubscribe();
    }
  }, [submissionMessage, watch]);

  return (
    <section>
      <h1>დავალების შექმნა</h1>

      {submissionMessage && (
        <div className={`submission-message ${submissionMessage.type}`}>
          {submissionMessage.text}
        </div>
      )}

      <form
        className="new_assignment_container"
        onSubmit={handleSubmit(onSubmit)}
      >
        <fieldset className="new_assignment_label new_assignment_field-1">
          <TextInput
            label="სათაური"
            name="name"
            register={register}
            errors={errors}
            dirtyfields={dirtyFields}
            validationrules={titleValidation}
            errormessages={["მინიმუმ 2 სიმბოლო", "მაქსუმუმ 255 სიმბოლო"]}
            required
          />
        </fieldset>
        <fieldset className="new_assignment_label new_assignment_field-2">
          <CustomSelectInput
            name="departments"
            label="დეპარტამენტი"
            options={departments}
            control={control}
            required
          />
        </fieldset>
        <fieldset className="new_assignment_label new_assignment_field-3">
          <TextInput
            label="აღწერა"
            name="description"
            errors={errors}
            dirtyfields={dirtyFields}
            validationrules={descriptionValidation}
            register={register}
            errormessages={["მინიმუმ 2 სიმბოლო", "მაქსუმუმ 255 სიმბოლო"]}
            required
            isTextarea
          />
        </fieldset>
        <fieldset className="new_assignment_label new_assignment_field-4">
          <CustomSelectInput
            name="priorities"
            label="პრიორიტეტი"
            control={control}
            options={priorities}
            required
          />
        </fieldset>
        <fieldset className="new_assignment_label new_assignment_field-5">
          <CustomSelectInput
            name="status"
            label="სტატუსი"
            options={statuses}
            control={control}
            required
          />
        </fieldset>
        <fieldset className="new_assignment_label new_assignment_field-6">
          <CustomSelectInput
            name="employee"
            label="თანამშრომელი"
            options={employees}
            control={control}
            required
          />
        </fieldset>
        <fieldset className="new_assignment_label new_assignment_field-7">
          <DateInput
            name="dueDate"
            label="თარიღი"
            control={control}
            required
          />
        </fieldset>
        <div className="submit">
          <PrimaryButton
            title={isLoading ? "იტვირთება..." : "დამატება"}
            type="submit"
            disabled={isLoading}
          />
        </div>
      </form>
    </section>
  );
}

export default NewAssignment;