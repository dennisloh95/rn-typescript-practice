import { RootState } from "@/models/index";
import React from "react";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector } from "react-redux";

interface IProps {
  onSubmit: () => void;
}

const HeaderRightBtn: React.FC<IProps> = ({ onSubmit }) => {
  const {
    category: { isEdit },
  } = useSelector((state: RootState) => state);

  return (
    <HeaderButtons>
      <Item title={isEdit ? "完成" : "编辑"} onPress={onSubmit} color="#333" />
    </HeaderButtons>
  );
};

export default HeaderRightBtn;
