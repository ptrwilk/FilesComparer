import classNames from "classnames";
import { useEffect, useState } from "react";

interface IListItemsProps {
  externalSelectedItem?: string;
  items: string[];
  onSelectedItemChange?: (item: string) => void;
}

interface IItemProps {
  text: string;
  seleted?: boolean;
  onClick?: () => void;
}

const ListItems: React.FC<IListItemsProps> = ({
  externalSelectedItem,
  items,
  onSelectedItemChange,
}) => {
  const [selectedItem, setSelectedItem] = useState<string | undefined>();

  useEffect(() => {
    setSelectedItem(externalSelectedItem);
  }, [externalSelectedItem]);

  const handleClick = (item: string) => {
    setSelectedItem(item);
    onSelectedItemChange?.(item);
  };

  return (
    <ul className="min-h-[200px] max-h-[200px] min-w-[200px] overflow-auto bg-slate-400">
      {items.map((item, key) => (
        <li key={key}>
          <Item
            text={item}
            seleted={selectedItem === item}
            onClick={() => handleClick(item)}
          />
        </li>
      ))}
    </ul>
  );
};

const Item: React.FC<IItemProps> = ({ text, seleted, onClick }) => {
  return (
    <p
      className={classNames("hover:bg-cyan-300", { "bg-cyan-500": seleted })}
      onClick={onClick}
    >
      {text}
    </p>
  );
};

export default ListItems;
