import { useEffect } from "react";
import SearchTask from "../../../components/card/search";
import TaskCard from "../../../components/card/task";
import { useReduxSelector, RootState } from "../../../store/index";

const HomeScreen = () => {
  const data = useReduxSelector((state: RootState) => state.app.tasks);

  useEffect(() => {}, []);
  return (
    <div className="container">
      <div style={{ margin: "5%" }}>
        <h3 style={{ textAlign: "center" }}>Prueba tecnica de TO-DO LIST</h3>

        <SearchTask />

        <div style={{ marginTop: "2%" }} className="row text-center">
          {Array.isArray(data) &&
            data.map((item, index) => (
              <div className="col-md-4 col-sm-6 col-lg-6 col-xl-4" key={index}>
                <TaskCard
                  uid={item.uid}
                  title={item.title}
                  description={item.description}
                  status={item.status}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
