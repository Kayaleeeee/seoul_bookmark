import { Dropdown, DropdownItemType } from "@app/_components/Dropdown/Dropdown";
import "./searchFilterBar.css";

type Props<T> = {
  onSearch: () => void;
  onSelect: (filter: DropdownItemType<T>) => void;
  changeKeyword: (keyword: string) => void;
  keyword: string;
  selectedFilter: DropdownItemType<T>;
  menuList: DropdownItemType<T>[];
};

export function SearchFilterBar<T>({
  onSearch,
  onSelect,
  changeKeyword,
  keyword,
  selectedFilter,
  menuList,
}: Props<T>) {
  return (
    <div className="searchBarContainer">
      <input
        className="searchInput"
        placeholder="검색할 책을 입력해주세요."
        value={keyword}
        onChange={(e) => changeKeyword(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onSearch();
          }
        }}
      />
      <div className="selectWrapper">
        <Dropdown<T>
          menuList={menuList}
          selectedItem={selectedFilter}
          onSelectItem={onSelect}
        />
      </div>
    </div>
  );
}
