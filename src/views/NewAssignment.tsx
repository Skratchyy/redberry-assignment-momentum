import { useForm } from "react-hook-form";
import TextInput from "../components/inputs/TextInput";
import { useGetDepartmentsQuery } from "../services/api/departmentApi";
import { useGetEmployeesQuery } from "../services/api/employeeApi";
import { useGetPrioritiesQuery } from "../services/api/priorityApi";
import { useGetStatusesQuery } from "../services/api/statusApi";
import "./NewAssignment.css";
import CustomSelectInput from "../components/inputs/CutsomSelectInput";
import { useEffect } from "react";
import { nameValidation } from "../validations/employeeValidation";

function NewAssignment() {
  const { data: departments = [] } = useGetDepartmentsQuery();
  const { data: employees = [] } = useGetEmployeesQuery();
  const { data: statuses = [] } = useGetStatusesQuery();
  const { data: priorities = [] } = useGetPrioritiesQuery();

  const { register, control, handleSubmit, setValue, watch, formState: {errors, dirtyFields}} = useForm({mode: "onSubmit"});

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

  return (
    <section>
      <h1>დავალების შექმნა</h1>
      <form
        className="new_assignment_container"
        onSubmit={handleSubmit((data) => console.log(data))}
      >
        <fieldset className="new_assignment_label new_assignment_field-1">
          <TextInput
            label="სათაური"
            name="name"
            register={register}
            errors={errors}
            dirtyfields={dirtyFields}
            validationrules={nameValidation}
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
            validationrules={nameValidation}
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
        </fieldset>
        <button>submit</button>
      </form>
    </section>
  );
}

export default NewAssignment;
