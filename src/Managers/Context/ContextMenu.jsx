import React from 'react';
import { Menu, Item, Separator, Submenu, useContextMenu } from 'react-contexify';
import 'react-contexify/dist/ReactContexify.css';

const MENU_ID = 'menu-id';

function ContextMenu() {
  const { show } = useContextMenu({
    id: MENU_ID,
  });

  const handleItemClick = ({ event, props, triggerEvent, data }) => {
    console.log('Item clicked', props);
  };

  const handleContextMenu = (event) => {
    event.preventDefault();
    show({ event });
  };

  return (
    <div>
      <div
        style={{ width: '100%', height: '100vh', zindex: "9999" }}
        onContextMenu={handleContextMenu}
      >
      </div>

      <Menu id={MENU_ID}>
        <Item onClick={handleItemClick}>Вставить</Item>
        <Item onClick={handleItemClick}>Открыть в терминале</Item>
        <Item onClick={handleItemClick}>Свойства</Item>
        <Separator />
        <Submenu label="Создать..">
          <Item onClick={handleItemClick}>Создать папку</Item>
          <Item onClick={handleItemClick}>Создать пустой файл</Item>
        </Submenu>
      </Menu>
    </div>
  );
}

export default ContextMenu;