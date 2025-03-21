import './cardComponentsStyle.css'

type DepartmentProps = {
  department: string;
};

function DepartmentTag({ department }: DepartmentProps) {
  const colors = ["#FF66A8", "#FD9A6A", "#89B6FF", "#FFD86D"];
  const suffix = "ს დეპარტამენტი"
  return (
    <div
      className="department_tag"
      style={{ backgroundColor: colors[Math.floor(Math.random() * colors.length)] }}
    >
      {department.replace(suffix, '')}
    </div>
  );
}

export default DepartmentTag;
