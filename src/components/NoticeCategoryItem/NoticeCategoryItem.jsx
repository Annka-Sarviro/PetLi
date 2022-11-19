import { useState } from "react";
import { useDeleteNoticeMutation } from "redux/noticesApi";
import { Item, ImageThumb, Image, Category, BtnFavorite, Title,ContainerDescription, Table, ButtonMore } from "./NoticeCategoryItem.styled";
import unlike from "img/unlike.svg"

const NoticeCategoryItem = ({ _id, name, title, birthday, breed, male, location, price, image, onModalOpen }) => { 
    const [isFavorite, setFavorite] = useState(false);
    const [deleteNotice, { isLoading: isDeleting }] = useDeleteNoticeMutation();

    return (
        <Item>
            <ImageThumb>
                <Image src="https://cdn.pixabay.com/photo/2021/10/27/19/09/cat-6748193_960_720.jpg" alt={title}></Image>
                <Category>Sell</Category>
                <BtnFavorite><img src={unlike} alt="unlike"/></BtnFavorite>
            </ImageThumb> 
            <div>
                <Title>{title}</Title>                
                <ContainerDescription>    
                    <Table>
                        <tbody>
                            <tr>
                                <td>Breed:</td>
                                <td>{breed}</td>
                            </tr> 
                            <tr>
                                <td>Place:</td>
                                <td>{location}</td>
                            </tr>
                            <tr>
                                <td>Age:</td>
                                <td>{birthday}</td>
                            </tr>
                            <tr>
                                <td>Price:</td>
                                <td>{price}</td>
                            </tr>
                        </tbody>
                    </Table>
                </ContainerDescription> 
            </div>    
            <ButtonMore active="true" type="button" onClick={() => onModalOpen(_id)}>Learn more</ButtonMore> 
        </Item>
    )
}

export default NoticeCategoryItem;