import { useGetUserQuery } from "redux/userApi";
import UserDataItem from "./UserDataItem";

import { UserBlock, BoxImg, EditImgBtn, IconEditImgBtn, ImgUser, BoxInfo, BoxTitle, Title, Block, Form } from "./UserDataItem.styled";

const UserDataForm = () => {
  const { data: user = [], isLoading, isError } = useGetUserQuery();
  const BASE_URL = "https://www.gravatar.com/avatar/";
  const imgUrl = user?.data?.result?.avatar;

  return (
    <UserBlock>
      {user.length === 0 ? (
        <div>not found</div>
      ) : (
        <>
          <BoxImg>
            <ImgUser src={BASE_URL + imgUrl} alt="Avatar User" />
            <EditImgBtn>
              <IconEditImgBtn />
              Edit photo
            </EditImgBtn>
          </BoxImg>
          <BoxInfo>
            <BoxTitle>
              <Block>
                <Form>
                  <BoxTitle>
                    <Title>Name:</Title>
                    <Block>
                      <UserDataItem defaultVaule={user.data.result.name} name="name" />
                    </Block>
                  </BoxTitle>
                  <BoxTitle>
                    <Title>Email:</Title>
                    <Block>
                      <UserDataItem defaultVaule={user.data.result.email} name={"email"} />
                    </Block>
                  </BoxTitle>
                  <BoxTitle>
                    <Title>Birthday:</Title>
                    <Block>
                      <UserDataItem defaultVaule={user.data.result.birthday} name={"birthday"} />
                    </Block>
                  </BoxTitle>
                  <BoxTitle>
                    <Title>Phone:</Title>
                    <Block>
                      <UserDataItem defaultVaule={user.data.result.phone} name={"phone"} />
                    </Block>
                  </BoxTitle>
                  <BoxTitle>
                    <Title>City:</Title>
                    <Block>
                      <UserDataItem defaultVaule={user.data.result.city} name={"city"} />
                    </Block>
                  </BoxTitle>
                </Form>
              </Block>
            </BoxTitle>
          </BoxInfo>
        </>
      )}
    </UserBlock>
  );
};

export default UserDataForm;