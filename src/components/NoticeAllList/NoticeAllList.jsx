import { useEffect, useState } from "react";
import { useGetNoticesQuery } from "redux/noticesApi";
import { List } from "components/NoticesCategoriesList/NoticesCategoriesList.styled";
import NoticeCategoryItem from "components/NoticeCategoryItem";
import { NotFoundBox, NotFound } from "pages/NewsPage/NewsPage.styled";
import { useSelector } from "react-redux";

const NoticeAllList = ({ filter, category, perPage, page }) => {
  const [noti, setNoti] = useState([]);
  const { data = [], isLoading } = useGetNoticesQuery({ filter, category, perPage, page });
  const favoriteNoticeId = useSelector(({ user }) => user.favorite);
  const notieceId = useSelector(({ user }) => user.userNotice);
  useEffect(() => {
    if (!data) {
      return;
    }

    switch (category) {
      case "favorite":
        setNoti(data?.data?.result);
        break;
      case "my_adds":
        setNoti(data?.data?.result?.userNotice);

        break;
      default:
        setNoti(data?.notices);
        break;
    }
  }, [data, category]);

  const setCategory = category => {
    switch (category) {
      case "sell":
        return "Sell";
      case "in_good_hands":
        return "In good hands";
      case "lost_found":
        return "Lost/found";
      case "favorite":
        return "Favorite addsa";
      case "my_adds":
        return "My adds";
      default:
        return "No category";
    }
  };

  return (
    <List>
      {(isLoading || !noti) && <div>loading </div>}
      {!isLoading && noti?.length === 0 && (
        <NotFoundBox>
          <NotFound>Nothing found. Please, try again.</NotFound>
        </NotFoundBox>
      )}
      {!isLoading &&
        noti?.map(({ _id, avatar, title, breed, location, birthday, price, name, category }) => (
          <NoticeCategoryItem
            key={_id}
            id={_id}
            image={avatar}
            title={title}
            name={name}
            breed={breed}
            category={setCategory(category)}
            location={location}
            birthday={birthday}
            price={price}
            favoriteNoticeId={favoriteNoticeId}
            notieceId={notieceId}
          />
        ))}
    </List>
  );
};

export default NoticeAllList;
