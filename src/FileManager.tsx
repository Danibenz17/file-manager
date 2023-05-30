import React, { useState } from "react";
import "./App.css";

type ItemType = "file" | "folder";

interface Item {
  name: string;
  type: ItemType;
  children: Item[];
  inputName: string;
  inputType: ItemType;
}

const FileManager: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [itemName, setItemName] = useState("");
  const [itemType, setItemType] = useState<ItemType>("file");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItemName(e.target.value);
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItemType(e.target.value as ItemType);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddItemClick();
    }
  };

  const handleAddItemClick = () => {
    const newItem: Item = {
      name: itemName,
      type: itemType,
      children: [],
      inputName: "",
      inputType: "file",
    };

    setItems((prevItems) => [...prevItems, newItem]);
    setItemName("");
  };

  const handleItemInputChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updatedItems = [...items];
    updatedItems[index] = {
      ...updatedItems[index],
      inputName: e.target.value,
    };
    setItems(updatedItems);
  };

  const handleItemRadioChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updatedItems = [...items];
    updatedItems[index] = {
      ...updatedItems[index],
      inputType: e.target.value as ItemType,
    };
    setItems(updatedItems);
  };
  const handleItemKeyPress = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleItemAddClick(index);
    }
  };

  const handleItemAddClick = (index: number) => {
    const updatedItems = [...items];
    const newItem: Item = {
      name: updatedItems[index].inputName,
      type: updatedItems[index].inputType,
      children: [],
      inputName: "",
      inputType: "file",
    };
    updatedItems[index].children.push(newItem);
    setItems(updatedItems);
  };

  const renderItems = (items: Item[], isChild: boolean = false) => {
    return items.map((item, index) => (
      <div key={index} className={`item ${isChild ? "child-item" : ""}`}>
        <div style={{ cursor: "pointer" }}>
          {item.type === "folder" ? (
            <span style={{ marginRight: "5px" }}>&#128193;</span>
          ) : (
            <span style={{ marginRight: "5px" }}>&#128196;</span>
          )}
          {item.name}
        </div>
        {item.type === "folder" && (
          <div style={{ marginLeft: "20px" }}>
            <input
              type="text"
              value={item.inputName}
              onChange={(e) => handleItemInputChange(index, e)}
              onKeyPress={(e) => handleItemKeyPress(index, e)}
              placeholder="Enter folder name"
            />
            <div>
              <input
                type="radio"
                name={`itemType_${index}`}
                value="file"
                onChange={(e) => handleItemRadioChange(index, e)}
                checked={item.inputType === "file"}
              />
              <label>File</label>
            </div>
            <div>
              <input
                type="radio"
                name={`itemType_${index}`}
                value="folder"
                onChange={(e) => handleItemRadioChange(index, e)}
                checked={item.inputType === "folder"}
              />
              <label>Folder</label>
            </div>
          </div>
        )}
        {item.children.length > 0 && renderItems(item.children, true)}
      </div>
    ));
  };

  return (
    <div className="file-manager">
      <div>
        <input
          placeholder="Enter name"
          type="text"
          value={itemName}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        <div>
          <input
            type="radio"
            name="itemType"
            value="file"
            onChange={handleRadioChange}
            checked={itemType === "file"}
          />
          <label>File</label>
        </div>
        <div>
          <input
            type="radio"
            name="itemType"
            value="folder"
            onChange={handleRadioChange}
            checked={itemType === "folder"}
          />
          <label>Folder</label>
        </div>
      </div>
      {renderItems(items)}
    </div>
  );
};

export default FileManager;
