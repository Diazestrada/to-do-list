import { useState } from "react";
import { ICardTask } from "../../../types";
import { truncatedCarater } from "../../../utils";
import TaskModal from "../modalAdd";
import "./styles.scss";

const TaskCard: React.FC<ICardTask> = ({ uid, title, description, status }) => {
  const [visible, setVisible] = useState<boolean>(false);

  const handlerModal = () => {
    setVisible(true);
  };
  return (
    <>
      <div className="card w-50 spaceVertical">
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{truncatedCarater(description)}</p>
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={handlerModal}
          >
            Ver mas
          </button>
        </div>
      </div>
      <TaskModal
        title="Actualizar tareas"
        visible={visible}
        data={{ uid, title, description, status }}
        modalBackdropClicked={() => setVisible(false)}
      />
    </>
  );
};

export default TaskCard;
