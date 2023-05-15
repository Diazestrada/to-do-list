import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";

import { useReduxSelector, RootState } from "../../../store/index";

import TaskModal from "../modalAdd";

const SearchTask = () => {
  const [visible, setVisible] = useState<boolean>(false);

  const data = useReduxSelector((state: RootState) => state.app.tasks);

  const handlerSearch = (filter: string) => {
    data.filter(
      (item) =>
        item.title.toLowerCase().includes(filter.toLowerCase()) ||
        item.status.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const FormFilter = Yup.object().shape({
    filter: Yup.string(),
  });

  const handlerModal = () => {
    setVisible(true);
  };

  const { handleSubmit, handleChange, values, resetForm } = useFormik({
    initialValues: { filter: "" },
    validationSchema: FormFilter,
    onSubmit: (values) => {
      resetForm();
      handlerSearch(values?.filter);
    },
  });

  return (
    <>
      <form className="d-flex" role="search" onSubmit={handleSubmit}>
        <input
          id="filter"
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          onChange={handleChange("filter")}
          value={values.filter}
        />
        <button className="btn btn-outline-success" type="submit">
          Buscar
        </button>

        <button
          className="btn btn-outline-success"
          type="button"
          onClick={handlerModal}
        >
          Añadir
        </button>
      </form>
      <TaskModal
        title="Agregar tareas"
        visible={visible}
        modalBackdropClicked={() => setVisible(false)}
      />
    </>
  );
};
export default SearchTask;
