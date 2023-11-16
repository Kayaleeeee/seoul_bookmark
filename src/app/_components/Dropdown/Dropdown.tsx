import { useState } from "react";
import "./dropdown.css";

export type DropdownItemType<T> = {
  label: string;
  value: T;
};

type Props<T> = {
  menuList: DropdownItemType<T>[];
  onSelectItem: (item: DropdownItemType<T>) => void;
  selectedItem?: DropdownItemType<T>;
};

export const Dropdown = <T extends unknown>({
  menuList,
  selectedItem,
  onSelectItem,
}: Props<T>) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (item: DropdownItemType<T>) => {
    onSelectItem(item);
    setIsOpen(false);
  };

  return (
    <div className="wrapper">
      <div className="container" onClick={() => setIsOpen((prev) => !prev)}>
        {selectedItem?.label}
      </div>
      {isOpen && (
        <div className="itemListWrapper">
          {menuList.map((item) => {
            return (
              <div
                key={item.label}
                className="item"
                onClick={() => handleSelect(item)}
              >
                {item.label}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
