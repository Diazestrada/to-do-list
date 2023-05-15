import Modal from "react-bootstrap4-modal";
import Select from "react-select";
import * as Yup from "yup";
import { useFormik } from "formik";
import { v4 as uuidv4 } from "uuid";

import { ICardTask, IPropsModalAdd, TaskStatus } from "../../../types";
import {
  RootState,
  useReduxDispatch,
  useReduxSelector,
} from "../../../store/index";
import { addTask, updateTask } from "../../../store/modules/app";
import { useEffect, useState } from "react";

const TaskModal: React.FC<IPropsModalAdd> = ({
  title,
  visible,
  data,
  modalBackdropClicked,
}) => {
  const [status, setStatus] = useState<any[]>([]);
  const tasks = useReduxSelector((state: RootState) => state.app.tasks);

  const initialValues: ICardTask = {
    title: data?.title ? data?.title : "",
    description: data?.description ? data?.description : "",
    uid: data?.uid ? data?.uid : uuidv4(),
    status: data?.status ? data?.status : TaskStatus.PENDING,
  };

  const options: any[] = [
    { value: TaskStatus.PENDING, label: "Pendiente" },
    { value: TaskStatus.TERMINATED, label: "Finalizar" },
  ];

  const dispatch = useReduxDispatch();
  const FormAddTask = Yup.object().shape({
    title: Yup.string().required("Este campo es obligatorio"),
    description: Yup.string().required("Este campo es obligatorio"),
  });

  const { handleSubmit, handleChange, touched, errors, values, resetForm } =
    useFormik({
      initialValues,
      validationSchema: FormAddTask,
      onSubmit: (values) => {
        if (data) {
          updateTas(values);
          return;
        }
        taskAdd(values);
      },
    });

  const taskAdd = (data: ICardTask) => {
    dispatch(addTask(data));
    resetForm();
    modalBackdropClicked();
  };

  const updateTas = (newvalue: ICardTask) => {
    const index = tasks.findIndex((item) => item.uid === data?.uid);
    console.log(index);
    dispatch(updateTask({ index, newvalue }));
    resetForm();
    modalBackdropClicked();
  };

  return (
    <Modal visible={visible}>
      <form onSubmit={handleSubmit}>
        <div className="modal-header">
          <h5 className="modal-title">{title}</h5>
        </div>
        <div className="modal-body">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Titulo
            </label>
            <input
              className={`form-control ${
                errors.title && touched.title ? "is-invalid" : ""
              }`}
              id="title"
              onChange={handleChange("title")}
              value={values.title}
            />

            {errors?.title && touched.title ? (
              <div className="invalid-feedback">{errors.title}</div>
            ) : null}
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Descripcion
            </label>
            <input
              className={`form-control ${
                errors.description && touched.description ? "is-invalid" : ""
              }`}
              id="description"
              onChange={handleChange("description")}
              value={values.description}
            />
            {errors?.description && touched.description ? (
              <div className="invalid-feedback">{errors.description}</div>
            ) : null}
          </div>

          {data && (
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Estado
              </label>
              <Select
                className={`${
                  errors.description && touched.description ? "is-invalid" : ""
                }`}
                options={options}
                defaultValue={
                  options.filter((item) => item.value === data.status)[0]
                }
                id="status"
                onChange={(_status: string[]) => {
                  console.log(_status);
                  setStatus(_status);
                }}
              />
              {errors?.description && touched.description ? (
                <div className="invalid-feedback">{errors.description}</div>
              ) : null}
            </div>
          )}
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={modalBackdropClicked}
          >
            Cancelar
          </button>
          <button type="submit" className="btn btn-primary">
            Guardar
          </button>
        </div>
      </form>
    </Modal>
  );
};
export default TaskModal;
