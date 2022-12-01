import { useSelector } from "react-redux";
import ModalAddNotice from "components/ModalAddNotice/ModalAddNotice";
import Modal from "components/Modal/Modal";
import ModalNotice from "components/ModalNotice";
import { useEffect, useState } from "react";
import NoticeAllList from "components/NoticeAllList";

const NoticesCategoriesList = () => {
  const modalAddNoticeState = useSelector(({ notice }) => notice.modalAddNotice.active);
  const modalViewNotice = useSelector(({ notice }) => notice.modalViewNotice.active);
  const page = useSelector(({ notice }) => notice.page);
  const perPage = useSelector(({ notice }) => notice.perPage);
  const category = useSelector(({ notice }) => notice.category);
  const filter = useSelector(({ notice }) => notice.filter);

  const token = useSelector(({ auth }) => auth.token);

  const [categorySelect, setcategorySelect] = useState();

  useEffect(() => {
    setcategorySelect(category);
  }, [category]);

  return (
    <>
      <NoticeAllList filter={filter} category={categorySelect} perPage={perPage} page={page} />

      {modalAddNoticeState && (
        <Modal modalName={"modalAddNotice"} bigHeight>
          <ModalAddNotice />
        </Modal>
      )}
      {modalViewNotice && (
        <Modal modalName={"modalViewNotice"}>
          <ModalNotice />
        </Modal>
      )}
    </>
  );
};

export default NoticesCategoriesList;
