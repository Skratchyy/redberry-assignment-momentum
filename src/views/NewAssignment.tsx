import { useForm } from 'react-hook-form';
import TextInput from '../components/inputs/TextInput';
import { useGetDepartmentsQuery } from '../services/api/departmentApi';
import { useGetEmployeesQuery } from '../services/api/employeeApi';
import { useGetPrioritiesQuery } from '../services/api/priorityApi';
import { useGetStatusesQuery } from '../services/api/statusApi';
import './NewAssignment.css'
import SelectInput from '../components/inputs/SelectInput';
import CustomSelectInput from '../components/inputs/CutsomSelectInput';

function NewAssignment() {
  const {data: departments = []} = useGetDepartmentsQuery();
  const {data: employees = []} = useGetEmployeesQuery();
  const {data: statuses = []} = useGetStatusesQuery();
  const {data: priorities = []} = useGetPrioritiesQuery();


  const {register, control, handleSubmit} = useForm();
  return <section>
    <h1>დავალების შექმნა</h1>
    <form className="new_assignment_container" onSubmit={handleSubmit((data) => console.log(data))}>
      <fieldset className="new_assignment_label new_assignment_field-1">
        <TextInput label="სათაური" name='name' register={register} errormessages={["მინიმუმ 2 სიმბოლო", "მაქსუმუმ 255 სიმბოლო"]} required/>
      </fieldset>
      <fieldset className="new_assignment_label new_assignment_field-2">
        <CustomSelectInput name='departments' label='დეპარტამენტი' options={departments} control={control} />
      </fieldset>
      <fieldset className="new_assignment_label new_assignment_field-3">
        <TextInput label='აღწერა' name='description' register={register} errormessages={["მინიმუმ 2 სიმბოლო", "მაქსუმუმ 255 სიმბოლო"]} required isTextarea/>
      </fieldset>
      <fieldset className="new_assignment_label new_assignment_field-4">
        <CustomSelectInput name='priorities' label='პრიორიტეტი' control={control} options={priorities} />
      </fieldset>
      <fieldset className="new_assignment_label new_assignment_field-5">
        <CustomSelectInput name='status' label='სტატუსი' options={statuses} control={control} />
      </fieldset>
      <fieldset className="new_assignment_label new_assignment_field-6">
        <CustomSelectInput name='employee' label='თანამშრომელი' options={employees} control={control} />
      </fieldset>
      <fieldset className="new_assignment_label new_assignment_field-7"></fieldset>
      <button>submit</button>
    </form>
  </section>
}

export default NewAssignment;
