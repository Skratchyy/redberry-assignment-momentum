import Filter from "../components/filter/Filter";
import FilterTag from "../components/filter/filter_tag/FilterTag";
import { useFilteredTasks } from "../hooks/useFilteredTask";
import { useGetStatusesQuery } from "../services/api/statusApi";
import HomeComponent from "./home/HomeComponent";

function Home() {
  const { tasks, isLoading, error } = useFilteredTasks();
  const { data: statuses = [] } = useGetStatusesQuery();

  if(isLoading) return "Loading..."

  if(error) return "Something went wrong try again later."
  return (
    <>
      <h1 style={{marginBottom: "40px"}}>დავალებების გვერდი</h1>
      <Filter />
      <FilterTag />
      <div style={{ display: "flex",justifyContent: "space-between", marginTop: "40px" }}>
        {statuses.map((status) => (
          <HomeComponent status={status} tasks={tasks} />
        ))}
      </div>
    </>
  );
}

export default Home;
