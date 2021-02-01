import React, { useState } from "react";
import CurrentItemWrapper from "./CurrentItemWrapper";
import DropdownItemWrapper from "./DropdownItemWrapper";
import Input from "./Input";
import ItemListWrapper from "./ItemListWrapper";
import RemoveButton from "./RemoveButton";
import Wrapper from "./Wrapper";

export interface Item {
  value: string;
  id: string;
}

interface Props {
  items: Item[];
  defaultItem?: Item;
  typeAhead?: boolean;
  nullable?: boolean;
  onChange?: (value: string) => void;
  onSelect?: (item: Item | undefined) => void;
}

const Dropdown: React.FC<Props> = ({
  items,
  defaultItem,
  onChange,
  onSelect,
  typeAhead = false,
  nullable = true
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | undefined>(
    defaultItem
  );
  const [inputValue, setInputValue] = useState("");

  const handleFocus = () => {
    setIsOpen(true);
  };
  const handleBlur = () => {
    setIsOpen(false);
  };
  const handleSelect = (item: Item) => {
    setSelectedItem(item);
    onSelect?.(item);
    setInputValue("");
  };
  const handleRemove = () => {
    setSelectedItem(undefined);
    onSelect?.(undefined);
    setInputValue("");
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setInputValue(value);
    onChange?.(value);
  };

  return (
    <Wrapper>
      <Input
        onFocus={handleFocus}
        onBlur={handleBlur}
        value={inputValue}
        readOnly={!typeAhead}
        onChange={typeAhead ? handleChange : undefined}
      />
      {isOpen && items.length > 0 && (
        <ItemListWrapper>
          {items.map((item) => (
            <DropdownItemWrapper
              key={item.id}
              onMouseDown={() => handleSelect(item)}
            >
              {item.value}
            </DropdownItemWrapper>
          ))}
        </ItemListWrapper>
      )}
      {(!isOpen || !typeAhead) && !!selectedItem && (
        <>
          <CurrentItemWrapper>{selectedItem.value}</CurrentItemWrapper>
          {nullable && <RemoveButton onClick={handleRemove} />}
        </>
      )}
    </Wrapper>
  );
};

export default Dropdown;
