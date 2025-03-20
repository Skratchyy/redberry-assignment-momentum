import './cardComponentsStyle.css'

type DepartmentProps = {
  department: string;
};

function DepartmentTag({ department }: DepartmentProps) {
  const colors = ["#FF66A8", "#FD9A6A", "#89B6FF", "#FFD86D"];
  return (
    <div
      className="department_tag"
      style={{ backgroundColor: colors[Math.floor(Math.random() * colors.length)] }}
    >
      {department.split(' ')[0]}
    </div>
  );
}

export default DepartmentTag;
